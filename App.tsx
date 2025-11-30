import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { UserCredentials } from './types';

// Hardcoded for demo/security as per prompt
const VALID_USER = "digital-era";
const VALID_EMAIL = "digital_era@sina.com";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<string>('');

  // Check session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('app_user');
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (creds: UserCredentials) => {
    if (creds.username === VALID_USER && creds.email === VALID_EMAIL) {
      setIsAuthenticated(true);
      setCurrentUser(creds.username);
      setAuthError(undefined);
      localStorage.setItem('app_user', creds.username);
    } else {
      setAuthError("Access Denied: Invalid credentials for classified document.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    localStorage.removeItem('app_user');
  };

  return (
    <div className="text-slate-200 antialiased selection:bg-neon-blue selection:text-white">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} user={currentUser} />
      ) : (
        <Login onLogin={handleLogin} error={authError} />
      )}
    </div>
  );
};

export default App;