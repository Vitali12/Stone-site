import React from 'react';
import { MOCK_ORDERS } from '../../constants.ts';
import type { OrderStatus } from '../../types.ts';
import { DocumentTextIcon } from '../IconComponents.tsx';

const getStatusClass = (status: OrderStatus) => {
    switch (status) {
        case 'Завершен':
            return 'bg-green-100 text-green-800';
        case 'В работе':
            return 'bg-blue-100 text-blue-800';
        case 'Ожидает оплаты':
            return 'bg-yellow-100 text-yellow-800';
        case 'Отменен':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};


const Dashboard: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Мои заказы</h2>
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                № Заказа
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Дата
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Описание
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Статус
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_ORDERS.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {order.status === 'Завершен' && order.reportUrl ? (
                                        <a
                                            href={order.reportUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                            title="Скачать протокол испытаний"
                                        >
                                            <DocumentTextIcon className="w-4 h-4" />
                                            Скачать отчет
                                        </a>
                                    ) : (
                                       <span className="text-gray-400">--</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;