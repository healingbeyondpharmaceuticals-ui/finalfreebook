import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, UserPlus, Share2, Facebook, MessageCircle } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
  isSignup: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = isSignup 
        ? await signup(email, password, name)
        : await login(email, password);
        
      if (!success) {
        setError(isSignup ? 'Signup failed' : 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.origin;
    const text = 'Join FreeBook™️ - The uncensored social media platform!';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=Join FreeBook™️&body=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'messenger':
        window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-red-800 to-blue-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-red-200">
        <CardHeader className="text-center bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-t-lg">
          {isSignup && (
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-white mb-2">FreeBook™️</h1>
            </div>
          )}
          {!isSignup && (
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              🇺🇸 Social Freedom
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="relative">
                <UserPlus className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 border-blue-300 focus:border-red-500"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-blue-300 focus:border-red-500"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-blue-300 focus:border-red-500"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : (isSignup ? 'Join Freedom' : 'Login')}
            </Button>
          </form>
          
          {/* FB Button */}
          <div className="mt-4 flex justify-center">
            <div className="relative">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-xl font-bold"
                onClick={() => window.location.reload()}
              >
                FB
              </Button>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold transform -rotate-12 shadow-lg">
                  uncensored
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={onToggleMode}
              className="text-blue-600 hover:text-red-600 text-sm underline"
            >
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </button>
          </div>
          
          {isSignup && (
            <div className="mt-6 border-t pt-4">
              <div className="text-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Now</h3>
                <p className="text-sm text-gray-600">Tell your friends about FreeBook™️</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleShare('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  <Facebook className="w-4 h-4 mr-1" />
                  Facebook
                </Button>
                <Button
                  onClick={() => handleShare('email')}
                  className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button
                  onClick={() => handleShare('sms')}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Text
                </Button>
                <Button
                  onClick={() => handleShare('messenger')}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Messenger
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};