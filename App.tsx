import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import PlaceholderPage from './components/PlaceholderPage';
import Calculator from './components/Calculator';
import GostPage from './components/GostPage';
import AboutPage from './components/AboutPage';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';
import AccountPage from './components/account/AccountPage';
import RadiologyArticlePage from './components/RadiologyArticlePage';
import { useAuth } from './hooks/useAuth';
import AdminPage from './components/admin/AdminPage';
import UserDocumentsPage from './components/admin/UserDocumentsPage';

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