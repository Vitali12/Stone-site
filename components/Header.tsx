import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import type { NavLink } from '../types';
import { BeakerIcon, MenuIcon, XIcon, ChevronDownIcon, UserCircleIcon } from './IconComponents';
import { useAuth } from '../hooks/useAuth';

const UserMenu: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const node = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (node.current?.contains(e.target as Node)) return;
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    if (!user) return null;

    return (
        <div className="relative" ref={node}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-gray-600 font-medium hover:text-blue-800 transition-colors duration-200">
                <UserCircleIcon className="w-6 h-6" />
                <span className="hidden md:inline">{user.email}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100 z-30">
                    <ul className="py-1">
                        <li>
                            <Link to="/online/account/profile" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Профиль</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                Выйти
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

const NavItem: React.FC<{ item: NavLink, closeMenu: () => void }> = ({ item, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, showAuthModal } = useAuth();

  const handleClickOutside = (e: MouseEvent) => {
    if (node.current?.contains(e.target as Node)) return;
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string, isProtected?: boolean) => {
    e.preventDefault();
    if (isProtected && !isAuthenticated) {
        showAuthModal();
        closeMenu();
        return;
    }
    setIsOpen(false);
    closeMenu();
    navigate(href);
  };
  
  const handleParentClick = (e: React.MouseEvent) => {
     if (item.children) {
         e.preventDefault();
         setIsOpen(!isOpen);
     } else {
        handleLinkClick(e, item.href, item.isProtected);
     }
  }

  // Hide protected links for non-authenticated users in mobile menu
  if (item.isProtected && !isAuthenticated && !item.children) {
      return null;
  }

  return (
    <li className="relative" ref={node}>
      <a
        href={item.href}
        onClick={handleParentClick}
        className="flex items-center justify-between py-2 px-3 text-gray-700 hover:text-blue-800 transition-colors duration-300"
      >
        {item.label}
        {item.children && <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
      </a>
      {item.children && isOpen && (
        <ul className="lg:absolute lg:top-full lg:left-0 z-20 w-full lg:w-64 bg-white lg:shadow-xl lg:rounded-md lg:border lg:border-gray-200 py-2 pl-4 lg:pl-0">
          {item.children.map((child) => (
            <li key={child.href}>
              <a
                href={child.href}
                onClick={(e) => handleLinkClick(e, child.href, child.isProtected)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors duration-300"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};


const DesktopNavLink: React.FC<{ item: NavLink }> = ({ item }) => {
    const navigate = useNavigate();
    const { isAuthenticated, showAuthModal } = useAuth();

    const handleClick = (e: React.MouseEvent, href: string, isProtected?: boolean) => {
        e.preventDefault();
        if (isProtected && !isAuthenticated) {
            showAuthModal();
            return;
        }
        navigate(href);
    };

    if(item.isProtected && !isAuthenticated && !item.children) {
      return null;
    }
    
    // Special styling for protected top-level links for logged-in users
    if(item.isProtected && isAuthenticated && !item.children) {
        return (
             <li>
                <a href={item.href} onClick={(e) => handleClick(e, item.href, item.isProtected)} className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold hover:bg-green-200 transition-all duration-300 flex items-center">
                    {item.label}
                </a>
            </li>
        )
    }
    
    return (
        <li className="relative group">
            <a href={item.href} onClick={(e) => handleClick(e, item.href, item.isProtected)} className="px-4 py-2 text-gray-600 font-medium hover:text-blue-800 transition-colors duration-200 flex items-center">
                {item.label}
                {item.children && <ChevronDownIcon className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform"/>}
            </a>
            {item.children && (
                <ul className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md border border-gray-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                    {item.children.map(child => (
                        <li key={child.href}>
                            <a href={child.href} onClick={(e) => handleClick(e, child.href, child.isProtected)} className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800">{child.label}</a>
                        </li>
                    ))}
                </ul>
            )}
         </li>
    );
};


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, showAuthModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <BeakerIcon className="w-8 h-8 text-blue-800" />
            <span className="text-xl font-bold text-gray-800">ИЦ ИГ КарНЦ РАН</span>
          </Link>

          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center space-x-2">
              {NAV_LINKS.map((link) => (
                 <DesktopNavLink key={link.href} item={link} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
                <UserMenu />
            ) : (
                <Link
                  to="#"
                  onClick={(e) => {
                      e.preventDefault();
                      showAuthModal();
                  }}
                  className="hidden sm:inline-block bg-blue-800 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-900 transition-all duration-300"
                >
                  Войти
                </Link>
            )}
            <button
              className="lg:hidden z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="pt-24 px-6 pb-8 h-full overflow-y-auto flex flex-col">
          <nav className="flex-grow">
            <ul className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <NavItem key={link.href} item={link} closeMenu={() => setIsMenuOpen(false)} />
              ))}
            </ul>
          </nav>
           <div className="mt-8 border-t pt-6">
                 {isAuthenticated ? (
                    <div className="text-center">
                        <p className="font-medium mb-2">{user?.email}</p>
                        <button onClick={() => { logout(); navigate('/'); setIsMenuOpen(false); }} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 text-center block">
                            Выйти
                        </button>
                    </div>
                ) : (
                    <Link to="#" onClick={(e) => { e.preventDefault(); showAuthModal(); setIsMenuOpen(false); }} className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 text-center block">
                        Войти в личный кабинет
                    </Link>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;