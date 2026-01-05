// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supabase) return;
    supabase?.auth
      ?.getSession()
      ?.then(({ data }) => setUser(data.session?.user || null));

    const { subscription } = supabase?.auth?.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAppContext must be used within AuthProvider');
  return context;
};
