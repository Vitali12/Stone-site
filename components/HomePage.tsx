
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BENEFITS, POPULAR_SERVICES, TESTIMONIALS, ARTICLES } from '../constants';
import type { Testimonial } from '../types';
import { ChevronRightIcon } from './IconComponents';

const HeroSection: React.FC = () => (
  <div className="relative bg-gray-800 text-white overflow-hidden">
    <div className="absolute inset-0">
      <img src="https://picsum.photos/1920/1080?blur=5&grayscale" alt="Background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-blue-900/70"></div>
    </div>
    <div className="relative container mx-auto px-4 py-24 sm:py-32 lg:py-48 text-center">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
        Точные испытания — <br />
        <span className="text-green-400">прочный фундамент вашего успеха</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg lg:text-xl text-gray-200">
        Аккредитованная лаборатория по испытанию строительных материалов. Гарантия точности, соблюдение сроков и полное соответствие ГОСТ.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/services/calculator"
          className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
        >
          Рассчитать стоимость
        </Link>
        <Link
          to="/contacts"
          className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition-all duration-300"
        >
          Заказать консультацию
        </Link>
      </div>
    </div>
  </div>
);

const BenefitsSection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {BENEFITS.map((benefit, index) => (
          <div key={index} className="p-6">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
              <benefit.icon className="w-8 h-8 text-blue-800" />
            </div>
            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServiceCard: React.FC<{ service: typeof POPULAR_SERVICES[0] }> = ({ service }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col h-full">
        <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <service.icon className="w-7 h-7 text-green-600" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 leading-snug">{service.title}</h3>
                </div>
            </div>
            <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
            <Link to={`/services/${service.category}`} className="font-semibold text-blue-800 hover:text-blue-600 flex items-center gap-1 mt-auto inline-flex w-fit">
                Подробнее <ChevronRightIcon className="w-4 h-4" />
            </Link>
        </div>
    </div>
);


const PopularServices: React.FC = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Популярные услуги</h2>
        <p className="mt-4 text-lg text-gray-600">Наиболее востребованные испытания среди наших клиентов.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {POPULAR_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service}/>
        ))}
      </div>
        <div className="text-center mt-12">
            <Link to="/services" className="bg-blue-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-900 transition-all duration-300">
                Все услуги
            </Link>
        </div>
    </div>
  </section>
);

const TestimonialsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            nextTestimonial();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextTestimonial]);
    
    const currentTestimonial: Testimonial = TESTIMONIALS[currentIndex];

    return (
        <section className="py-16 bg-blue-800 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold">Отзывы клиентов</h2>
                    <p className="mt-4 text-lg text-blue-200">Нам доверяют лидеры строительной отрасли.</p>
                </div>
                <div className="relative max-w-3xl mx-auto">
                     <div className="bg-white/10 p-8 rounded-lg text-center transition-opacity duration-500 ease-in-out">
                        <img src={currentTestimonial.avatarUrl} alt={currentTestimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-400" />
                        <p className="text-lg italic mb-6">"{currentTestimonial.quote}"</p>
                        <div className="font-bold text-green-400">{currentTestimonial.name}</div>
                        <div className="text-blue-200">{currentTestimonial.company}</div>
                    </div>
                    <div className="flex justify-center mt-6 space-x-2">
                        {TESTIMONIALS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-green-400' : 'bg-white/50 hover:bg-white'}`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const NewsSection: React.FC = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold">Новости и статьи</h2>
                <p className="mt-4 text-lg text-gray-600">Полезная информация, обзоры и последние новости отрасли.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ARTICLES.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                        <Link to={article.href}>
                            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity" />
                        </Link>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">
                                <Link to={article.href} className="hover:text-blue-800 transition-colors">{article.title}</Link>
                            </h3>
                            <p className="text-gray-600 mb-4">{article.excerpt}</p>
                            <Link to={article.href} className="font-semibold text-blue-800 hover:text-blue-600 flex items-center gap-1">
                                Читать далее <ChevronRightIcon className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CTASection: React.FC = () => (
  <section className="bg-gray-50">
    <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-lg shadow-xl p-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Готовы начать проект?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-200">
            Свяжитесь с нами для бесплатной консультации или ознакомьтесь с полным перечнем наших услуг.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contacts"
              className="w-full sm:w-auto bg-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Связаться с нами
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-800 transition-all duration-300"
            >
              Все услуги
            </Link>
          </div>
        </div>
    </div>
  </section>
);


const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <PopularServices />
      <TestimonialsSection />
      <CTASection />
      <NewsSection />
    </>
  );
};

export default HomePage;
