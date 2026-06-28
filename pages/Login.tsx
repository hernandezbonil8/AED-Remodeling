import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const { isAuthenticated, isAuthReady, authError, t } = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthReady && isAuthenticated) {
      navigate('/secure-portal-99x/dashboard');
    }
  }, [isAuthenticated, isAuthReady, navigate]);

  const openWidget = (view: 'login' | 'signup') => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open(view);
    } else {
      setError(
        'Auth service failed to load. Check that the Netlify Identity script is in index.html.'
      );
    }
  };

  if (authError) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-950 border border-red-500 rounded-xl p-6 text-red-200">
          <h2 className="text-xl font-bold mb-2 text-red-400">Auth SDK Error</h2>
          <p className="font-mono text-sm">{authError}</p>
        </div>
      </div>
    );
  }

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {t('admin_access') || 'Admin Access'}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Sign in with your administrator account.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => openWidget('login')}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Log In
          </button>

          <button
            onClick={() => openWidget('signup')}
            className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Create Account
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center pt-1">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
