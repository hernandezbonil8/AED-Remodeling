import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProjectCategory } from '../types';
import { X, ChevronLeft, ChevronRight, ZoomIn, PlayCircle } from 'lucide-react';

const Gallery = () => {
  const { projects, t, language } = useApp();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', ...Object.values(ProjectCategory)];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveFilter(categoryParam);
    }
  }, [location.search]);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('gallery_title')}</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">{t('gallery_subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat 
                  ? 'bg-primary text-white shadow-lg scale-105' 
                  : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'All' ? t('cat_all') : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p>{t('gallery_no_projects')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  {project.videoUrl ? (
                    <video 
                      src={project.videoUrl} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted playsInline loop 
                      onMouseOver={(e) => e.currentTarget.play()} 
                      onMouseOut={(e) => e.currentTarget.pause()}
                      poster={project.imageUrl}
                    />
                  ) : (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {project.videoUrl ? <PlayCircle className="w-12 h-12 text-white" /> : <ZoomIn className="w-10 h-10 text-white" />}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{project.category}</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{language === 'es' ? project.description_es : project.description_en}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in" onClick={closeLightbox}>
          <button 
            className="absolute top-6 right-6 text-white hover:text-accent p-2 z-50"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent p-4 z-50 bg-black/20 hover:bg-black/40 rounded-full transition-colors hidden sm:block"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent p-4 z-50 bg-black/20 hover:bg-black/40 rounded-full transition-colors hidden sm:block"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div 
            className="max-w-6xl max-h-[90vh] w-full px-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} 
          >
            {filteredProjects[lightboxIndex].videoUrl ? (
               <div className="w-full flex justify-center mb-6">
                 <video 
                    src={filteredProjects[lightboxIndex].videoUrl} 
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
                    poster={filteredProjects[lightboxIndex].imageUrl}
                  />
               </div>
            ) : (
              <img 
                src={filteredProjects[lightboxIndex].imageUrl} 
                alt={filteredProjects[lightboxIndex].title} 
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl mb-6"
              />
            )}
            <div className="text-white text-center max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">{filteredProjects[lightboxIndex].title}</h3>
              <p className="text-slate-300">{language === 'es' ? filteredProjects[lightboxIndex].description_es : filteredProjects[lightboxIndex].description_en}</p>
            </div>
            
            {/* Mobile Controls */}
            <div className="flex justify-between w-full mt-4 sm:hidden">
                <button onClick={prevImage} className="p-2 text-white"><ChevronLeft className="w-8 h-8"/></button>
                <button onClick={nextImage} className="p-2 text-white"><ChevronRight className="w-8 h-8"/></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
