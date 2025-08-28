import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { AppLayout } from '@/components/AppLayout';

export const AuthWrapper: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);

  const toggleMode = () => setIsSignup(!isSignup);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-red-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">🇺🇸 Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onToggleMode={toggleMode} isSignup={isSignup} />;
  }

  return <AppLayout />;
};