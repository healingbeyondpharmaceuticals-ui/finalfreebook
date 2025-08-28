import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuth } from '@/contexts/AuthContext';
interface HeaderProps {
  onAdvertiseClick?: () => void;
}

const Header = ({ onAdvertiseClick }: HeaderProps) => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-blue-800 border-b border-blue-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FB</span>
              </div>
              <h1 className="text-white text-xl font-bold">FreeBook</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search FreeBook..."
                className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {/* Safety Report Button */}
            <Button
              variant="outline"
              size="sm"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              🚨 Report
            </Button>

            {/* Notification Icons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white relative">
                <span className="text-xl">💬</span>
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[16px] h-4">
                  3
                </Badge>
              </Button>
              
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white relative">
                <span className="text-xl">🔔</span>
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[16px] h-4">
                  8
                </Badge>
              </Button>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.avatar || user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-white text-sm hidden md:block">{user?.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Freedom Banner */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 border-b border-blue-500 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-white text-sm">
            <span>🗽</span>
            <span>Welcome to FreeBook - Share your freedom, connect with others, and express yourself!</span>
            <span>✨</span>
          </div>
          <a href="/terms" className="text-white text-sm hover:underline">
            Terms & Conditions
          </a>
        </div>
      </div>
    </header>
  );
};

export { Header };
export default Header;