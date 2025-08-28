import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { MessageCard } from './MessageCard';
import { ReportingSystem } from './ReportingSystem';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

export const MessagingSystem: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showReporting, setShowReporting] = useState(false);
  const [reportingMessageId, setReportingMessageId] = useState<string | null>(null);

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participantName: 'Sarah Johnson',
      participantAvatar: '👩‍💼',
      lastMessage: 'Thanks for sharing that article!',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
      unreadCount: 2,
      messages: [
        {
          id: 'm1',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          content: 'Hey! How are you doing?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isRead: true
        },
        {
          id: 'm2',
          senderId: 'current',
          senderName: 'You',
          content: 'I\'m doing great! Just shared an interesting article about tech trends.',
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          isRead: true
        },
        {
          id: 'm3',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          content: 'Thanks for sharing that article!',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          isRead: false
        }
      ]
    },
    {
      id: '2',
      participantName: 'Mike Chen',
      participantAvatar: '👨‍💻',
      lastMessage: 'Let\'s discuss the project tomorrow',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0,
      messages: []
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeConversation) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleReportMessage = (messageId: string) => {
    setReportingMessageId(messageId);
    setShowReporting(true);
  };

  const activeConv = conversations.find(c => c.id === activeConversation);

  return (
    <div className="flex h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-white font-semibold">Messages</h2>
          <div className="mt-2 relative">
            <Input
              placeholder="Search conversations..."
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv.id)}
              className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 ${
                activeConversation === conv.id ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{conv.participantAvatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-white font-medium truncate">{conv.participantName}</p>
                    {conv.unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm truncate">{conv.lastMessage}</p>
                  <p className="text-gray-500 text-xs">
                    {conv.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{activeConv.participantAvatar}</div>
                  <div>
                    <h3 className="text-white font-medium">{activeConv.participantName}</h3>
                    <p className="text-gray-400 text-sm">Active now</p>
                  </div>
                </div>
                
                {/* Safety Notice */}
                <div className="text-right">
                  <div className="text-xs text-yellow-400 mb-1">🛡️ Safety First</div>
                  <div className="text-xs text-gray-400">Report suspicious content</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConv.messages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onReport={() => handleReportMessage(message.id)}
                />
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 border-gray-600 text-white resize-none"
                  rows={2}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} className="self-end">
                  Send
                </Button>
              </div>
              
              {/* Safety Reminder */}
              <div className="mt-2 text-xs text-gray-400 flex items-center space-x-2">
                <span>🚨</span>
                <span>Never share personal information. Report suspicious behavior immediately.</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
              <p>Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Reporting Modal */}
      {showReporting && (
        <ReportingSystem
          messageId={reportingMessageId}
          onClose={() => {
            setShowReporting(false);
            setReportingMessageId(null);
          }}
        />
      )}
    </div>
  );
};