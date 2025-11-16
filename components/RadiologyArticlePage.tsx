import React from 'react';
import { Link } from 'react-router-dom';

const SourceLink: React.FC<{ href: string; number: number }> = ({ href, number }) => (
    <sup className="text-blue-600 mx-0.5">
        <a href={href} target="_blank" rel="noopener noreferrer">[{number}]</a>
    </sup>
);

const RadiologyArticlePage: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-blue-600 hover:underline mb-8 inline-block">&larr; Вернуться на главную</Link>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 border-b pb-4">Зачем нужен радиологический контроль материалов?</h1>

            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Введение: происхождение и распространенность радиоактивных элементов</h3>
              <p>
                Радиоактивные элементы изначально сформировались в недрах звезд в результате процессов ядерного синтеза и взрывов сверхновых, а также столкновений нейтронных звезд и белых карликов. В ходе этих грандиозных космических событий тяжелые элементы — такие как уран, торий, плутоний и железо-60 — образуются и попадают на Землю через метеориты и космическую пыль. Значительная часть радиоактивных элементов присутствует на нашей планете с момента ее образования; при этом свежие порции радиоактивных изотопов поступали на Землю и позднее, вследствие новых метеоритных бомбардировок и осаждения вещества из космоса.
                <SourceLink href="https://www.norao.ru/waste/radioactivity/natural/" number={1} />
                <SourceLink href="https://universemagazine.com/ru/kak-radioaktivnye-elementy-popali-na-zemlyu/" number={2} />
                <SourceLink href="https://ria.ru/20180731/1525671892.html" number={3} />
              </p>
              <p>
                Распределенность радиоактивных элементов по земной коре неравномерна: они сконцентрированы в некоторых породах и минералах, особенно в гранитах, фосфатах, тяжелых акцессорных минералах, а также в горных рудах и некоторых строительных материалах. Наиболее распространены такие природные радионуклиды, как калий-40, уран-238 и торий-232, которые встречаются практически во всех породах Земли, но их содержание существенно меняется в зависимости от геологических условий.
                <SourceLink href="https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B4%D0%B8%D0%BE%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9_%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82" number={4} />
                <SourceLink href="https://portal.tpu.ru/SHARED/s/SIARBUZOV/Ucheb_rabota_Magistry/Geohimiya_Rad/Tab/L2.pdf" number={5} />
                <SourceLink href="https://bookonlime.ru/node/760" number={6} />
              </p>
              <p>
                Радиоактивность является неотъемлемой частью природной среды: природный радиационный фон формируется за счет космических лучей, излучения почвы, воды, воздуха и продуктов питания. Однако неконтролируемое повышение содержания радиоактивных веществ способно наносить вред здоровью человека, поскольку излучение вызывает мутации, увеличивает риск развития онкологических заболеваний, нарушает работу внутренних органов и систем.
                <SourceLink href="https://portal.tpu.ru/SHARED/s/SIARBUZOV/Ucheb_rabota_Magistry/Geohimiya_Rad/Tab/L2.pdf" number={5} />
                <SourceLink href="https://ria.ru/20180731/1525671892.html" number={3} />
              </p>
            </section>
            
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Меры по минимизации воздействия радиации</h3>
              <p>
                Для защиты населения и окружающей среды реализуется система радиологического контроля материалов и объектов. Главная цель — выявление, измерение и ограничение дозы излучения, поступающей от природных либо технологических источников. Особое внимание уделяется строительным, отделочным и декоративным материалам, а также металлам, отходам и изделиям критического применения.
                <SourceLink href="https://www.prom-terra.ru/uslugi/ekologicheskie-raboty/radiologicheskiy-kontrol/" number={7} />
                <SourceLink href="https://uralstroylab.ru/stati/radiatsionnyy-kontrol-gotovogo-obekta-promyshlenno/" number={8} />
                <SourceLink href="https://doza.ru/application/radiatsionnyy-kontrol-metallov-stroitelnykh-materialov-syrya-i-pishchevoy-produktsii/" number={9} />
              </p>
              <p>
                В рамках радиологического контроля используются современные приборы: дозиметры, гамма-спектрометры и радиометры, что позволяет выявлять и отслеживать даже незначительные превышения нормативов. Все поступающие на рынок материалы проходят проверку на содержание радионуклидов, а также их соответствие установленным санитарным и строительным нормам.
                <SourceLink href="https://doza.ru/application/radiatsionnyy-kontrol-metallov-stroitelnykh-materialov-syrya-i-pishchevoy-produktsii/" number={9} />
                <SourceLink href="https://www.prom-terra.ru/uslugi/ekologicheskie-raboty/radiologicheskiy-kontrol/" number={7} />
              </p>
              <p>
                Согласно международным и российским стандартам, безопасная для человека мощность дозы внешнего излучения составляет не более 0,5 мкЗв/ч (50 мкР/ч); более оптимальной считается величина до 0,2 мкЗв/ч (20 мкР/ч). Эти уровни гарантируют отсутствие вреда для здоровья при постоянном пребывании в такой среде. В условиях кратковременного присутствия допустимы дозы порядка 10 мкЗв/ч (1 мР/ч), однако превышение нормативов требует немедленных мер для устранения источников опасности.
                <SourceLink href="https://testslab.ru/stati/radiacionnyj-fon-dopustimyj-dlya-cheloveka/" number={10} />
                <SourceLink href="https://www.quarta-rad.ru/useful/vse-o-radiacii/dopustimaya-doza-oblucheniya/" number={11} />
              </p>
            </section>
            
            <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Источники радиационной опасности</h3>
                <p>К числу наиболее значимых источников опасности относятся:</p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                    <li>природные материалы с аномальным содержанием урана, тория и их производных;
                        <SourceLink href="https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B4%D0%B8%D0%BE%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9_%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82" number={4} />
                        <SourceLink href="https://portal.tpu.ru/SHARED/s/SIARBUZOV/Ucheb_rabota_Magistry/Geohimiya_Rad/Tab/L2.pdf" number={5} />
                    </li>
                    <li>радиоактивные отходы и промышленные выбросы, возникающие при переработке сырья, добыче ископаемых, производстве стройматериалов;
                        <SourceLink href="https://uralstroylab.ru/stati/radiatsionnyy-kontrol-gotovogo-obekta-promyshlenno/" number={8} />
                        <SourceLink href="https://doza.ru/application/radiatsionnyy-kontrol-metallov-stroitelnykh-materialov-syrya-i-pishchevoy-produktsii/" number={9} />
                    </li>
                    <li>применение в строительстве или быту изделий, не прошедших радиологический контроль.
                        <SourceLink href="https://www.prom-terra.ru/uslugi/ekologicheskie-raboty/radiologicheskiy-kontrol/" number={7} />
                        <SourceLink href="https://doza.ru/application/radiatsionnyy-kontrol-metallov-stroitelnykh-materialov-syrya-i-pishchevoy-produktsii/" number={9} />
                    </li>
                </ul>
                <p className="mt-4">
                    Нередко опасность представляют старые приборы и изделия с люминофором, медицинское или промышленное оборудование, используемое без должного контроля или утилизации.
                    <SourceLink href="https://polimaster.ru/zachem-nuzhny-sistemy-radiacionnogo-kontrolya/" number={12} />
                    <SourceLink href="https://doza.ru/application/radiatsionnyy-kontrol-metallov-stroitelnykh-materialov-syrya-i-pishchevoy-produktsii/" number={9} />
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Заключение</h3>
                <p>
                  Современный радиологический контроль является необходимым звеном обеспечения безопасности и качества жизни: он предупреждает незаметное поступление избыточного ионизирующего излучения в объекты быта, производства и окружающую среду, тем самым предотвращая долгосрочные негативные последствия для здоровья и биосферы.
                  <SourceLink href="https://www.quarta-rad.ru/useful/vse-o-radiacii/dopustimaya-doza-oblucheniya/" number={11} />
                  <SourceLink href="https://testslab.ru/stati/radiacionnyj-fon-dopustimyj-dlya-cheloveka/" number={10} />
                  <SourceLink href="https://uralstroylab.ru/stati/radiatsionnyy-kontrol-gotovogo-obekta-promyshlenno/" number={8} />
                  <SourceLink href="https://polimaster.ru/zachem-nuzhny-sistemy-radiacionnogo-kontrolya/" number={12} />
                  <SourceLink href="https://www.prom-terra.ru/uslugi/ekologicheskie-raboty/radiologicheskiy-kontrol/" number={7} />
                </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Нормы и влияние на здоровье</h3>
              <p>
                Стандарты строго ограничивают содержание радионуклидов в строительных материалах, чтобы предотвратить вредное влияние ионизирующего излучения на человека.​
              </p>
              
              <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Требования стандартов</h4>
              <p>
                Наиболее распространённый норматив — ГОСТ 30108-94 и СП 2.6.1.758-99 («Нормы радиационной безопасности»), делящий материалы на четыре класса по удельной эффективной активности радионуклидов (Аэфф):
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2 my-4">
                <li><strong>I класс (до 370 Бк/кг):</strong> допускается для строительства любых объектов, включая жилые помещения и детские учреждения.​</li>
                <li><strong>II класс (от 371 до 740 Бк/кг):</strong> применяется в промышленном строительстве и при прокладке дорог в пределах населённых пунктов.​</li>
                <li><strong>III класс (от 741 до 1500 Бк/кг):</strong> разрешён для строительства дорог вне населённых пунктов.​</li>
                <li><strong>IV класс (свыше 1500 Бк/кг):</strong> применение допускается только по специальному разрешению и не допускается для жилья.​</li>
              </ul>
              <p>
                Для изделий внутренней отделки, керамики и сантехники порог чаще составляет 740 Бк/кг.​
              </p>
              
              <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Вред для человека</h4>
              <p>
                Если стройматериалы соответствуют I классу (до 370 Бк/кг), их влияние считается безопасным: они обеспечивают уровень радиационного фона, который не превосходит естественный фон местности более чем на 0,2 мкЗв/ч.​
              </p>
              <p>
                Повышенные уровни радионуклидов могут значительно увеличить индивидуальную дозу облучения — до 60% всей получаемой человеком дозы радиации может приходиться на строительные материалы.​
              </p>
              <p>
                Нарушение норм ведёт к увеличению риска возникновения злокачественных опухолей, мутаций, заболеваний дыхательных путей (например, при выделении радона), а также негативно сказывается на общем состоянии здоровья.​
              </p>
              
              <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Вывод</h4>
              <p>
                Соблюдение стандартов по содержанию радионуклидов в строительных материалах крайне важно для минимизации радиационного воздействия, сохранения здоровья людей и предотвращения экологических и гигиенических проблем в быту и производстве.​
              </p>
            </section>
            
            <footer className="mt-12 border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Источники:</h4>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                    <li><a href="https://www.norao.ru/waste/radioactivity/natural/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">norao.ru</a></li>
                    <li><a href="https://universemagazine.com/ru/kak-radioaktivnye-elementy-popali-na-zemlyu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">universemagazine.com</a></li>
                    <li><a href="https://ria.ru/20180731/1525671892.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ria.ru</a></li>
                    <li><a href="https://ru.wikipedia.org/wiki/%D0%A0%D0%B0%D0%B4%D0%B8%D0%BE%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9_%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">wikipedia.org</a></li>
                    <li><a href="https://portal.tpu.ru/SHARED/s/SIARBUZOV/Ucheb_rabota_Magistry/Geohimiya_Rad/Tab/L2.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">portal.tpu.ru</a></li>
                    <li><a href="https://bookonlime.ru/node/760" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">bookonlime.ru</a></li>
                    <li><a href="https://www.prom-terra.ru/uslugi/ekologicheskie-raboty/radiologicheskiy-kontrol/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">prom-terra.ru</a></li>
                    <li><a href="https://uralstroylab.ru/stati/radiatsionnyy-kontrol-gotovogo-obekta-promyshlenno/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">uralstroylab.ru</a></li>
                    <li><a href="https://doza.ru/application/radiatsionnyy-kontrol-metallov-stroitelnykh-materialov-syrya-i-pishchevoy-produktsii/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">doza.ru</a></li>
                    <li><a href="https://testslab.ru/stati/radiacionnyj-fon-dopustimyj-dlya-cheloveka/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">testslab.ru</a></li>
                    <li><a href="https://www.quarta-rad.ru/useful/vse-o-radiacii/dopustimaya-doza-oblucheniya/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">quarta-rad.ru</a></li>
                    <li><a href="https://polimaster.ru/zachem-nuzhny-sistemy-radiacionnogo-kontrolya/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">polimaster.ru</a></li>
                    <li><a href="https://otvet.mail.ru/question/65391602" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">otvet.mail.ru</a></li>
                    <li><a href="https://postnauka.org/longreads/156012" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">postnauka.org</a></li>
                </ol>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadiologyArticlePage;