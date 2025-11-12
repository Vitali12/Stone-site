
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import type { NavLink } from '../types';
import { BeakerIcon, MenuIcon, XIcon, ChevronDownIcon } from './IconComponents';

const NavItem: React.FC<{ item: NavLink, closeMenu: () => void }> = ({ item, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = (e: MouseEvent) => {
    if (node.current?.contains(e.target as Node)) {
      return;
    }
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

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    closeMenu();
    navigate(href);
  };
  
  const handleParentClick = (e: React.MouseEvent) => {
     if (item.children) {
         e.preventDefault();
         setIsOpen(!isOpen);
     } else {
        handleLinkClick(e, item.href);
     }
  }

  return (
    <li className="relative group" ref={node}>
      <a
        href={item.href}
        onClick={handleParentClick}
        className="flex items-center justify-between py-2 px-3 text-gray-700 hover:text-blue-800 transition-colors duration-300"
      >
        {item.label}
        {item.children && <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
      </a>
      {item.children && isOpen && (
        <ul className="lg:absolute lg:top-full lg:left-0 z-20 w-full lg:w-64 bg-white lg:shadow-xl lg:rounded-md lg:border lg:border-gray-200 py-2">
          {item.children.map((child) => (
            <li key={child.href}>
              <a
                href={child.href}
                onClick={(e) => handleLinkClick(e, child.href)}
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

    const handleClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        navigate(href);
    };
    
    return (
        <li className="relative group">
            <a href={item.href} onClick={(e) => handleClick(e, item.href)} className="px-4 py-2 text-gray-600 font-medium hover:text-blue-800 transition-colors duration-200 flex items-center">
                {item.label}
                {item.children && <ChevronDownIcon className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform"/>}
            </a>
            {item.children && (
                <ul className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md border border-gray-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                    {item.children.map(child => (
                        <li key={child.href}>
                            <Link to={child.href} className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800">{child.label}</Link>
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
            <Link
              to="/services/calculator"
              className="hidden sm:inline-block bg-green-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Рассчитать стоимость
            </Link>
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
                <Link to="/services/calculator" onClick={() => setIsMenuOpen(false)} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 text-center block">
                    Рассчитать стоимость
                </Link>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
