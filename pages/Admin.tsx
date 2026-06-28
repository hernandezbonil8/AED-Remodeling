import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ProjectCategory, Project } from '../types';
import { Plus, Trash2, Calendar, Image, LogOut, CheckCircle, Archive, FileText, Home } from 'lucide-react';
import Estimator from '../components/estimator/Estimator';
import { translateText } from '../services/geminiService';

const Admin = () => {
  const { 
    logout, 
    projects, 
    appointments, 
    addProject, 
    deleteProject, 
    updateAppointmentStatus, 
    t, 
    beforeAfterShowcase, 
    updateBeforeAfterShowcase,
    heroBackgroundImage,
    updateHeroBackgroundImage
  } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'appointments' | 'gallery' | 'estimator'>('appointments');
  const [isTranslatingProject, setIsTranslatingProject] = useState(false);

  // Form State for new project
  const [newProject, setNewProject] = useState({
    title: '',
    category: ProjectCategory.INTERIOR,
    description: '',
    imageUrl: '',
    videoUrl: '',
  });

  // Showcase image form state
  const [showcaseForm, setShowcaseForm] = useState({
    beforeImage: beforeAfterShowcase.beforeImage,
    afterImage: beforeAfterShowcase.afterImage,
    altText_en: beforeAfterShowcase.altText_en,
    altText_es: beforeAfterShowcase.altText_es,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Hero background form state
  const [heroBgInput, setHeroBgInput] = useState(heroBackgroundImage);
  const [saveHeroSuccess, setSaveHeroSuccess] = useState(false);

  const handleUpdateShowcase = (e: React.FormEvent) => {
    e.preventDefault();
    updateBeforeAfterShowcase(showcaseForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleUpdateHeroBg = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroBackgroundImage(heroBgInput);
    setSaveHeroSuccess(true);
    setTimeout(() => setSaveHeroSuccess(false), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTranslatingProject(true);
    try {
      const description_es = await translateText(newProject.description, 'es');
      
      const projectToAdd: Omit<Project, 'id' | 'dateAdded'> = {
        title: newProject.title,
        category: newProject.category,
        description_en: newProject.description,
        description_es: description_es,
        imageUrl: newProject.imageUrl || `https://picsum.photos/800/600?random=${Date.now()}`,
        videoUrl: newProject.videoUrl || undefined,
      };
      
      addProject(projectToAdd);
      setNewProject({ title: '', category: ProjectCategory.INTERIOR, description: '', imageUrl: '', videoUrl: '' });
    } finally {
      setIsTranslatingProject(false);
    }
  };

  const handleStatusUpdate = (id: string, status: 'confirmed' | 'archived') => {
      updateAppointmentStatus(id, status);
  }

  const sortedAppointments = [...appointments].sort((a, b) => b.submittedAt - a.submittedAt);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Nav */}
      <nav className="bg-slate-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="font-bold text-xl">{t('admin_dashboard')}</div>
            <div className="flex items-center space-x-6">
                <button onClick={() => navigate('/')} className="flex items-center text-sm text-slate-300 hover:text-white">
                    <Home className="w-4 h-4 mr-2" /> {t('nav_home')}
                </button>
                <button onClick={handleLogout} className="flex items-center text-sm text-slate-300 hover:text-white">
                    <LogOut className="w-4 h-4 mr-2" /> {t('logout')}
                </button>
            </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            <button 
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'appointments' ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-gray-50'}`}
            >
                <Calendar className="w-5 h-5 mr-2" /> {t('tab_appointments')} <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs">{appointments.filter(a => a.status === 'pending').length} {t('new')}</span>
            </button>
            <button 
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'gallery' ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-gray-50'}`}
            >
                <Image className="w-5 h-5 mr-2" /> {t('tab_gallery')}
            </button>
            <button 
                onClick={() => setActiveTab('estimator')}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === 'estimator' ? 'bg-[#C9A84C] text-slate-900 shadow-lg font-bold' : 'bg-white text-slate-600 hover:bg-gray-50'}`}
            >
                <FileText className="w-5 h-5 mr-2" /> Estimator
            </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[500px] p-6">
            
            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('appt_requests')}</h2>
                    {sortedAppointments.length === 0 ? (
                        <p className="text-slate-500 text-center py-10">{t('no_requests')}</p>
                    ) : (
                        <div className="space-y-4">
                            {sortedAppointments.map((apt) => (
                                <div key={apt.id} className={`p-6 rounded-lg border ${apt.status === 'pending' ? 'border-accent/50 bg-yellow-50/50' : 'border-gray-100 bg-gray-50'} transition-all`}>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                                    apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                    apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                    {apt.status}
                                                </span>
                                                <span className="text-sm text-slate-500">Submitted: {new Date(apt.submittedAt).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 mt-1">{apt.customerName}</h3>
                                        </div>
                                        
                                        <div className="flex space-x-2 mt-4 md:mt-0">
                                            {apt.status === 'pending' && (
                                                <button onClick={() => handleStatusUpdate(apt.id, 'confirmed')} className="flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                                    <CheckCircle className="w-4 h-4 mr-1" /> {t('btn_confirm')}
                                                </button>
                                            )}
                                            {apt.status !== 'archived' && (
                                                <button onClick={() => handleStatusUpdate(apt.id, 'archived')} className="flex items-center px-3 py-1.5 bg-gray-200 text-slate-700 text-sm rounded hover:bg-gray-300">
                                                    <Archive className="w-4 h-4 mr-1" /> {t('btn_archive')}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 mt-4 pt-4 border-t border-gray-200">
                                        <div>
                                            <p><strong className="text-slate-800">Email:</strong> {apt.email}</p>
                                            <p><strong className="text-slate-800">Phone:</strong> {apt.phone}</p>
                                        </div>
                                        <div>
                                            <p><strong className="text-slate-800">Preferred Date:</strong> {apt.preferredDate || 'Not specified'}</p>
                                            <p><strong className="text-slate-800">Budget:</strong> {apt.budgetRange}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p><strong className="text-slate-800">Description:</strong> {apt.projectDescription}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
                <div>
                     <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('manage_portfolio')}</h2>

                     {/* Hero Banner Background Configuration */}
                     <div className="bg-white p-6 rounded-lg mb-8 border-2 border-accent/30 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center">
                          <Image className="w-5 h-5 mr-2 text-primary" />
                          Edit Home Hero Background Image
                        </h3>
                        <form onSubmit={handleUpdateHeroBg} className="space-y-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Hero Background Image URL</label>
                              <div className="flex flex-col sm:flex-row gap-3">
                                <input 
                                    type="text" 
                                    placeholder="Enter image URL (e.g. Unsplash, Imgur or direct link)" 
                                    className="flex-grow px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                                    value={heroBgInput}
                                    onChange={(e) => setHeroBgInput(e.target.value)}
                                    required
                                />
                                <button type="submit" className="bg-[#C9A84C] text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow whitespace-nowrap">
                                    Update Background
                                </button>
                              </div>
                            </div>
                        </form>
                        {saveHeroSuccess && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 font-semibold flex items-center animate-fade-in">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-600" /> Hero background image updated successfully! View the home page to see it live.
                          </div>
                        )}
                     </div>

                     {/* Before & After Slider Configuration */}
                     <div className="bg-white p-6 rounded-lg mb-8 border-2 border-accent/30 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center">
                          <Image className="w-5 h-5 mr-2 text-primary" />
                          Edit Before & After Showcase Slider
                        </h3>
                        <form onSubmit={handleUpdateShowcase} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Before Image URL</label>
                              <input 
                                  type="text" 
                                  placeholder="Before Image URL (e.g. Unsplash, Imgur or direct link)" 
                                  className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                                  value={showcaseForm.beforeImage}
                                  onChange={(e) => setShowcaseForm({...showcaseForm, beforeImage: e.target.value})}
                                  required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">After Image URL</label>
                              <input 
                                  type="text" 
                                  placeholder="After Image URL (e.g. Unsplash, Imgur or direct link)" 
                                  className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                                  value={showcaseForm.afterImage}
                                  onChange={(e) => setShowcaseForm({...showcaseForm, afterImage: e.target.value})}
                                  required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Alt Text (English)</label>
                              <input 
                                  type="text" 
                                  placeholder="Alt Text (English)" 
                                  className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                                  value={showcaseForm.altText_en}
                                  onChange={(e) => setShowcaseForm({...showcaseForm, altText_en: e.target.value})}
                                  required
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Alt Text (Spanish)</label>
                              <input 
                                  type="text" 
                                  placeholder="Alt Text (Spanish)" 
                                  className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                                  value={showcaseForm.altText_es}
                                  onChange={(e) => setShowcaseForm({...showcaseForm, altText_es: e.target.value})}
                                  required
                              />
                            </div>
                            <button type="submit" className="md:col-span-2 bg-[#C9A84C] text-slate-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow">
                                Save Showcase Slider Images
                            </button>
                        </form>
                        {saveSuccess && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 font-semibold flex items-center animate-fade-in">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-600" /> Showcase slider updated successfully! View the home page to see it live.
                          </div>
                        )}
                     </div>
                     
                     {/* Add New Project Form */}
                     <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center"><Plus className="w-5 h-5 mr-2"/> {t('add_project')}</h3>
                        <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="Project Title" 
                                className="px-4 py-2 rounded border border-gray-300"
                                value={newProject.title}
                                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                                required
                            />
                            <select 
                                className="px-4 py-2 rounded border border-gray-300"
                                value={newProject.category}
                                onChange={(e) => setNewProject({...newProject, category: e.target.value as ProjectCategory})}
                            >
                                {Object.values(ProjectCategory).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input 
                                type="text" 
                                placeholder="Image URL (Leave empty for random placeholder)" 
                                className="px-4 py-2 rounded border border-gray-300"
                                value={newProject.imageUrl}
                                onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                            />
                            <input 
                                type="url" 
                                placeholder="Video URL (Optional, e.g., Cloudflare R2 link)" 
                                className="px-4 py-2 rounded border border-gray-300"
                                value={newProject.videoUrl}
                                onChange={(e) => setNewProject({...newProject, videoUrl: e.target.value})}
                            />
                            <div className="md:col-span-2">
                                <textarea 
                                    placeholder="Description" 
                                    className="w-full px-4 py-2 rounded border border-gray-300"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                    required
                                />
                            </div>
                            <button type="submit" disabled={isTranslatingProject} className="md:col-span-2 bg-primary text-white py-2 rounded font-bold hover:bg-blue-800 disabled:bg-gray-400">
                                {isTranslatingProject ? 'Translating & Saving...' : t('upload_project')}
                            </button>
                        </form>
                     </div>

                     {/* Project List */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {projects.map((p) => (
                            <div key={p.id} className="group relative border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md">
                                <img src={p.imageUrl} alt={p.title} className="w-full h-48 object-cover"/>
                                <button 
                                    onClick={() => deleteProject(p.id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="p-3">
                                    <div className="text-xs font-bold text-accent uppercase">{p.category}</div>
                                    <div className="font-bold text-slate-800 truncate">{p.title}</div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            )}

            {/* Estimator Tab */}
            {activeTab === 'estimator' && (
                <div className="-m-6">
                    <Estimator />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
