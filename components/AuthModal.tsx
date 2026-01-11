import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { XIcon } from './IconComponents';

export const AuthModal: React.FC = () => {
    const { authState, hideAuthModal, login, register } = useAuth();
    const { isModalOpen, defaultView } = authState;
    const [view, setView] = useState<'login' | 'register'>(defaultView);
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => { 
        setView(defaultView); 
        setError('');
        setFormData({ email: '', password: '', confirmPassword: '' });
    }, [defaultView, isModalOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (view === 'register' && formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают.');
            return;
        }

        setIsLoading(true);
        try {
            if (view === 'register') {
                await register(formData.email, formData.password);
                hideAuthModal();
            } else {
                await login(formData.email, formData.password);
            }
        } catch (err: any) {
            setError(err.message || 'Произошла ошибка при входе.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity duration-300" 
            onClick={(e) => e.target === e.currentTarget && hideAuthModal()}
        >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in duration-300">
                <button 
                    onClick={hideAuthModal} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10"
                    aria-label="Закрыть"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {view === 'login' ? 'С возвращением!' : 'Создать аккаунт'}
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            {view === 'login' 
                                ? 'Войдите, чтобы управлять своими расчетами' 
                                : 'Зарегистрируйтесь, чтобы сохранять результаты испытаний'}
                        </p>
                    </div>

                    <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                        <button 
                            onClick={() => { setView('login'); setError(''); }} 
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${view === 'login' ? 'bg-white text-blue-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Вход
                        </button>
                        <button 
                            onClick={() => { setView('register'); setError(''); }} 
                            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${view === 'register' ? 'bg-white text-blue-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Регистрация
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="name@company.ru" 
                                required 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Пароль</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="••••••••" 
                                required 
                                value={formData.password} 
                                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                            />
                        </div>

                        {view === 'register' && (
                            <div className="animate-in slide-in-from-top-2 duration-300">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Подтвердите пароль</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    placeholder="••••••••" 
                                    required 
                                    value={formData.confirmPassword} 
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                                />
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-blue-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-900 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-blue-800/20 mt-4"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Загрузка...
                                </span>
                            ) : (
                                view === 'login' ? 'Войти' : 'Создать аккаунт'
                            )}
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            {view === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
                            <button 
                                onClick={() => { setView(view === 'login' ? 'register' : 'login'); setError(''); }}
                                className="ml-2 text-blue-800 font-bold hover:underline"
                            >
                                {view === 'login' ? 'Зарегистрироваться' : 'Войти'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};