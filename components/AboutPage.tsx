
import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import CompanyPage from './about/CompanyPage';
import EquipmentPage from './about/EquipmentPage';
import AboutPlaceholder from './about/AboutPlaceholder';
import AccreditationPage from './about/AccreditationPage';
import { ChevronRightIcon } from './IconComponents';

const aboutLinks = NAV_LINKS.find(link => link.href === '/about')?.children || [];

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800">О лаборатории</h1>
                <p className="mt-2 text-lg text-gray-600">Узнайте больше о нашей истории, команде и возможностях.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                <aside className="md:w-1/4 lg:w-1/5">
                    <div className="bg-white p-4 rounded-lg shadow-md sticky top-24">
                        <nav>
                            <ul className="space-y-1">
                                {aboutLinks.map(link => (
                                    <li key={link.href}>
                                        <NavLink
                                            to={link.href}
                                            className={({ isActive }) =>
                                                `w-full flex justify-between items-center text-left px-4 py-2.5 rounded-md transition-all duration-200 text-sm font-medium ${
                                                    isActive
                                                        ? 'bg-blue-800 text-white shadow'
                                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`
                                            }
                                        >
                                            {link.label}
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </aside>
                <main className="flex-1 bg-white p-8 rounded-lg shadow-md min-h-[60vh]">
                    <Routes>
                        <Route path="/" element={<Navigate to="company" replace />} />
                        <Route path="company" element={<CompanyPage />} />
                        <Route path="accreditation" element={<AccreditationPage />} />
                        <Route path="equipment" element={<EquipmentPage />} />
                        <Route path="team" element={<AboutPlaceholder title="Команда специалистов" />} />
                        <Route path="partners" element={<AboutPlaceholder title="Партнеры" />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AboutPage;