import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './components/HomePage.tsx';
import ServicesPage from './components/ServicesPage.tsx';
import ContactPage from './components/ContactPage.tsx';
import PlaceholderPage from './components/PlaceholderPage.tsx';
import Calculator from './components/Calculator.tsx';
import GostPage from './components/GostPage.tsx';
import AboutPage from './components/AboutPage.tsx';
import AuthModal from './components/AuthModal.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AccountPage from './components/account/AccountPage.tsx';
import RadiologyArticlePage from './components/RadiologyArticlePage.tsx';
import { useAuth } from './hooks/useAuth.ts';
import AdminPage from './components/admin/AdminPage.tsx';
import UserDocumentsPage from './components/admin/UserDocumentsPage.tsx';

const AdminRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
    const { user } = useAuth();
    if (!user || user.role !== 'admin') {
        return <Navigate to="/online/account" replace />;
    }
    return element;
};

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

              <Route path="/services/calculator" element={<ProtectedRoute element={<div className="container mx-auto py-16 px-4"><Calculator /></div>} />} />
              <Route path="/services/:category" element={<ServicesPage />} />
              <Route path="/services" element={<ServicesPage />} />
              
              <Route path="/knowledge/gosts" element={<GostPage />} />
              <Route path="/knowledge/articles/radiology-control" element={<RadiologyArticlePage />} />
              <Route path="/knowledge" element={<GostPage />} />
              <Route path="/knowledge/*" element={<PlaceholderPage title="База знаний" />} />
              
              {/* Protected Routes */}
              <Route path="/online/account/*" element={<ProtectedRoute element={<AccountPage />} />} />
              <Route path="/online/order" element={<ProtectedRoute element={<PlaceholderPage title="Онлайн-заказ" />} />} />
              <Route path="/online/tracking" element={<ProtectedRoute element={<PlaceholderPage title="Трекинг заказов" />} />} />
              <Route path="/online/documents" element={<ProtectedRoute element={<PlaceholderPage title="Документы" />} />} />
              <Route path="/online" element={<ProtectedRoute element={<AccountPage />} />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
              <Route path="/admin/user/:email" element={<AdminRoute element={<UserDocumentsPage />} />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <AuthModal />
      </HashRouter>
  );
};

export default App;