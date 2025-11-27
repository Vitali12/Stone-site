
import React, { useState, useMemo } from 'react';
import { GOST_DOCUMENTS } from '../constants';
import { SearchIcon, DocumentTextIcon } from './IconComponents';

const GostPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = useMemo(() => {
        return GOST_DOCUMENTS.filter(doc => {
            const term = searchTerm.toLowerCase();
            return doc.gostNumber.toLowerCase().includes(term) || doc.title.toLowerCase().includes(term);
        });
    }, [searchTerm]);

    const getDocUrl = (gostNumber: string) => {
        // Формируем URL на основе номера ГОСТа для rosgosts.ru
        // Пример: ГОСТ 9480-2012 -> gost_9480-2012.pdf
        const formattedGost = gostNumber
            .replace(/ГОСТ/gi, 'gost')
            .replace(/\s+/g, '_')
            .replace(/\//g, '_') // Safe replacement for slashes
            .toLowerCase();
            
        // Используем предоставленный путь 91/100
        return `https://rosgosts.ru/file/gost/91/100/${formattedGost}.pdf`;
    };

    return (
        <>
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl font-bold text-blue-800">База знаний: ГОСТы и нормативы</h1>
                    <p className="mt-2 text-lg text-gray-600">Актуальная база нормативных документов для строительной отрасли.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Search Bar */}
                <div className="mb-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Поиск по номеру или названию ГОСТа..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Documents List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flow-root">
                        <ul role="list" className="-my-4 divide-y divide-gray-200">
                            {filteredDocuments.length > 0 ? (
                                filteredDocuments.map((doc) => (
                                    <li key={doc.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 space-y-4 sm:space-y-0 sm:space-x-4">
                                        <div className="flex items-center w-full flex-1 min-w-0">
                                            <div className="flex-shrink-0">
                                                <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                                            </div>
                                            <div className="flex-1 min-w-0 ml-4">
                                                <p className="text-sm font-semibold text-blue-800 truncate">{doc.gostNumber}</p>
                                                <p className="text-sm text-gray-600">{doc.title}</p>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-auto flex flex-shrink-0 ml-auto items-center space-x-3">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                doc.fileType === 'pdf' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {doc.fileType.toUpperCase()}
                                            </span>
                                             <a 
                                                href={getDocUrl(doc.gostNumber)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors inline-block text-center"
                                                title={`Открыть/скачать ${doc.gostNumber}`}
                                            >
                                                Открыть/скачать
                                            </a>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-center py-10">
                                    <p className="text-gray-500">Документы не найдены.</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GostPage;
