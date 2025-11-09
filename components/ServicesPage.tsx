
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ALL_SERVICES } from '../constants';
import type { Service } from '../types';
import { ChevronRightIcon } from './IconComponents';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
        <div className="p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <service.icon className="w-7 h-7 text-green-600" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
                    <p className="text-green-600 font-semibold">{service.price}</p>
                </div>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
            <Link to={`/services/${service.id}`} className="font-semibold text-blue-800 hover:text-blue-600 flex items-center gap-1 mt-auto">
                Подробнее <ChevronRightIcon className="w-4 h-4" />
            </Link>
        </div>
    </div>
);

const ServicesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(ALL_SERVICES.map(s => s.category))];
        const categoryMap: { [key: string]: string } = {
            gravel: '🪨 Щебень и гравий',
            sand: '🏖️ Песок',
            soil: '🌱 Грунты',
            rock: '⛰️ Горные породы',
            radiology: '☢️ Радиология',
        };
        return [{ key: 'all', name: 'Все услуги' }, ...uniqueCategories.map(cat => ({ key: cat, name: categoryMap[cat] || cat }))];
    }, []);

    const filteredServices = useMemo(() => {
        return ALL_SERVICES.filter(service => {
            const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
            const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-white shadow-sm">
                 <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl font-bold text-blue-800">Услуги и цены</h1>
                    <p className="mt-2 text-lg text-gray-600">Полный перечень испытаний для ваших строительных объектов.</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters */}
                    <aside className="md:w-1/4 lg:w-1/5">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Фильтры</h3>
                            <div className="mb-6">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Поиск по названию</label>
                                <input
                                    type="text"
                                    id="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Например, 'морозостойкость'"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Категории</h4>
                                <ul className="space-y-2">
                                    {categories.map(category => (
                                        <li key={category.key}>
                                            <button
                                                onClick={() => setSelectedCategory(category.key)}
                                                className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${selectedCategory === category.key ? 'bg-blue-800 text-white font-semibold' : 'hover:bg-gray-100'}`}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8 border-t pt-6">
                                <Link to="/services/calculator" className="w-full text-center bg-green-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-green-700 transition-all duration-300 block">
                                    Калькулятор
                                </Link>
                            </div>
                        </div>
                    </aside>
                    {/* Services Grid */}
                    <main className="flex-1">
                        {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredServices.map(service => (
                                    <ServiceCard key={service.id} service={service} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-lg shadow-md">
                                <p className="text-xl font-semibold text-gray-700">Услуги не найдены</p>
                                <p className="text-gray-500 mt-2">Попробуйте изменить параметры фильтрации.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
