
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { COMPREHENSIVE_SERVICES, SERVICE_CATEGORIES } from '../constants';
import type { ComprehensiveService } from '../constants';
import { ChevronRightIcon } from './IconComponents';
import { InfoModal } from './Modals';

const ServiceCard: React.FC<{ service: ComprehensiveService; onDetailsClick: (service: ComprehensiveService) => void; }> = ({ service, onDetailsClick }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col h-full">
        <div className="p-6 flex flex-col flex-grow relative">
            <div className="flex items-start gap-4 mb-2">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <service.icon className="w-7 h-7 text-green-600" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-snug">{service.title}</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1">{service.gost}</p>
                </div>
            </div>
            
            <div className="mt-auto pt-4 pl-[3.75rem]">
                 <button 
                    onClick={() => onDetailsClick(service)}
                    className="font-semibold text-blue-800 hover:text-blue-600 flex items-center gap-1 text-sm transition-colors"
                >
                    Подробнее <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
);

const ServicesPage: React.FC = () => {
    const { category: categoryFromUrl } = useParams<{ category: string }>();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'all');
    const [modalService, setModalService] = useState<ComprehensiveService | null>(null);
    
    useEffect(() => {
        setSelectedCategory(categoryFromUrl || 'all');
    }, [categoryFromUrl]);

    const categories = useMemo(() => SERVICE_CATEGORIES, []);

    const filteredServices = useMemo(() => {
        return COMPREHENSIVE_SERVICES.filter(service => {
            const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
            const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    const handleDetailsClick = (service: ComprehensiveService) => {
        setModalService(service);
    };
    
    const handleCategoryClick = (key: string) => {
        const path = key === 'all' ? '/services' : `/services/${key}`;
        navigate(path);
    };

    return (
        <>
            {modalService && (
                <InfoModal 
                    title={modalService.title}
                    content={modalService.description}
                    onClose={() => setModalService(null)}
                />
            )}
            <div className="bg-gray-50 min-h-screen">
                <div className="bg-white shadow-sm">
                     <div className="container mx-auto px-4 py-12 text-center">
                        <h1 className="text-4xl font-bold text-blue-800">Услуги</h1>
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
                                                    onClick={() => handleCategoryClick(category.key)}
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
                                        <ServiceCard key={service.id} service={service} onDetailsClick={handleDetailsClick} />
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
        </>
    );
};

export default ServicesPage;
