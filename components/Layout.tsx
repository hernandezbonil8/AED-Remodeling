import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Instagram, Facebook, ArrowLeft, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, setLanguage } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const handleBack = () => setLanguage(null);

  const isActive = (path: string) => location.pathname === path ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary';

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handleBack}
                className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
                title="Back to Language Selection"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
                <div className="p-2 bg-primary rounded-lg shadow-lg group-hover:bg-blue-800 transition-all duration-300">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 tracking-tight leading-none group-hover:text-primary transition-colors">AED</span>
                  <span className="text-sm text-gray-500 uppercase tracking-widest leading-none">Remodeling LLC</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-200 ${isActive('/')}`}>{t('nav_home')}</Link>
              <Link to="/services" className={`transition-colors duration-200 ${isActive('/services')}`}>{t('nav_services')}</Link>
              <Link to="/gallery" className={`transition-colors duration-200 ${isActive('/gallery')}`}>{t('nav_gallery')}</Link>
              <Link to="/contact" className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-all shadow-md hover:shadow-lg">
                {t('nav_quote')}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-primary rounded-md focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
            <div className="flex flex-col space-y-2 p-4">
              <Link to="/" className={`px-4 py-2 rounded-md ${isActive('/')}`} onClick={closeMenu}>{t('nav_home')}</Link>
              <Link to="/services" className={`px-4 py-2 rounded-md ${isActive('/services')}`} onClick={closeMenu}>{t('nav_services')}</Link>
              <Link to="/gallery" className={`px-4 py-2 rounded-md ${isActive('/gallery')}`} onClick={closeMenu}>{t('nav_gallery')}</Link>
              <Link to="/contact" className="px-4 py-2 text-primary font-bold" onClick={closeMenu}>{t('nav_quote')}</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="w-5 h-5 text-accent" />
                <span className="text-lg font-bold">AED Remodeling LLC</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('footer_desc')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-200">{t('footer_contact')}</h3>
              <div className="space-y-3">
                <a href="tel:+15551234567" className="flex items-center text-slate-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mr-2" /> (555) 123-4567
                </a>
                <a href="mailto:aedremodeling@gmail.com" className="flex items-center text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mr-2" /> aedremodeling@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-200">Socials</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-accent transition-colors"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="text-slate-400 hover:text-accent transition-colors"><Facebook className="w-5 h-5"/></a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} AED Remodeling LLC. {t('footer_rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
