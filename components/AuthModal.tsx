import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { XIcon } from './IconComponents';

const AuthModal: React.FC = () => {
    const { authState, hideAuthModal, login, register } = useAuth();
    const { isModalOpen, defaultView } = authState;
    const [view, setView] = useState<'login' | 'register'>(defaultView);
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setView(defaultView);
    }, [defaultView]);

    useEffect(() => {
        if (!isModalOpen) {
            // Reset state when modal closes
            setError('');
            setFormData({ email: '', password: '', confirmPassword: '' });
            setIsLoading(false);
        }
    }, [isModalOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (view === 'register') {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Пароли не совпадают.');
                }
                await register(formData.email, formData.password);
                hideAuthModal();
            } else {
                await login(formData.email, formData.password);
                // The modal will be closed by the context on successful login
            }
        } catch (err: any) {
            setError(err.message || 'Произошла неизвестная ошибка.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            hideAuthModal();
        }
    };
    
    if (!isModalOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" 
            onClick={handleBackdropClick} 
            role="dialog" 
            aria-modal="true"
        >
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative">
                <button 
                    onClick={hideAuthModal} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 z-10" 
                    aria-label="Закрыть"
                >
                    <XIcon className="w-6 h-6" />
                </button>

                <div className="p-8">
                    <div className="flex border-b mb-6">
                        <button onClick={() => setView('login')} className={`flex-1 py-2 text-center font-semibold transition-colors ${view === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                            Вход
                        </button>
                        <button onClick={() => setView('register')} className={`flex-1 py-2 text-center font-semibold transition-colors ${view === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                            Регистрация
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">{view === 'login' ? 'Вход в аккаунт' : 'Создание аккаунта'}</h2>
                    <p className="text-center text-gray-500 mb-6 text-sm">
                        {view === 'login' 
                            ? 'Для доступа к защищенным разделам.' 
                            : 'Регистрация бесплатна и открывает доступ ко всем сервисам.'}
                    </p>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm" role="alert">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                            <input type="password" name="password" id="password" required value={formData.password} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        {view === 'register' && (
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Подтвердите пароль</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        )}
                        <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed">
                            {isLoading ? 'Загрузка...' : (view === 'login' ? 'Войти' : 'Зарегистрироваться')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;