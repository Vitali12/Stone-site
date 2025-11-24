import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { UsersIcon, ChevronRightIcon } from '../IconComponents';

const AdminPage: React.FC = () => {
    const { getAllUsers } = useAuth();
    const users = getAllUsers();

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800">Панель администратора</h1>
                <p className="mt-2 text-lg text-gray-600">Управление пользователями и их документами.</p>
            </div>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <UsersIcon className="w-7 h-7" />
                    Зарегистрированные пользователи
                </h2>
                <div className="flow-root">
                    {users.length > 0 ? (
                        <ul role="list" className="-my-4 divide-y divide-gray-200">
                            {users.map(user => (
                                <li key={user.email}>
                                    <Link to={`/admin/user/${encodeURIComponent(user.email)}`} className="flex items-center py-4 space-x-4 group transition-colors hover:bg-gray-50 -mx-6 px-6">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-blue-800 truncate group-hover:underline">{user.email}</p>
                                            <p className={`text-sm ${user.role === 'admin' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>{user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
                                        </div>
                                        <div>
                                            <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-700" />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <p className="text-center text-gray-500 py-8">Нет зарегистрированных пользователей.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;