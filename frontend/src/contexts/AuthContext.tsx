// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuthToken,
  isAuthenticated,
  getUserFromToken,
  setAuthToken,
  removeAuthToken,
  getRoleFromToken
} from '../utils/authUtils';
import { useAuthMe } from '@/hooks/useAuth'; // assuming you renamed it to useQuery style
import { useNavigate } from 'react-router-dom';

import type { UserProfile } from '../types';
import type { UserDTO } from '../types';

type AuthContextType = {
  user: any | null;
  loggedIn: boolean;
  login: (token: string,userFromApi: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDTO | null>(getUserFromToken());
  const [loggedIn, setLoggedIn] = useState<boolean>(isAuthenticated());

  const token = getAuthToken();

  const shouldFetch = token && isAuthenticated();
  const { data, isLoading, isError } = useAuthMe({
    enabled: shouldFetch,
    onError: (err: any) => {
      removeAuthToken();
      setLoggedIn(false);
      setUser(null);
      console.error('Error fetching user:', err.message);
      navigate('/');
    },
  });
  useEffect(() => {
    if (data?.data) {
      setUser(data.data); // AxiosResponse<UserDTO>
      setLoggedIn(true);
    }
  }, [data]);

  const login = (token: string, userFromApi: UserDTO ) => {
    setAuthToken(token);
    setUser(userFromApi);
    setLoggedIn(true);
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};