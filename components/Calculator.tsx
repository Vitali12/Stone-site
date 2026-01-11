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
  'gost30629-5': 5,
  'gost30629-6': 5,
  'gost30629-9': 15,
};
const PREP_SERVICE_ID_CORE = 'prep-1';
const PREP_SERVICE_ID_LUMP = 'prep-3';

export const Calculator: React.FC = () => {
    const { saveCalculation, isAuthenticated, showAuthModal } = useAuth();
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
        if (!isAuthenticated) {
            // Если не авторизован, предлагаем регистрацию/вход
            showAuthModal('register');
            return;
        }

        const allServicesToSave: SavedService[] = selectedServices.map(s => {
            const info = allCalcServices.find(i => i.id === s.id)!;
            return { id: s.id, name: info.name, quantity: s.quantity, price: s.price };
        });

        if (autoPrepService) {
             const info = allCalcServices.find(i => i.id === autoPrepService.id)!;
             allServicesToSave.push({ id: autoPrepService.id, name: `${info.name} (авто)`, quantity: autoPrepService.quantity, price: autoPrepService.price });
        }

        try {
            saveCalculation({ totalCost, services: allServicesToSave });
            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } catch (error) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
    };

    const selectedServiceIds = useMemo(() => new Set(selectedServices.map(s => s.id)), [selectedServices]);

    return (
        <>
            {modalMethodService && <InfoModal title={`Метод: ${modalMethodService.name}`} content={modalMethodService.methodDescription} onClose={() => setModalMethodService(null)} />}
            {modalSampleService && <InfoModal title={`Характеристика пробы: ${modalSampleService.name}`} content={modalSampleService.sampleDescription} onClose={() => setModalSampleService(null)} />}
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-7xl mx-auto border border-gray-100">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Калькулятор стоимости услуг</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="border border-gray-100 rounded-2xl p-5 h-full max-h-[75vh] overflow-y-auto bg-gray-50/30">
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 -mt-5 -mx-5 px-5 pt-5 pb-6 border-b border-gray-100 mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Выбор испытаний</h3>
                            <div className="bg-blue-800 p-4 rounded-xl shadow-inner shadow-blue-900/20">
                                <p className="font-semibold text-white mb-3 text-sm">Тип предоставляемого материала:</p>
                                <div className="flex flex-wrap gap-4">
                                    {['core', 'lump', 'ready'].map((val) => (
                                        <label key={val} className="flex items-center space-x-2 cursor-pointer group">
                                            <input type="radio" name="materialSource" value={val} checked={materialSource === val} onChange={() => setMaterialSource(val as any)} className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300" />
                                            <span className={`text-sm font-medium transition-colors ${materialSource === val ? 'text-white' : 'text-blue-200 group-hover:text-white'}`}>
                                                {val === 'core' ? 'Керны' : val === 'lump' ? 'Штуфы' : 'Готовые образцы'}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {CALCULATOR_DATA.map((gostGroup) => {
                                const isPrepWork = gostGroup.gost === "Подготовительные работы";
                                return (
                                <div key={gostGroup.gost}>
                                    {!isPrepWork && (
                                        <h4 
                                            onClick={() => gostGroup.gost.toLowerCase().startsWith('гост') && handleViewGost(gostGroup.gost)}
                                            className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer"
                                        >
                                            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                                            {gostGroup.gost}
                                        </h4>
                                    )}
                                    <div className="space-y-3 mt-2 border-l-2 pl-4 border-gray-100">
                                        {gostGroup.services.map(service => {
                                            if (selectedServiceIds.has(service.id)) return null;
                                            if (autoPrepService && service.id === autoPrepService.id) return null;
                                            
                                            let isDisabled = false;
                                            if (isPrepWork) {
                                                if (materialSource === 'ready' && ['prep-1', 'prep-2', 'prep-3', 'prep-4', 'prep-9'].includes(service.id)) isDisabled = true;
                                                else if (materialSource === 'core' && ['prep-2', 'prep-3', 'prep-4'].includes(service.id)) isDisabled = true;
                                                else if (materialSource === 'lump' && service.id === 'prep-1') isDisabled = true;
                                            }

                                            return (
                                                <div key={service.id} className={`p-4 rounded-xl border transition-all duration-200 ${isDisabled ? 'bg-gray-50 opacity-50 border-transparent' : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'}`}>
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div className='flex-1'>
                                                            <button onClick={() => setModalMethodService(service)} className="font-bold text-left text-gray-800 hover:text-blue-700 transition-colors text-sm" disabled={isDisabled}>{service.name}</button>
                                                            <p className="text-green-600 font-bold mt-1 text-sm">{service.price.toLocaleString('ru-RU')} ₽</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleAddService(service.id)}
                                                            className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap disabled:hidden"
                                                            disabled={isDisabled}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col h-full lg:sticky lg:top-24">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <CubeIcon className="w-7 h-7 text-blue-400" />
                            Ваш расчет
                        </h3>
                        {selectedServices.length === 0 && !autoPrepService ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-slate-400 py-20 border-2 border-dashed border-slate-700 rounded-xl">
                                <p className="text-center px-4">Выберите необходимые испытания из списка слева</p>
                            </div>
                        ) : (
                            <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                                {selectedServices.map(s => {
                                    const serviceInfo = allCalcServices.find(info => info.id === s.id);
                                    if (!serviceInfo) return null;
                                    return (
                                        <div key={s.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 group">
                                            <div className="flex justify-between items-start mb-3">
                                                <p className="font-bold text-sm leading-tight pr-6">{serviceInfo.name}</p>
                                                <button onClick={() => handleRemoveService(s.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                                                    &times;
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center bg-slate-700 rounded-lg overflow-hidden">
                                                    <button onClick={() => handleQuantityChange(s.id, s.quantity - 1)} className="px-3 py-1 hover:bg-slate-600">-</button>
                                                    <input
                                                        type="number"
                                                        value={s.quantity}
                                                        onChange={(e) => handleQuantityChange(s.id, parseInt(e.target.value, 10))}
                                                        className="w-12 bg-transparent text-center text-sm font-bold focus:outline-none"
                                                    />
                                                    <button onClick={() => handleQuantityChange(s.id, s.quantity + 1)} className="px-3 py-1 hover:bg-slate-600">+</button>
                                                </div>
                                                <p className="font-bold text-blue-400">{(s.quantity * s.price).toLocaleString('ru-RU')} ₽</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {autoPrepService && (
                                     <div className="bg-blue-600/20 p-4 rounded-xl border border-blue-500/30">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-bold text-sm text-blue-300">Подготовка образцов (автоматически)</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-blue-400">Количество: {autoPrepService.quantity} шт.</span>
                                            <p className="font-bold text-blue-400">{(autoPrepService.quantity * autoPrepService.price).toLocaleString('ru-RU')} ₽</p>
                                        </div>
                                     </div>
                                )}
                            </div>
                        )}
                        <div className="mt-8 pt-8 border-t border-slate-700">
                            <div className="flex justify-between items-center text-3xl font-bold mb-6">
                                <span>Итого:</span>
                                <span className="text-green-400">{totalCost.toLocaleString('ru-RU')} ₽</span>
                            </div>
                            <button 
                                onClick={handleSaveCalculation}
                                disabled={selectedServices.length === 0}
                                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-900/40"
                            >
                                {isAuthenticated ? 'Сохранить расчет' : 'Войти, чтобы сохранить'}
                            </button>
                            {saveStatus === 'success' && <p className="text-green-400 text-center mt-3 font-bold animate-bounce">Расчет сохранен в кабинете!</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};