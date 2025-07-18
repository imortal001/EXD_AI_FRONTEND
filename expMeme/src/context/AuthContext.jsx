import React, { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/cookieUtils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    setAuthenticated(isAuthenticated());
  }, []);

  const updateAuthStatus = (status) => {
    setAuthenticated(status);
  };

  const value = {
    authenticated,
    updateAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 