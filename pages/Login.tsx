import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [error, setError] = useState('');
  const { login, t } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const success = await login();
      if (success) {
        navigate('/secure-portal-99x/dashboard');
      } else {
        // If login completes but returns false (not admin), redirect to homepage
        navigate('/');
      }
    } catch {
      setError('Authentication failed. Please try again.');
      // Optionally redirect here too if they are outright rejected
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{t('admin_access')}</h2>
          <p className="text-slate-500">Sign in securely using your Google account to access the dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Sign in with Google
          </button>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
