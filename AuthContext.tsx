import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isCreator?: boolean;
  friends: string[];
  followers: string[];
  joinedAt: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const FOUNDER_USERS = [
  {
    id: 'jonathan-knows',
    email: 'healingbeyondpharmaceuticals@gmail.com',
    name: 'Jonathan Knows',
    isCreator: true,
    avatar: '👨‍💼',
    friends: ['jo-freedom'],
    followers: [],
    joinedAt: new Date('2024-01-01')
  },
  {
    id: 'jo-freedom', 
    email: 'jonathanbeyondrx@gmail.com',
    name: 'Jo Freedom',
    isCreator: false,
    avatar: '🇺🇸',
    friends: ['jonathan-knows'],
    followers: [],
    joinedAt: new Date('2024-01-01')
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Check founder users
    const founder = FOUNDER_USERS.find(u => u.email === email);
    if (founder) {
      setUser(founder);
      localStorage.setItem('currentUser', JSON.stringify(founder));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Create new user with auto-friend logic
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      avatar: '👤',
      friends: ['jonathan-knows', 'jo-freedom'], // Auto-friend founders
      followers: [],
      joinedAt: new Date()
    };
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};