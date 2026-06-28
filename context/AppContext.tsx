import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Appointment, Language } from '../types';
import { getInitialProjects } from '../constants';
import { TRANSLATIONS } from '../translations';

interface AppContextType {
  language: Language | null;
  setLanguage: (lang: Language | null) => void;
  t: (key: string) => string;
  projects: Project[];
  appointments: Appointment[];
  isAuthenticated: boolean;
  user: any | null; // Changed from Firebase User to any to accommodate Netlify User
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'dateAdded'>) => void;
  deleteProject: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'submittedAt'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  isAuthReady: boolean;
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

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Check Netlify Identity status
    const checkAuth = (netlifyUser: any) => {
      if (netlifyUser) {
        // Read roles from app_metadata.roles
        const roles = netlifyUser.app_metadata?.roles || [];
        // Check for lowercase 'admin'
        const isAdmin = roles.some((role: string) => role.toLowerCase() === 'admin');
        
        if (isAdmin) {
          setUser(netlifyUser);
          setIsAuthenticated(true);
        } else {
          console.warn('Unauthorized user attempted to log in.');
          if (window.netlifyIdentity) {
            window.netlifyIdentity.logout();
          }
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsAuthReady(true);
    };

    if (window.netlifyIdentity) {
      // Register event listeners BEFORE initializing
      window.netlifyIdentity.on('init', (user: any) => checkAuth(user));
      window.netlifyIdentity.on('login', (user: any) => {
        checkAuth(user);
        window.netlifyIdentity.close();
      });
      window.netlifyIdentity.on('logout', () => checkAuth(null));
      window.netlifyIdentity.on('error', (err: any) => {
        console.error('Netlify Identity error:', err);
        setIsAuthReady(true);
      });

      // Initialize netlifyIdentity with exact API endpoint
      window.netlifyIdentity.init({
        APIUrl: 'https://aedremodelingllc.netlify.app/.netlify/identity'
      });
      
      // If already initialized and has a currentUser, run checkAuth
      if (window.netlifyIdentity.currentUser()) {
        checkAuth(window.netlifyIdentity.currentUser());
      }

      // Safety fallback: drop the loading screen after 2.5 seconds if Netlify widget doesn't respond
      const safetyTimeout = setTimeout(() => {
        setIsAuthReady((prev) => {
          if (!prev) {
            console.warn('Netlify Identity load safety fallback triggered');
            return true;
          }
          return prev;
        });
      }, 2500);

      return () => clearTimeout(safetyTimeout);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthReady(true);
    }
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

  const t = (key: string): string => {
    if (!language) return key;
    return TRANSLATIONS[language][key] || key;
  };

  const login = async () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    }
    return true;
  };

  const logout = async () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
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
      updateAppointmentStatus
    }}>
      {isAuthReady ? children : <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>}
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