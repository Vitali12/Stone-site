
import React from 'react';

// Новый набор изображений для действующей аккредитации (2024-2027)
const certificateImages = Array.from(
  { length: 9 }, 
  (_, i) => `https://storage.googleapis.com/aai-web-samples/custom-applications/rock-lab/accreditation-2024-cert-${i + 1}.jpg`
);


const AccreditationPage: React.FC = () => {
    return (
        <div className="prose max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Аккредитация и сертификаты</h2>
            <p>
                Начиная с 1995 года Испытательный центр горных пород регулярно проходит процедуру аккредитации в сертифицированных учреждениях Российской Федерации, подтверждая свою компетентность и соответствие высоким стандартам.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 my-6 rounded-r-lg not-prose">
                <h3 className="font-bold text-lg">Действующая аккредитация</h3>
                <p className="mt-2">
                    В настоящее время Испытательный центр работает в соответствии со <strong>Свидетельством об аккредитации испытательной лаборатории № ИЛ-РОС-000841</strong>, выданном 19 апреля 2024 года и действующим до 19 апреля 2027 года.
                </p>
            </div>
            
            <p className="mb-6">
                Ниже представлены страницы действующего свидетельства об аккредитации и области аккредитации. Нажмите на изображение, чтобы просмотреть его в полном размере.
            </p>
            
            <div className="not-prose grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {certificateImages.map((src, index) => (
                    <a 
                        key={index} 
                        href={src} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block border rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    >
                        <img
                            src={src}
                            alt={`Свидетельство об аккредитации (2024-2027) - Страница ${index + 1}`}
                            className="w-full h-auto object-cover aspect-[3/4]"
                            loading="lazy"
                        />
                         <p className="text-center text-xs p-2 bg-gray-50 group-hover:text-blue-700 font-medium">Страница {index + 1}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default AccreditationPage;
