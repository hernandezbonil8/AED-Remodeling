import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Appointment, Language } from '../types';
import { getInitialProjects } from '../constants';
import { TRANSLATIONS } from '../translations';
import { auth, loginWithGoogle, logoutFromFirebase, db } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface AppContextType {
  language: Language | null;
  setLanguage: (lang: Language | null) => void;
  t: (key: string) => string;
  projects: Project[];
  appointments: Appointment[];
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'dateAdded'>) => void;
  deleteProject: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'submittedAt'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
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
    // If we have a language selected initially, load those projects, otherwise load EN default
    // We will actually update projects when language is selected if no saved data exists
    return []; 
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('pp_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      let isUserAdmin = false;
      if (currentUser) {
        try {
          const idTokenResult = await currentUser.getIdTokenResult();
          isUserAdmin = 
            idTokenResult.claims?.role === 'admin' || 
            (Array.isArray(idTokenResult.claims?.roles) && idTokenResult.claims.roles.includes('admin')) || 
            currentUser.email === 'hernandezbonilla90@gmail.com';
            
          if (isUserAdmin) {
            await addDoc(collection(db, 'accessLogs'), {
              uid: currentUser.uid,
              email: currentUser.email,
              timestamp: serverTimestamp(),
              action: 'login'
            });
          } else {
            console.warn('Unauthorized user attempted to log in.');
            await auth.signOut();
            currentUser = null;
          }
        } catch (e) {
          console.error('Failed to verify admin status or write access log', e);
          await auth.signOut();
          currentUser = null;
          isUserAdmin = false;
        }
      }

      setUser(currentUser);
      setIsAuthenticated(!!currentUser && isUserAdmin);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const setLanguage = (lang: Language | null) => {
    setLanguageState(lang);
    if (lang) {
        localStorage.setItem('pp_language', lang);
        
        // If no projects in local storage (or empty), initialize with selected language data
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
    try {
      await loginWithGoogle();
      return true;
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') {
        return false;
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutFromFirebase();
    } catch (error) {
      console.error(error);
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