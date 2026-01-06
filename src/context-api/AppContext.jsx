import React, { createContext, useContext, useEffect, useState } from 'react';
// local storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// supabase database
import { supabase } from '../api/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const savedToken = await AsyncStorage.getItem('TOKEN');
      setToken(savedToken);
      setLoading(false);
    };
    fetchToken();
  }, []);

  const login = async newToken => {
    await AsyncStorage.setItem('TOKEN', newToken);
    setToken(newToken);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('TOKEN');
    setToken(null);
  };

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
    <AuthContext.Provider
      value={{ token, loading, login, logout, user, setUser }}
    >
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
