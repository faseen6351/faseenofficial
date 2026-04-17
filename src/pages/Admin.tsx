import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, AlertCircle } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const result = await response.json();
      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm';

  if (!isAuthenticated) {
    return (
      <PageWrapper>
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-center w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl mx-auto mb-6">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>
              <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
              <p className="text-white/50 text-sm text-center mb-8">
                Restricted area. Authentication required.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm text-white/60 mb-1.5">Username</label>
                  <input
                    id="username"
                    type="text"
                    required
                    value={loginData.username}
                    onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                    className={inputClass}
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm text-white/60 mb-1.5">Password</label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className={inputClass}
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  <Lock className="w-4 h-4" />
                  {isSubmitting ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/50">Contact submissions and site activity</p>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p className="text-white/50">Dashboard data will appear here once the backend is connected.</p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Admin;
