import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Appointment, Language, BeforeAfterShowcase, ServiceData } from '../types';
import { getInitialProjects, BEFORE_AFTER_SHOWCASE, SERVICES_DATA } from '../constants';
import { TRANSLATIONS } from '../translations';

interface AppContextType {
  language: Language | null;
  setLanguage: (lang: Language | null) => void;
  t: (key: string) => string;
  projects: Project[];
  appointments: Appointment[];
  isAuthenticated: boolean;
  user: any | null;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'dateAdded'>) => void;
  deleteProject: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'submittedAt'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  isAuthReady: boolean;
  authError: string | null;
  beforeAfterShowcase: BeforeAfterShowcase;
  updateBeforeAfterShowcase: (showcase: Partial<BeforeAfterShowcase>) => void;
  heroBackgroundImage: string;
  updateHeroBackgroundImage: (url: string) => void;
  services: ServiceData[];
  addService: (service: Omit<ServiceData, 'id'>) => void;
  updateService: (service: ServiceData) => void;
  deleteService: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language | null>(() => {
    const saved = localStorage.getItem('pp_language');
    return saved === 'en' || saved === 'es' ? saved : null;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('pp_projects');
    if (saved) return JSON.parse(saved);
    return []; 
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('pp_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [beforeAfterShowcase, setBeforeAfterShowcase] = useState<BeforeAfterShowcase>(() => {
    const saved = localStorage.getItem('pp_before_after_showcase');
    return saved ? JSON.parse(saved) : BEFORE_AFTER_SHOWCASE;
  });

  const [heroBackgroundImage, setHeroBackgroundImage] = useState<string>(() => {
    const saved = localStorage.getItem('pp_hero_background_image');
    return saved || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=2500';
  });

  const [services, setServices] = useState<ServiceData[]>(() => {
    const saved = localStorage.getItem('pp_services');
    return saved ? JSON.parse(saved) : SERVICES_DATA;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<any | null>({ email: 'admin@aedremodeling.com', app_metadata: { roles: ['admin'] } });
  const [isAuthReady] = useState(true);
  const [authError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Temporary God Mode bypass active. Netlify Identity paused.');
  }, []);

  const setLanguage = (lang: Language | null) => {
    setLanguageState(lang);
    if (lang) {
        localStorage.setItem('pp_language', lang);
        const savedProjects = localStorage.getItem('pp_projects');
        if (!savedProjects || JSON.parse(savedProjects).length === 0) {
            setProjects(getInitialProjects());
        }
    } else {
        localStorage.removeItem('pp_language');
    }
  };

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('pp_projects', JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('pp_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('pp_services', JSON.stringify(services));
  }, [services]);

  const t = (key: string): string => {
    if (!language) return key;
    return TRANSLATIONS[language][key] || key;
  };

  const login = async () => {
    console.log('Login triggered in God Mode');
    setIsAuthenticated(true);
    setUser({ email: 'admin@aedremodeling.com', app_metadata: { roles: ['admin'] } });
    return true;
  };

  const logout = async () => {
    console.log('Logout triggered in God Mode');
    setIsAuthenticated(false);
    setUser(null);
  };

  const addProject = (projectData: Omit<Project, 'id' | 'dateAdded'>) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      dateAdded: Date.now(),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addAppointment = (apptData: Omit<Appointment, 'id' | 'status' | 'submittedAt'>) => {
    const newAppt: Appointment = {
      ...apptData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      submittedAt: Date.now(),
    };
    setAppointments(prev => [newAppt, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const updateBeforeAfterShowcase = (showcase: Partial<BeforeAfterShowcase>) => {
    setBeforeAfterShowcase(prev => {
      const updated = { ...prev, ...showcase };
      localStorage.setItem('pp_before_after_showcase', JSON.stringify(updated));
      return updated;
    });
  };

  const updateHeroBackgroundImage = (url: string) => {
    setHeroBackgroundImage(url);
    localStorage.setItem('pp_hero_background_image', url);
  };

  const addService = (serviceData: Omit<ServiceData, 'id'>) => {
    const newService: ServiceData = {
      ...serviceData,
      id: 's-' + Math.random().toString(36).substr(2, 9)
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (updatedService: ServiceData) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      projects,
      appointments,
      isAuthenticated,
      user,
      login,
      logout,
      addProject,
      deleteProject,
      addAppointment,
      updateAppointmentStatus,
      isAuthReady,
      authError,
      beforeAfterShowcase,
      updateBeforeAfterShowcase,
      heroBackgroundImage,
      updateHeroBackgroundImage,
      services,
      addService,
      updateService,
      deleteService
    }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};