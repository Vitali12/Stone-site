import React from 'react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">{title}</h1>
      <p className="text-xl text-gray-600 mb-8">Этот раздел находится в разработке.</p>
      <Link
        to="/"
        className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};