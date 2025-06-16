import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in production, this would call your API
      const mockUsers = [
        {
          id: 'admin-1',
          email: 'admin@kkwagh.edu.in',
          name: 'Administrator',
          role: 'admin' as const,
          createdAt: new Date(),
        },
        {
          id: 'student-1',
          email: 'student@kkwagh.edu.in',
          name: 'John Doe',
          role: 'student' as const,
          studentId: 'KKW2024001',
          department: 'Computer Engineering',
          year: 3,
          phone: '+91 9876543210',
          createdAt: new Date(),
        },
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password') {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    try {
      // Mock registration - in production, this would call your API
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email!,
        name: userData.name!,
        role: 'student',
        studentId: userData.studentId,
        department: userData.department,
        year: userData.year,
        phone: userData.phone,
        createdAt: new Date(),
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};