
import React, { useState, useMemo } from 'react';
import { ALL_SERVICES } from '../constants';

interface SelectedService {
    id: string;
    quantity: number;
    price: number;
}

const Calculator: React.FC = () => {
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

    const handleAddService = (serviceId: string) => {
        if (selectedServices.find(s => s.id === serviceId)) return;

        const service = ALL_SERVICES.find(s => s.id === serviceId);
        if (service) {
            const price = parseFloat(service.price.replace(/[^0-9.-]+/g,""));
            setSelectedServices([...selectedServices, { id: service.id, quantity: 1, price: price }]);
        }
    };
    
    const handleRemoveService = (serviceId: string) => {
        setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
    };

    const handleQuantityChange = (serviceId: string, quantity: number) => {
        if (quantity < 1) return;
        setSelectedServices(selectedServices.map(s => s.id === serviceId ? { ...s, quantity } : s));
    };

    const totalCost = useMemo(() => {
        return selectedServices.reduce((total, s) => total + s.price * s.quantity, 0);
    }, [selectedServices]);

    const availableServices = ALL_SERVICES.filter(s => !selectedServices.find(ss => ss.id === s.id));

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Калькулятор стоимости</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side: Add services */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Добавить услугу</h3>
                    <div className="space-y-4">
                        {availableServices.length > 0 ? (
                            availableServices.map(service => (
                                <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                    <div>
                                        <p className="font-medium">{service.title}</p>
                                        <p className="text-sm text-gray-500">{service.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleAddService(service.id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                                    >
                                        + Добавить
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center p-4">Все услуги добавлены.</p>
                        )}
                    </div>
                </div>

                {/* Right side: Selected services and total */}
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Выбранные услуги</h3>
                    {selectedServices.length === 0 ? (
                        <p className="text-gray-500">Добавьте услуги из списка слева, чтобы рассчитать стоимость.</p>
                    ) : (
                        <div className="space-y-4">
                            {selectedServices.map(s => {
                                const serviceInfo = ALL_SERVICES.find(info => info.id === s.id);
                                return (
                                <div key={s.id} className="border-b pb-4">
                                    <div className="flex justify-between items-start">
                                        <p className="font-medium pr-4">{serviceInfo?.title}</p>
                                        <button onClick={() => handleRemoveService(s.id)} className="text-red-500 hover:text-red-700 font-bold text-lg">&times;</button>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <label className="text-sm">Кол-во:</label>
                                        <input
                                            type="number"
                                            value={s.quantity}
                                            onChange={(e) => handleQuantityChange(s.id, parseInt(e.target.value))}
                                            min="1"
                                            className="w-20 px-2 py-1 border rounded-md"
                                        />
                                        <p className="ml-auto font-semibold">{(s.quantity * s.price).toLocaleString('ru-RU')} ₽</p>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    )}
                    <div className="mt-6 pt-6 border-t-2 border-dashed border-blue-200">
                        <div className="flex justify-between items-center text-2xl font-bold">
                            <span>Итого:</span>
                            <span className="text-green-600">{totalCost.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Стоимость является предварительной и может быть уточнена менеджером.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
