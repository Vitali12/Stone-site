
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import PlaceholderPage from './components/PlaceholderPage';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/calculator" element={<div className="container mx-auto py-16 px-4"><Calculator /></div>} />
            <Route path="/contacts" element={<ContactPage />} />
            
            {/* Placeholder routes */}
            <Route path="/about" element={<PlaceholderPage title="О лаборатории" />} />
            <Route path="/about/*" element={<PlaceholderPage title="О лаборатории" />} />
            <Route path="/services/*" element={<ServicesPage />} />
            <Route path="/knowledge" element={<PlaceholderPage title="База знаний" />} />
            <Route path="/knowledge/*" element={<PlaceholderPage title="База знаний" />} />
            <Route path="/portfolio" element={<PlaceholderPage title="Портфолио" />} />
            <Route path="/portfolio/*" element={<PlaceholderPage title="Портфолио" />} />
            <Route path="/online" element={<PlaceholderPage title="Онлайн-сервисы" />} />
            <Route path="/online/*" element={<PlaceholderPage title="Онлайн-сервисы" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
