import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import type { UserDocument } from '../../types';
import { DocumentTextIcon, SearchIcon, TrashIcon } from '../IconComponents';
import { InfoModal } from '../Modals';

const CalculationDetailsModal: React.FC<{ document: UserDocument; onClose: () => void }> = ({ document, onClose }) => {
    if (document.type !== 'Расчет') return null;

    const content = (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-semibold text-gray-500">Номер документа:</p>
                    <p>{document.id}</p>
                </div>
                 <div>
                    <p className="font-semibold text-gray-500">Дата создания:</p>
                    <p>{document.date}</p>
                </div>
            </div>
            <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2 text-gray-800">Состав расчета:</h4>
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {document.services?.map(service => (
                        <li key={service.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md">
                            <span className="flex-1 pr-2">{service.name} (x{service.quantity})</span>
                            <span className="font-medium">{(service.price * service.quantity).toLocaleString('ru-RU')} ₽</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between items-center font-bold text-xl">
                <span>Итого:</span>
                <span className="text-green-600">{document.totalCost?.toLocaleString('ru-RU')} ₽</span>
            </div>
        </div>
    );

    return <InfoModal title={`Детали расчета №${document.id.split('-')[1]}`} content={content as any} onClose={onClose} />;
};


const Documents: React.FC = () => {
    const { documents, deleteCurrentUserDocument } = useAuth();
    const [selectedDocument, setSelectedDocument] = useState<UserDocument | null>(null);

    const handleDelete = (docId: string) => {
        if(window.confirm('Вы уверены, что хотите удалить этот расчет?')) {
            deleteCurrentUserDocument(docId);
        }
    }
    
    const handleViewFile = (doc: UserDocument) => {
        if (doc.fileUrl) {
            // Open base64 or uploaded file
            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.write(`<iframe src="${doc.fileUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
            } else {
                 alert("Разрешите всплывающие окна для просмотра файла.");
            }
        } else if (doc.fileName) {
            // Fallback for mock files
            const filePath = `/assets/docs/${doc.fileName}`;
            window.open(filePath, '_blank', 'noopener,noreferrer');
        } else {
            alert('Файл для этого документа не найден.');
        }
    }

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
        <>
            {selectedDocument && selectedDocument.type === 'Расчет' && (
                <CalculationDetailsModal document={selectedDocument} onClose={() => setSelectedDocument(null)} />
            )}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Мои документы</h2>
                {documents.length > 0 ? (
                     <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID Документа
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Дата
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Тип
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Сумма / Файл
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Действия
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDocumentTypeClass(doc.type)}`}>
                                                {doc.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                            {doc.type === 'Расчет' ? `${doc.totalCost?.toLocaleString('ru-RU')} ₽` : (
                                                <span title={doc.fileName} className="block max-w-[200px] truncate">
                                                    {doc.fileName || 'Нет файла'}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {doc.type === 'Расчет' ? (
                                                 <div className="flex items-center gap-4">
                                                    <button onClick={() => setSelectedDocument(doc)} className="text-blue-600 hover:text-blue-900 flex items-center gap-1" title="Посмотреть детали расчета">
                                                        <SearchIcon className="w-4 h-4" />
                                                        Детали
                                                    </button>
                                                    <button onClick={() => handleDelete(doc.id)} className="text-red-600 hover:text-red-900 flex items-center gap-1" title="Удалить расчет">
                                                        <TrashIcon className="w-4 h-4" />
                                                        Удалить
                                                    </button>
                                                 </div>
                                            ) : (
                                                <button onClick={() => handleViewFile(doc)} className="text-blue-600 hover:text-blue-900 flex items-center gap-1" title="Просмотреть файл">
                                                    <DocumentTextIcon className="w-4 h-4" />
                                                    Просмотреть
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Документы не найдены</h3>
                        <p className="mt-1 text-sm text-gray-500">Вы еще не сохранили ни одного расчета. Воспользуйтесь калькулятором.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Documents;