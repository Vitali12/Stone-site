
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BENEFITS, POPULAR_SERVICES, TESTIMONIALS, ARTICLES } from '../constants.ts';
import type { Testimonial } from '../types.ts';
import { ChevronRightIcon } from './IconComponents.tsx';

const HeroSection: React.FC = () => (
  <div className="relative bg-slate-900 text-white overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1518349619113-03114f06ac3a?q=80&w=2070&auto=format&fit=crop" 
        alt="Rock Laboratory Background" 
        className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow" 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
    </div>
    <div className="relative container mx-auto px-4 py-24 sm:py-32 lg:py-48 flex flex-col items-start text-left">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Инновации в <br />
          <span className="text-blue-400">испытаниях камня</span>
        </h1>
        <p className="mt-8 text-lg lg:text-xl text-slate-300 leading-relaxed">
          Ведущий испытательный центр горных пород ИГ КарНЦ РАН. Точность академической науки для ваших строительных проектов. Аккредитация, опыт, результат.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-start gap-5">
          <Link
            to="/services/calculator"
            className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-500/20 transform hover:-translate-y-1"
          >
            Рассчитать проект
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto bg-slate-800/50 backdrop-blur-md border border-slate-700 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-700 transition-all duration-300"
          >
            Наши услуги
          </Link>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
  </div>
);

const BenefitCard: React.FC<{ benefit: any }> = ({ benefit }) => (
  <div className="group p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-500 transform hover:-translate-y-2">
    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-50 text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
      <benefit.icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
  </div>
);

const BenefitsSection: React.FC = () => (
  <section className="py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Почему выбирают нас?</h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BENEFITS.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </div>
    </div>
  </section>
);

const ServiceCard: React.FC<{ service: any }> = ({ service }) => (
  <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden group flex flex-col h-full hover:shadow-2xl transition-all duration-500">
    <div className="h-2 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
    <div className="p-8 flex flex-col flex-grow">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-colors duration-300">
          <service.icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
      </div>
      <p className="text-slate-600 mb-8 flex-grow leading-relaxed">{service.description}</p>
      <Link to={`/services/${service.category}`} className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 transition-colors">
        Подробнее <ChevronRightIcon className="w-4 h-4" />
      </Link>
    </div>
  </div>
);

const PopularServices: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Популярные услуги</h2>
          <p className="text-lg text-slate-600">Комплексные решения для оценки качества нерудных строительных материалов и облицовочного камня.</p>
        </div>
        <Link to="/services" className="inline-flex items-center px-6 py-3 border-2 border-slate-900 rounded-full font-bold hover:bg-slate-900 hover:text-white transition-all duration-300">
          Все услуги
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {POPULAR_SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service}/>
        ))}
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
        const timer = setInterval(nextTestimonial, 7000);
        return () => clearInterval(timer);
    }, [nextTestimonial]);
    
    const currentTestimonial: Testimonial = TESTIMONIALS[currentIndex];

    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-24 opacity-10">
              <svg className="w-64 h-64 text-white fill-current" viewBox="0 0 32 32">
                <path d="M10 8v8h6l-2.5 6h4l2.5-6v-8h-10zm12 0v8h6l-2.5 6h4l2.5-6v-8h-10z" />
              </svg>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold sm:text-4xl mb-4">Отзывы партнеров</h2>
                    <p className="text-slate-400 text-lg">Мнение тех, кто уже оценил качество нашей работы.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                     <div className="relative bg-slate-800/50 backdrop-blur-sm p-10 md:p-16 rounded-3xl border border-slate-700">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                          <img 
                            src={currentTestimonial.avatarUrl} 
                            alt={currentTestimonial.name} 
                            className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-700 shadow-2xl flex-shrink-0" 
                          />
                          <div className="text-center md:text-left">
                            <p className="text-xl md:text-2xl italic leading-relaxed text-slate-200 mb-8">
                              "{currentTestimonial.quote}"
                            </p>
                            <div>
                              <div className="text-lg font-bold text-blue-400">{currentTestimonial.name}</div>
                              <div className="text-slate-500 font-medium">{currentTestimonial.company}</div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10 space-x-3">
                        {TESTIMONIALS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 transition-all duration-300 rounded-full ${currentIndex === index ? 'w-12 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ArticleCard: React.FC<{ article: any }> = ({ article }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-500">
    <div className="relative h-56 overflow-hidden">
      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <div className="p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">{article.excerpt}</p>
      <Link to={article.href} className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 transition-colors">
        Читать статью <ChevronRightIcon className="w-4 h-4" />
      </Link>
    </div>
  </div>
);

const NewsSection: React.FC = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-16 gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">База знаний</h2>
                  <p className="text-lg text-slate-600">Актуальные статьи о методах испытаний, нормативах и новостях индустрии.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ARTICLES.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                ))}
            </div>
        </div>
    </section>
);

const CTASection: React.FC = () => (
  <section className="pb-24 pt-12 bg-white">
    <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-[2rem] shadow-2xl overflow-hidden relative p-12 md:p-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Готовы к точному анализу?</h2>
            <p className="text-lg md:text-xl text-blue-100 mb-12 leading-relaxed">
              Оставьте заявку на бесплатную консультацию. Наши эксперты помогут определить необходимый объем испытаний для вашего проекта.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contacts"
                className="w-full sm:w-auto bg-white text-blue-900 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 shadow-xl"
              >
                Отправить запрос
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-blue-900 transition-all duration-300"
              >
                Каталог услуг
              </Link>
            </div>
          </div>
        </div>
    </div>
  </section>
);

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <BenefitsSection />
      <PopularServices />
      <TestimonialsSection />
      <NewsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
