
import React from 'react';

const EquipmentPage: React.FC = () => {
    return (
        <div className="prose max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Оборудование</h2>
            <p>
                Наше оборудование включает все необходимые приборы и комплектующие их вспомогательные устройства, необходимые для оценки полного спектра всех тех показателей горных пород, которые включены в ГОСТы на горные породы для строительных материалов, на продукцию из горных пород - облицовочные материалы, щебень, пески.
            </p>
             <img
                src={`https://picsum.photos/600/350?random=equipment`}
                alt="Лабораторное оборудование"
                className="mx-auto rounded-lg shadow-md my-6"
            />
            <p>Мы используем как проверенные временем, так и современные измерительные комплексы для обеспечения высокой точности и надежности результатов.</p>
        </div>
    );
};

export default EquipmentPage;
