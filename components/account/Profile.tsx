import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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
            <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                </div>
                {/* Здесь можно будет добавить другие поля профиля */}
            </div>
            <div className="mt-8">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
                >
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

export default Profile;