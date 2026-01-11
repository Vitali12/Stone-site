import React from 'react';
import { Link } from 'react-router-dom';
import { BeakerIcon, PhoneIcon, EnvelopeIcon, MapIcon, ChatBubbleBottomCenterTextIcon } from './IconComponents';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BeakerIcon className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold">ИЦ ИГ КарНЦ РАН</span>
            </Link>
            <p className="text-gray-400">
              Ваш надежный партнер в области испытаний строительных материалов и геологических изысканий.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">О компании</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Услуги</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">Портфолио</Link></li>
              <li><Link to="/contacts" className="text-gray-400 hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Main Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Основные услуги</h3>
            <ul className="space-y-2">
              <li><Link to="/services/gravel" className="text-gray-400 hover:text-white transition-colors">Испытания щебня</Link></li>
              <li><Link to="/services/sand" className="text-gray-400 hover:text-white transition-colors">Испытания песка</Link></li>
              <li><Link to="/services/soil" className="text-gray-400 hover:text-white transition-colors">Испытания грунтов</Link></li>
              <li><Link to="/services/radiology" className="text-gray-400 hover:text-white transition-colors">Радиология</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapIcon className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                <span className="text-gray-400">185910 г.Петрозаводск, ул.Пушкинская, д.10, корпус Института геологии, каб. 223</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="tel:+79217260273" className="text-gray-400 hover:text-white transition-colors">+7 (921) 726-02-73</a>
              </li>
              <li className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="mailto:i@vshekov.ru" className="text-gray-400 hover:text-white transition-colors">i@vshekov.ru</a>
              </li>
               <li className="flex items-start gap-3">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-gray-400">
                      Вы можете получить более детальную информацию у нашего Ассистента: <a href="https://t.me/Shekov_Assistant_Bot" target="_blank" rel="noopener noreferrer" className="text-white hover:underline break-all">https://t.me/Shekov_Assistant_Bot</a>
                  </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ИЦ ИГ КарНЦ РАН. Все права защищены.
        </div>
      </div>
    </footer>
  );
};