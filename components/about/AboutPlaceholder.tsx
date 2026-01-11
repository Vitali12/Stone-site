import React from 'react';

interface AboutPlaceholderProps {
  title: string;
}

export const AboutPlaceholder: React.FC<AboutPlaceholderProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600">Информация для этого раздела скоро будет добавлена.</p>
       <img
        src={`https://picsum.photos/600/350?random=${title}`}
        alt="Раздел в разработке"
        className="mx-auto rounded-lg shadow-md my-6"
      />
    </div>
  );
};