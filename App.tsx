import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Declare netlifyIdentity for TypeScript
declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { Home as HomeIcon } from 'lucide-react';

const LanguageSelector = () => {
  const { setLanguage } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center animate-fade-in">
        <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <HomeIcon className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">AED Remodeling LLC</h1>
        <p className="text-slate-500 mb-8">Please select your preferred language / Por favor seleccione su idioma</p>
        
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => setLanguage('en')}
            className="group relative px-6 py-4 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-primary rounded-xl transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4">🇺🇸</span>
              <div className="text-left">
                <div className="font-bold text-slate-800 group-hover:text-primary">English</div>
                <div className="text-xs text-slate-500">Continue in English</div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-primary group-hover:bg-primary transition-colors"></div>
          </button>

          <button 
            onClick={() => setLanguage('es')}
            className="group relative px-6 py-4 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-primary rounded-xl transition-all duration-300 flex items-center justify-between"
          >
             <div className="flex items-center">
              <span className="text-2xl mr-4">🇲🇽</span>
              <div className="text-left">
                <div className="font-bold text-slate-800 group-hover:text-primary">Español</div>
                <div className="text-xs text-slate-500">Continuar en Español</div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-primary group-hover:bg-primary transition-colors"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { language } = useApp();

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user: any) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '#/secure-portal-99x/dashboard';
          });
        }
      });
      // Initialize netlifyIdentity
      window.netlifyIdentity.init();
    }
  }, []);

  if (!language) {
    return <LanguageSelector />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes wrapped in Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        {/* Admin Routes (Layout handled internally or full screen) */}
        <Route path="/login" element={<NotFound />} />
        <Route path="/admin" element={<NotFound />} />
        <Route path="/secure-portal-99x" element={<Login />} />
        <Route path="/secure-portal-99x/dashboard" element={<Admin />} />
        
        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
