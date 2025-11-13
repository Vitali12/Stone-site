import React, { useState, useMemo, useEffect } from 'react';
import { CALCULATOR_DATA } from '../constants';
import type { CalcService } from '../constants';
import { InfoModal } from './Modals';
import { CubeIcon } from './IconComponents';
import { useAuth } from '../hooks/useAuth';
import type { SavedService } from '../types';

interface SelectedService {
    id: string;
    quantity: number;
    price: number;
}

const SAMPLES_MAP: { [key: string]: number } = {
  'gost30629-5': 5,  // Определение предела прочности при сжатии в сухом состоянии
  'gost30629-6': 5,  // Определение предела прочности при сжатии в водонасыщенном состоянии
  'gost30629-9': 15, // Определение морозостойкости горной породы (150 циклов) - 5 осн. + 2 контр. по 5 = 15.
};
const PREP_SERVICE_ID_CORE = 'prep-1'; // Изготовление образцов из керна
const PREP_SERVICE_ID_LUMP = 'prep-3'; // Изготовление стандартных образцов из штуфа

const Calculator: React.FC = () => {
    const { saveCalculation } = useAuth();
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
    const [autoPrepService, setAutoPrepService] = useState<SelectedService | null>(null);
    const [materialSource, setMaterialSource] = useState<'core' | 'lump' | 'ready'>('core');
    const [modalMethodService, setModalMethodService] = useState<CalcService | null>(null);
    const [modalSampleService, setModalSampleService] = useState<CalcService | null>(null);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const allCalcServices = useMemo(() => CALCULATOR_DATA.flatMap(gost => gost.services), []);
    
    useEffect(() => {
        if (materialSource === 'ready') {
            setAutoPrepService(null);
            return;
        }

        const requiredSamples = selectedServices
            .reduce((total, s) => total + (SAMPLES_MAP[s.id] || 0) * s.quantity, 0);

        if (requiredSamples > 0) {
            const prepServiceId = materialSource === 'core' ? PREP_SERVICE_ID_CORE : PREP_SERVICE_ID_LUMP;
            const prepServiceInfo = allCalcServices.find(s => s.id === prepServiceId);
            if (prepServiceInfo) {
                setAutoPrepService({
                    id: prepServiceId,
                    quantity: requiredSamples,
                    price: prepServiceInfo.price,
                });
            }
        } else {
            setAutoPrepService(null);
        }
    }, [selectedServices, materialSource, allCalcServices]);

    const handleViewGost = (gostNumber: string) => {
        const query = encodeURIComponent(gostNumber);
        const url = `https://docs.cntd.ru/search?q=${query}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

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
        const manualCost = selectedServices.reduce((total, s) => total + s.price * s.quantity, 0);
        const autoCost = autoPrepService ? autoPrepService.price * autoPrepService.quantity : 0;
        return manualCost + autoCost;
    }, [selectedServices, autoPrepService]);

    const handleSaveCalculation = () => {
        const allServicesToSave: SavedService[] = selectedServices.map(s => {
            const info = allCalcServices.find(i => i.id === s.id)!;
            return { id: s.id, name: info.name, quantity: s.quantity, price: s.price };
        });

        if (autoPrepService) {
             const info = allCalcServices.find(i => i.id === autoPrepService.id)!;
             allServicesToSave.push({ id: autoPrepService.id, name: `${info.name} (авто)`, quantity: autoPrepService.quantity, price: autoPrepService.price });
        }

        try {
            saveCalculation({
                totalCost,
                services: allServicesToSave,
            });
            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
    };

    const selectedServiceIds = useMemo(() => new Set(selectedServices.map(s => s.id)), [selectedServices]);

    const autoPrepServiceInfo = useMemo(() => {
        if (!autoPrepService) return null;
        return allCalcServices.find(s => s.id === autoPrepService.id);
    }, [autoPrepService, allCalcServices]);

    return (
        <>
            {modalMethodService && <InfoModal title={`Метод: ${modalMethodService.name}`} content={modalMethodService.methodDescription} onClose={() => setModalMethodService(null)} />}
            {modalSampleService && <InfoModal title={`Характеристика пробы: ${modalSampleService.name}`} content={modalSampleService.sampleDescription} onClose={() => setModalSampleService(null)} />}
            
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Калькулятор стоимости</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side: Add services */}
                    <div className="border border-gray-200 rounded-lg p-4 h-full max-h-[80vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white z-10 -mt-4 -mx-4 px-4 pt-4 pb-6 border-b border-gray-200">
                            <h3 className="text-xl font-semibold mb-4">Добавить услугу</h3>
                             {/* Material source selection */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                <p className="font-semibold text-gray-800 mb-2">Какой исходный материал вы предоставляете?</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="materialSource" value="core" checked={materialSource === 'core'} onChange={() => setMaterialSource('core')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                                        <span className="text-sm">Керны</span>
                                    </label>
                                     <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="materialSource" value="lump" checked={materialSource === 'lump'} onChange={() => setMaterialSource('lump')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                                        <span className="text-sm">Штуфы / Блоки</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="materialSource" value="ready" checked={materialSource === 'ready'} onChange={() => setMaterialSource('ready')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"/>
                                        <span className="text-sm">Готовые образцы</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {CALCULATOR_DATA.map((gostGroup) => {
                                const isPrepWork = gostGroup.gost === "Подготовительные работы";
                                return (
                                <div key={gostGroup.gost}>
                                    {!isPrepWork && (
                                        <h4 
                                            onClick={() => gostGroup.gost.toLowerCase().startsWith('гост') && handleViewGost(gostGroup.gost)}
                                            className={`text-lg font-bold text-gray-800 mb-2 ${gostGroup.gost.toLowerCase().startsWith('гост') ? 'hover:text-blue-800 transition-colors cursor-pointer' : ''}`}
                                            title={gostGroup.gost.toLowerCase().startsWith('гост') ? `Найти документ ${gostGroup.gost}` : ''}
                                        >
                                            {gostGroup.gost}: <span className="font-normal text-base">{gostGroup.title}</span>
                                        </h4>
                                    )}
                                    <div className="space-y-2 mt-2 border-l-2 pl-4 border-gray-200">
                                        {gostGroup.services.map(service => {
                                            if (selectedServiceIds.has(service.id)) return null;
                                            // Hide auto-added prep service from the manual list
                                            if (autoPrepService && service.id === autoPrepService.id) return null;
                                            
                                            let isDisabled = false;
                                            let disabledTitle = "";

                                            if (isPrepWork) {
                                                if (materialSource === 'ready') {
                                                    if (['prep-1', 'prep-2', 'prep-3', 'prep-4', 'prep-9'].includes(service.id)) {
                                                         isDisabled = true;
                                                         disabledTitle = "Не требуется при предоставлении готовых образцов";
                                                    }
                                                } else if (materialSource === 'core') {
                                                    if (['prep-2', 'prep-3', 'prep-4'].includes(service.id)) {
                                                         isDisabled = true;
                                                         disabledTitle = "Неприменимо для материала 'Керны'";
                                                    }
                                                } else if (materialSource === 'lump') {
                                                    if (service.id === 'prep-1') {
                                                         isDisabled = true;
                                                         disabledTitle = "Неприменимо для материала 'Штуфы / Блоки'";
                                                    }
                                                }
                                            }

                                            return (
                                                <div key={service.id} className={`p-3 rounded-md transition-colors ${isDisabled ? 'bg-gray-100' : 'bg-gray-50'}`}>
                                                    <div className="flex justify-between items-start">
                                                        <div className='flex-1 pr-2'>
                                                            <button onClick={() => setModalMethodService(service)} className="font-medium text-left hover:text-blue-600 transition-colors text-sm disabled:text-gray-400 disabled:cursor-not-allowed disabled:no-underline" disabled={isDisabled}>{service.name}</button>
                                                            <p className={`text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-500'}`}>{service.price.toLocaleString('ru-RU')} ₽</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleAddService(service.id)}
                                                            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                            disabled={isDisabled}
                                                            title={disabledTitle}
                                                        >
                                                            + Добавить
                                                        </button>
                                                    </div>
                                                    <button onClick={() => setModalSampleService(service)} className="text-xs text-blue-700 hover:underline mt-2 disabled:text-gray-400 disabled:cursor-not-allowed disabled:no-underline" disabled={isDisabled}>
                                                        Характеристика пробы
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Right side: Selected services and total */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Выбранные услуги</h3>
                        {selectedServices.length === 0 && !autoPrepService ? (
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
                                {autoPrepService && autoPrepServiceInfo && (
                                     <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium pr-4">{autoPrepServiceInfo.name}</p>
                                                <p className="text-xs text-blue-700">(автоматически для выбранных испытаний)</p>
                                            </div>
                                            <CubeIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                                        </div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-sm text-gray-600">Кол-во:</span>
                                            <span className="font-semibold">{autoPrepService.quantity}</span>
                                            <p className="ml-auto font-semibold">{(autoPrepService.quantity * autoPrepService.price).toLocaleString('ru-RU')} ₽</p>
                                        </div>
                                     </div>
                                )}
                            </div>
                        )}
                        <div className="mt-6 pt-6 border-t-2 border-dashed border-blue-200">
                            <div className="flex justify-between items-center text-2xl font-bold">
                                <span>Итого:</span>
                                <span className="text-green-600">{totalCost.toLocaleString('ru-RU')} ₽</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Стоимость является предварительной и может быть уточнена менеджером.</p>
                            
                            <div className="mt-6">
                                <button 
                                    onClick={handleSaveCalculation}
                                    disabled={selectedServices.length === 0}
                                    className="w-full bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                                >
                                    Сохранить расчет в личный кабинет
                                </button>
                                {saveStatus === 'success' && <p className="text-green-600 text-center mt-2 text-sm font-medium">Расчет успешно сохранен!</p>}
                                {saveStatus === 'error' && <p className="text-red-600 text-center mt-2 text-sm font-medium">Ошибка сохранения. Попробуйте снова.</p>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calculator;