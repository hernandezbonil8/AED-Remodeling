import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [error, setError] = useState('');
  const { login, t } = useApp();
  const navigate = useNavigate();

  const handleNetlifyLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    }
  };

  const handleNetlifySignup = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('signup');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{t('admin_access') || 'Admin Access'}</h2>
          <p className="text-slate-500">Sign in to access the secure dashboard.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleNetlifyLogin}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Log In
          </button>
          
          <button
            onClick={handleNetlifySignup}
            className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Create Account
          </button>
          
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
