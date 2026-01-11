import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { UserProfile } from '../../types';

export const Profile: React.FC = () => {
    const { user, userProfile, updateUserProfile, logout } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<UserProfile>({
        firstName: '',
        lastName: '',
        phone: '',
        company: '',
        position: ''
    });
    
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (userProfile) {
            setFormData(userProfile);
        }
    }, [userProfile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);
        
        try {
            await updateUserProfile(formData);
            setMessage({ text: 'Данные профиля успешно обновлены', type: 'success' });
        } catch (error) {
            setMessage({ text: 'Ошибка при сохранении данных', type: 'error' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return <p>Загрузка данных пользователя...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Профиль пользователя</h2>
            
            <div className="bg-white rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
                        <label className="block text-sm font-medium text-blue-800 mb-1">Email (Логин)</label>
                        <div className="text-gray-700 font-semibold">{user.email}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                placeholder="Иван"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                placeholder="Иванов"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                            placeholder="+7 (999) 000-00-00"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Компания</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                placeholder="ООО Строитель"
                            />
                        </div>
                        <div>
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                placeholder="Инженер"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t mt-6">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-green-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed shadow-sm"
                        >
                            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                        </button>
                        
                        {message && (
                            <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {message.text}
                            </span>
                        )}
                    </div>
                </form>
            </div>
            
            <div className="mt-12 border-t pt-6">
                <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 font-medium text-sm hover:underline"
                >
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};