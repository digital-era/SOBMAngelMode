import React, { useState } from 'react';
import { Github, Lock, AlertCircle, CheckCircle, Terminal } from 'lucide-react';
import { UserCredentials } from '../types';

interface LoginProps {
  onLogin: (creds: UserCredentials) => void;
  error?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      onLogin({ username, email });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-bio-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px] top-[-50px] left-[-50px]"></div>
      
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-2xl relative z-10 border-t border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700 shadow-inner">
            <Terminal className="text-neon-green" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Access</h1>
          <p className="text-slate-400 text-sm font-mono mt-2">Classified: Level 5 Clearance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-500 uppercase">Github Username</label>
            <div className="relative">
              <Github className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all font-mono text-sm"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-500 uppercase">Registered Email</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all font-mono text-sm"
                placeholder="name@domain.com"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-rose-500 bg-rose-500/10 p-3 rounded-lg text-xs border border-rose-500/20">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-neon-blue to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
          >
            {isLoading ? (
               <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Authenticate via GitHub</span>
                <CheckCircle size={18} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-[10px] text-slate-600 font-mono">
            SECURE GATEWAY V3.0.1<br/>
            UNAUTHORIZED ACCESS ATTEMPTS ARE LOGGED
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;