
import React, { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapIcon } from './IconComponents';

const ContactInfo: React.FC = () => (
    <div className="bg-blue-800 text-white p-8 lg:p-12 rounded-lg space-y-8">
        <div>
            <h2 className="text-3xl font-bold mb-4">Контактная информация</h2>
            <p className="text-blue-200">Мы всегда на связи и готовы ответить на ваши вопросы.</p>
        </div>
        <ul className="space-y-6">
            <li className="flex items-start gap-4">
                <MapIcon className="w-7 h-7 mt-1 text-green-400 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Адрес</h3>
                    <p className="text-blue-200">185910 г.Петрозаводск, ул. Пушкинская, д. 11, корпус Института геологии, каб.223-В</p>
                </div>
            </li>
            <li className="flex items-start gap-4">
                <PhoneIcon className="w-7 h-7 text-green-400 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Телефон</h3>
                    <a href="tel:+79217260273" className="text-blue-200 hover:text-white transition-colors">+7 (921) 726-02-73</a>
                </div>
            </li>
            <li className="flex items-start gap-4">
                <EnvelopeIcon className="w-7 h-7 text-green-400 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:i@vshekov.ru" className="text-blue-200 hover:text-white transition-colors">i@vshekov.ru</a>
                </div>
            </li>
        </ul>
        <div className="pt-6 border-t border-blue-700">
            <h3 className="font-semibold mb-2">Часы работы</h3>
            <p className="text-blue-200">Пн-Пт: 10:00 - 16:00</p>
            <p className="text-blue-200">Сб, Вс: Выходной</p>
        </div>
    </div>
);


const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <div className="bg-white p-8 lg:p-12 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Форма обратной связи</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                    <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div>
                    <button type="submit" disabled={status === 'sending'} className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:bg-green-400">
                        {status === 'sending' ? 'Отправка...' : 'Отправить сообщение'}
                    </button>
                </div>
                {status === 'success' && <p className="text-green-600">Ваше сообщение успешно отправлено!</p>}
            </form>
        </div>
    );
}

const ContactPage: React.FC = () => {
    return (
        <div className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-800">Контакты</h1>
                    <p className="mt-2 text-lg text-gray-600">Свяжитесь с нами любым удобным способом.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <ContactInfo />
                    <ContactForm />
                </div>
                <div className="mt-12">
                     <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Мы на карте</h2>
                     <div className="bg-gray-300 h-96 rounded-lg shadow-md flex items-center justify-center">
                        <p className="text-gray-500">Здесь будет интерактивная карта</p>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;
