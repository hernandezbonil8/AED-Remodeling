import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { getServices, BEFORE_AFTER_SHOWCASE } from '../constants';
import { useApp } from '../context/AppContext';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const Home = () => {
  const { projects, t, language } = useApp();
  // Get latest 3 projects
  const featuredProjects = projects.slice(0, 3);
  
  // Get localized constants
  const services = getServices();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2500" 
            alt="Remodeling background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('hero_title_1')} <span className="text-accent">{t('hero_title_highlight')}</span>
          </h1>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-accent text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              {t('hero_cta_quote')}
            </Link>
            <Link 
              to="/gallery" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-all"
            >
              {t('hero_cta_work')}
            </Link>
          </div>
        </div>
      </section>

      {/* About / Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{t('why_choose_us')}</h2>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-xl hover:shadow-xl transition-shadow border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{t('reason_quality')}</h3>
              <p className="text-slate-600">{t('reason_quality_desc')}</p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-xl hover:shadow-xl transition-shadow border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{t('reason_time')}</h3>
              <p className="text-slate-600">{t('reason_time_desc')}</p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-xl hover:shadow-xl transition-shadow border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">{t('reason_rated')}</h3>
              <p className="text-slate-600">{t('reason_rated_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">{t('services_title')}</h2>
              <p className="text-slate-600">{t('services_subtitle')}</p>
            </div>
            <Link to="/services" className="text-primary font-semibold flex items-center hover:underline mt-4 md:mt-0">
              {t('view_all_services')} <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{language === 'es' ? service.title_es : service.title_en}</h3>
                <p className="text-slate-500 text-sm mb-4 flex-grow">{language === 'es' ? service.description_es : service.description_en}</p>
                <Link to={`/gallery?category=${service.title_en}`} className="text-sm text-primary font-medium hover:text-blue-800 mt-auto">{t('view_gallery')}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">{t('featured_projects')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/3] cursor-pointer">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-accent text-sm font-bold uppercase tracking-wider mb-1">{project.category}</span>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium">
              {t('view_gallery')}
            </Link>
          </div>
        </div>
      </section>

      {/* Transformation Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">{t('transformation_title')}</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t('transformation_subtitle')}</p>
          </div>
          <BeforeAfterSlider 
            beforeImage={BEFORE_AFTER_SHOWCASE.beforeImage} 
            afterImage={BEFORE_AFTER_SHOWCASE.afterImage} 
            altText={language === 'es' ? BEFORE_AFTER_SHOWCASE.altText_es : BEFORE_AFTER_SHOWCASE.altText_en} 
            beforeLabel={t('before')} 
            afterLabel={t('after')} 
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('ready_title')}</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            {t('ready_subtitle')}
          </p>
          <Link 
            to="/contact" 
            className="px-8 py-4 bg-accent text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-lg inline-flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" /> {t('schedule_now')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
