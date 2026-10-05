import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin account
const defaultAdmin: User = {
  id: 'admin-001',
  name: 'Admin Perpustakaan',
  email: 'admin@perpustakaan.id',
  role: 'admin',
  memberSince: '2024-01-01'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('opac_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check admin account
    if (email === 'admin@perpustakaan.id' && password === 'admin123') {
      setUser(defaultAdmin);
      localStorage.setItem('opac_user', JSON.stringify(defaultAdmin));
      return true;
    }

    // Check registered users
    const users = JSON.parse(localStorage.getItem('opac_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const userData: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: 'member',
        memberSince: found.memberSince
      };
      setUser(userData);
      localStorage.setItem('opac_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('opac_users') || '[]');
    
    // Check if email already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: `U${Date.now()}`,
      name,
      email,
      password,
      memberSince: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    localStorage.setItem('opac_users', JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: 'member',
      memberSince: newUser.memberSince
    };
    setUser(userData);
    localStorage.setItem('opac_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('opac_user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
