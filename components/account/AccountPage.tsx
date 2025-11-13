import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { ChevronRightIcon, DocumentTextIcon, UserCircleIcon, BriefcaseIcon } from '../IconComponents';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Documents from './Documents';

const accountLinks = [
    { href: '/online/account', label: 'Мои заказы', icon: BriefcaseIcon, end: true },
    { href: 'documents', label: 'Документы', icon: DocumentTextIcon, end: false },
    { href: 'profile', label: 'Профиль', icon: UserCircleIcon, end: false },
];

const AccountPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800">Личный кабинет</h1>
                <p className="mt-2 text-lg text-gray-600">Управляйте вашими заказами и документами.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                <aside className="md:w-1/4 lg:w-1/5">
                    <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
                        <nav>
                            <ul className="space-y-1">
                                {accountLinks.map(link => (
                                    <li key={link.href}>
                                        <NavLink
                                            to={link.href}
                                            end={link.end}
                                            className={({ isActive }) =>
                                                `w-full flex justify-between items-center text-left px-4 py-2.5 rounded-md transition-all duration-200 text-sm font-medium ${
                                                    isActive
                                                        ? 'bg-blue-800 text-white shadow'
                                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`
                                            }
                                        >
                                            <span className="flex items-center gap-3">
                                                <link.icon className="w-5 h-5" />
                                                {link.label}
                                            </span>
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>
                <main className="flex-1 bg-white p-6 md:p-8 rounded-lg shadow-md min-h-[60vh]">
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="documents" element={<Documents />} />
                        <Route path="profile" element={<Profile />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AccountPage;