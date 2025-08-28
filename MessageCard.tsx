import React, { useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface MessageCardProps {
  message: Message;
  onReport: () => void;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, onReport }) => {
  const [showActions, setShowActions] = useState(false);
  const isCurrentUser = message.senderId === 'current';

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isCurrentUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-700 text-white'
      }`}>
        {!isCurrentUser && (
          <div className="text-xs text-gray-300 mb-1">{message.senderName}</div>
        )}
        
        <div className="flex items-start justify-between">
          <p className="text-sm">{message.content}</p>
          
          {showActions && !isCurrentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-6 w-6 p-0 text-gray-400 hover:text-white"
                >
                  ⋯
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 border-gray-600">
                <DropdownMenuItem
                  onClick={onReport}
                  className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                >
                  🚨 Report Message
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  🔇 Mute User
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  🚫 Block User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};