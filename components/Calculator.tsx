import React, { useState, useMemo, useEffect } from 'react';
import { CALCULATOR_DATA } from '../constants';
import type { CalcService, GostGroup } from '../constants';
import { XIcon } from './IconComponents';

interface SelectedService {
    id: string;
    quantity: number;
    price: number;
}

const InfoModal: React.FC<{ title: string; content: string; onClose: () => void }> = ({ title, content, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="info-modal-title">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                     <h3 id="info-modal-title" className="text-xl font-bold text-blue-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700" aria-label="Закрыть">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
                </div>
            </div>
        </div>
    );
};

const GostViewerModal: React.FC<{ gost: string; onClose: () => void }> = ({ gost, onClose }) => {
     useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full relative h-3/4 flex flex-col" onClick={e => e.stopPropagation()}>
                 <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">Просмотр документа: {gost}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700" aria-label="Закрыть">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-grow">
                    <p className="text-gray-600">Текст ГОСТа будет загружен здесь. В данный момент эта функция находится в разработке.</p>
                </div>
            </div>
        </div>
    );
};

const Calculator: React.FC = () => {
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
    const [modalMethodService, setModalMethodService] = useState<CalcService | null>(null);
    const [modalSampleService, setModalSampleService] = useState<CalcService | null>(null);
    const [viewingGost, setViewingGost] = useState<string | null>(null);

    const allCalcServices = useMemo(() => CALCULATOR_DATA.flatMap(gost => gost.services), []);

    const handleAddService = (serviceId: string) => {
        if (selectedServices.find(s => s.id === serviceId)) return;
        const service = allCalcServices.find(s => s.id === serviceId);
        if (service) {
            setSelectedServices([...selectedServices, { id: service.id, quantity: 1, price: service.price }]);
        }
    };
    
    const handleRemoveService = (serviceId: string) => {
        setSelectedServices(selectedServices.filter(s => s.id !== serviceId));
    };

    const handleQuantityChange = (serviceId: string, quantity: number) => {
        const numQuantity = Math.max(1, Number(quantity) || 1);
        setSelectedServices(selectedServices.map(s => s.id === serviceId ? { ...s, quantity: numQuantity } : s));
    };

    const totalCost = useMemo(() => {
        return selectedServices.reduce((total, s) => total + s.price * s.quantity, 0);
    }, [selectedServices]);

    const selectedServiceIds = useMemo(() => new Set(selectedServices.map(s => s.id)), [selectedServices]);

    return (
        <>
            {modalMethodService && <InfoModal title={`Метод: ${modalMethodService.name}`} content={modalMethodService.methodDescription} onClose={() => setModalMethodService(null)} />}
            {modalSampleService && <InfoModal title={`Характеристика пробы: ${modalSampleService.name}`} content={modalSampleService.sampleDescription} onClose={() => setModalSampleService(null)} />}
            {viewingGost && <GostViewerModal gost={viewingGost} onClose={() => setViewingGost(null)} />}
            
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Калькулятор стоимости</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side: Add services */}
                    <div className="border border-gray-200 rounded-lg p-4 h-full max-h-[70vh] overflow-y-auto">
                        <h3 className="text-xl font-semibold mb-4 sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-10">Добавить услугу</h3>
                        <div className="space-y-6">
                            {CALCULATOR_DATA.map((gostGroup) => (
                                <div key={gostGroup.gost}>
                                    <h4 
                                        onClick={() => setViewingGost(gostGroup.gost)}
                                        className="text-lg font-bold text-gray-800 hover:text-blue-800 transition-colors w-full text-left cursor-pointer mb-2"
                                        title={`Показать документ ${gostGroup.gost}`}
                                    >
                                        {gostGroup.gost}: <span className="font-normal text-base">{gostGroup.title}</span>
                                    </h4>
                                    <div className="space-y-2 mt-2 border-l-2 pl-4 border-gray-200">
                                        {gostGroup.services.map(service => (
                                            !selectedServiceIds.has(service.id) && (
                                                <div key={service.id} className="p-3 bg-gray-50 rounded-md">
                                                    <div className="flex justify-between items-start">
                                                        <div className='flex-1 pr-2'>
                                                            <button onClick={() => setModalMethodService(service)} className="font-medium text-left hover:text-blue-600 transition-colors text-sm">{service.name}</button>
                                                            <p className="text-sm text-gray-500">{service.price.toLocaleString('ru-RU')} ₽</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleAddService(service.id)}
                                                            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 whitespace-nowrap"
                                                        >
                                                            + Добавить
                                                        </button>
                                                    </div>
                                                    <button onClick={() => setModalSampleService(service)} className="text-xs text-blue-700 hover:underline mt-2">
                                                        Характеристика пробы
                                                    </button>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Selected services and total */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Выбранные услуги</h3>
                        {selectedServices.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Добавьте услуги из списка слева, чтобы рассчитать стоимость.</p>
                        ) : (
                            <div className="space-y-4">
                                {selectedServices.map(s => {
                                    const serviceInfo = allCalcServices.find(info => info.id === s.id);
                                    if (!serviceInfo) return null;
                                    return (
                                        <div key={s.id} className="border-b pb-4 last:border-b-0">
                                            <div className="flex justify-between items-start">
                                                <p className="font-medium pr-4">{serviceInfo.name}</p>
                                                <button onClick={() => handleRemoveService(s.id)} aria-label={`Удалить ${serviceInfo.name}`} className="text-red-500 hover:text-red-700 font-bold text-xl flex-shrink-0 leading-none">&times;</button>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2">
                                                <label htmlFor={`quantity-${s.id}`} className="text-sm text-gray-600">Кол-во:</label>
                                                <input
                                                    id={`quantity-${s.id}`}
                                                    type="number"
                                                    value={s.quantity}
                                                    onChange={(e) => handleQuantityChange(s.id, parseInt(e.target.value, 10))}
                                                    min="1"
                                                    className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <p className="ml-auto font-semibold">{(s.quantity * s.price).toLocaleString('ru-RU')} ₽</p>
                                            </div>
                                        </div>
                                    );
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
        </>
    );
};

export default Calculator;