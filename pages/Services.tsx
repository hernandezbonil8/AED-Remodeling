import React from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../constants';
import { useApp } from '../context/AppContext';
import { PaintRoller, Home, Layers, Briefcase, CheckCircle2, Hammer, Zap, Droplets, HardHat } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'PaintRoller': <PaintRoller className="w-12 h-12" />,
  'Home': <Home className="w-12 h-12" />,
  'Layers': <Layers className="w-12 h-12" />,
  'Briefcase': <Briefcase className="w-12 h-12" />,
  'Hammer': <Hammer className="w-12 h-12" />,
  'Zap': <Zap className="w-12 h-12" />,
  'Droplets': <Droplets className="w-12 h-12" />,
  'HardHat': <HardHat className="w-12 h-12" />
};

const Services = () => {
  const { t, language } = useApp();
  const services = getServices();

  return (
    <div className="animate-fade-in">
       {/* Header */}
       <div className="bg-primary py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('services_page_title')}</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">{t('services_page_subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="space-y-24">
          {services.map((service, index) => (
            <div key={service.id} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="bg-blue-50 w-24 h-24 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm">
                  {iconMap[service.iconName]}
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">{language === 'es' ? service.title_es : service.title_en}</h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {language === 'es' ? service.description_es : service.description_en}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3" />
                    {t('service_point_paint')}
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3" />
                    {t('service_point_prep')}
                  </li>
                  <li className="flex items-center text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3" />
                    {t('service_point_clean')}
                  </li>
                </ul>
                <Link to="/contact" className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold">
                  {t('request_quote')}
                </Link>
              </div>
              <div className="flex-1">
                <div className="relative">
                    <div className="absolute inset-0 bg-accent rounded-lg transform translate-x-4 translate-y-4"></div>
                    <img 
                        src={`https://picsum.photos/600/400?random=${index + 10}`} 
                        alt={language === 'es' ? service.title_es : service.title_en} 
                        className="relative rounded-lg shadow-lg w-full object-cover z-10"
                    />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
