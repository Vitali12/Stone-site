import React, { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapIcon, ChatBubbleBottomCenterTextIcon } from './IconComponents';

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
                    <p className="text-blue-200">185910 г.Петрозаводск, ул.Пушкинская, д.10, корпус Института геологии, каб. 223</p>
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
            <li className="flex items-start gap-4">
                <ChatBubbleBottomCenterTextIcon className="w-7 h-7 text-green-400 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold">Telegram Ассистент</h3>
                    <p className="text-blue-200">
                        Вы можете получить более детальную информацию у нашего Ассистента:{' '}
                        <a href="https://t.me/Shekov_Assistant_Bot" target="_blank" rel="noopener noreferrer" className="text-white hover:underline break-all">
                            https://t.me/Shekov_Assistant_Bot
                        </a>
                    </p>
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
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', commentary: '', consent: false });
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setError('');
        const FORM_ENDPOINT = "https://formspree.io/f/mqkrvgzz"; 
        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', commentary: '', consent: false });
                 setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="bg-white p-8 lg:p-12 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Форма обратной связи</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Ваше имя:" className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} placeholder="* E-mail:" className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div>
                    <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} placeholder="* Телефон:" className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div>
                    <textarea name="commentary" id="commentary" rows={5} value={formData.commentary} onChange={handleChange} placeholder="Комментарий:" className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"></textarea>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="consent" name="consent" type="checkbox" required checked={formData.consent} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="consent" className="text-gray-700">
                            Я выражаю согласие на обработку данных <span className="text-red-500">*</span>
                        </label>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={status === 'sending' || !formData.consent} className="w-full bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors disabled:bg-green-400">
                        {status === 'sending' ? 'Отправка...' : 'Отправить сообщение'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export const ContactPage: React.FC = () => {
    return (
        <div className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-800">Контакты</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}