
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import PlaceholderPage from './components/PlaceholderPage';
import Calculator from './components/Calculator';
import GostPage from './components/GostPage';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/about/*" element={<AboutPage />} />
            <Route path="/portfolio" element={<PlaceholderPage title="Портфолио" />} />
            <Route path="/portfolio/*" element={<PlaceholderPage title="Портфолио" />} />

            <Route path="/services/calculator" element={<div className="container mx-auto py-16 px-4"><Calculator /></div>} />
            <Route path="/services/:category" element={<ServicesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            
            <Route path="/knowledge/gosts" element={<GostPage />} />
            <Route path="/knowledge" element={<GostPage />} />
            <Route path="/knowledge/*" element={<GostPage />} />
            
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