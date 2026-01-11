import React, { useState, useMemo } from 'react';
import { GOST_DOCUMENTS } from '../constants';
import { SearchIcon, DocumentTextIcon } from './IconComponents';

export const GostPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return GOST_DOCUMENTS;
        return GOST_DOCUMENTS.filter(doc => 
            doc.gostNumber.toLowerCase().includes(term) || 
            doc.title.toLowerCase().includes(term)
        );
    }, [searchTerm]);

    const getDocUrl = (gostNumber: string) => {
        const formattedGost = gostNumber
            .replace(/ГОСТ/gi, 'gost')
            .replace(/\s+/g, '_')
            .replace(/\//g, '_')
            .toLowerCase();
        return `https://rosgosts.ru/file/gost/91/100/${formattedGost}.pdf`;
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold text-slate-900">База знаний: ГОСТы</h1>
                    <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">Нормативная база документов для строительной отрасли и горного дела.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="max-w-4xl mx-auto">
                    <div className="relative group shadow-2xl rounded-full overflow-hidden">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <SearchIcon className="h-6 w-6 text-blue-500" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Поиск по номеру (например 8267) или названию..."
                            className="w-full pl-16 pr-6 py-5 bg-white border-none focus:ring-4 focus:ring-blue-500/20 text-lg transition-all"
                        />
                    </div>

                    <div className="mt-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <ul role="list" className="divide-y divide-gray-50">
                                {filteredDocuments.length > 0 ? (
                                    filteredDocuments.map((doc) => (
                                        <li key={doc.id} className="p-6 hover:bg-blue-50/30 transition-colors flex flex-col md:flex-row items-start md:items-center gap-6">
                                            <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
                                                <DocumentTextIcon className="h-8 w-8" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.gostNumber}</h3>
                                                <p className="text-slate-600 text-sm leading-relaxed">{doc.title}</p>
                                            </div>
                                            <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${doc.fileType === 'pdf' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {doc.fileType}
                                                </span>
                                                <a 
                                                    href={getDocUrl(doc.gostNumber)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 md:flex-none text-center bg-blue-800 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg shadow-blue-900/20"
                                                >
                                                    Открыть
                                                </a>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-center py-24">
                                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <SearchIcon className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 text-lg">Документы не найдены. Попробуйте другой запрос.</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};