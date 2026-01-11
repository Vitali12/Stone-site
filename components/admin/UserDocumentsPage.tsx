import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { UserDocument } from '../../types';
import { DocumentTextIcon, TrashIcon, PlusIcon } from '../IconComponents';

export const UserDocumentsPage: React.FC = () => {
    const { email } = useParams<{ email: string }>();
    const decodedEmail = email ? decodeURIComponent(email) : '';
    
    const { getUserDocuments, deleteUserDocument, addUserDocument } = useAuth();
    
    const [docs, setDocs] = useState<UserDocument[]>(() => getUserDocuments(decodedEmail));
    const [activeDocType, setActiveDocType] = useState<'Договор' | 'Протокол' | 'Отчет' | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDelete = (docId: string) => {
        if (window.confirm(`Вы уверены, что хотите удалить документ ${docId} для пользователя ${decodedEmail}?`)) {
            deleteUserDocument(decodedEmail, docId);
            setDocs(getUserDocuments(decodedEmail)); // Re-fetch to update state
        }
    };

    const handleAddClick = (docType: 'Договор' | 'Протокол' | 'Отчет') => {
        setActiveDocType(docType);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset input
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !activeDocType) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            addUserDocument(decodedEmail, activeDocType, { name: file.name, content });
            setDocs(getUserDocuments(decodedEmail));
            setActiveDocType(null);
        };
        reader.readAsDataURL(file);
    };
    
    const getDocumentTypeClass = (type: UserDocument['type']) => {
        switch(type) {
            case 'Расчет': return 'bg-purple-100 text-purple-800';
            case 'Договор': return 'bg-blue-100 text-blue-800';
            case 'Протокол': return 'bg-green-100 text-green-800';
            case 'Отчет': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                     <Link to="/admin" className="text-blue-600 hover:underline mb-8 inline-block">&larr; Назад к списку пользователей</Link>
                     <h1 className="text-3xl font-bold text-blue-800">Документы пользователя</h1>
                     <p className="mt-1 text-lg text-gray-600 break-all">{decodedEmail}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Список документов</h2>
                        <div className="flex gap-2 flex-shrink-0 flex-wrap">
                             <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleFileChange} 
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                             />
                             <button onClick={() => handleAddClick('Договор')} className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <PlusIcon className="w-4 h-4" /> Договор
                            </button>
                             <button onClick={() => handleAddClick('Протокол')} className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
                                <PlusIcon className="w-4 h-4" /> Протокол
                            </button>
                             <button onClick={() => handleAddClick('Отчет')} className="bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2">
                                <PlusIcon className="w-4 h-4" /> Отчет
                            </button>
                        </div>
                    </div>

                    {docs.length > 0 ? (
                         <div className="overflow-x-auto border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Файл</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {docs.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {doc.id}
                                                {doc.fileName && <p className="text-xs text-gray-500 max-w-xs truncate" title={doc.fileName}>{doc.fileName}</p>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDocumentTypeClass(doc.type)}`}>
                                                    {doc.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => handleDelete(doc.id)} className="text-red-600 hover:text-red-900 flex items-center gap-1.5" title="Удалить документ">
                                                    <TrashIcon className="w-4 h-4" />
                                                    Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">У пользователя нет документов</h3>
                            <p className="mt-1 text-sm text-gray-500">Загрузите договор, протокол или отчет с вашего компьютера.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};