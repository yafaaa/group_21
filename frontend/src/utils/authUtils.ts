import { UserRole } from '../constants';
import {jwtDecode} from 'jwt-decode';

const TOKEN_KEY = 'authToken';

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const getUserRole = (): UserRole | null => {
  const user = getUserFromToken();
  return user?.role || null;
};

export const hasRequiredRole = (requiredRole?: UserRole): boolean => {
   if (!requiredRole) {
    console.log('[hasRequiredRole] No requiredRole provided → access granted');
    return true;
  }
  const userRole = getRoleFromToken();
  console.log('[hasRequiredRole] Required Role:', requiredRole);
  console.log('[hasRequiredRole] User Role from Token:', userRole);
  
  const hasRole = userRole === requiredRole;
  console.log('[hasRequiredRole] Role Match:', hasRole);

  return hasRole;
};

export const isAdmin = (): boolean => {
  return getUserRole() === UserRole.ADMIN;
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
};

export const getUserFromToken = (): any | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (err) {
    return null;
  }
};

export const getRoleFromToken = (): string | null => {
  const decoded = getUserFromToken();
  if (!decoded || !decoded.role) return null;

  if (Array.isArray(decoded.role)) {
    return decoded.role[0].replace('ROLE_', '');
  }

  return decoded.role.replace('ROLE_', '');
};

export const getTokenExpiration = (): number | null => {
  const decoded = getUserFromToken();
  return decoded?.exp || null;
};