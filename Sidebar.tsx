import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CreateGroup } from './CreateGroup';
import { CreateBusinessPage } from './CreateBusinessPage';
import { GroupsManager } from './GroupsManager';
import { MessagingSystem } from './MessagingSystem';
import { AdManager } from './AdManager';

export const Sidebar: React.FC = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const [showGroupsManager, setShowGroupsManager] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [showAdManager, setShowAdManager] = useState(false);
  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '👥', label: 'Friends', count: 12 },
    { icon: '💬', label: 'Messages', count: 3, onClick: () => setShowMessaging(true) },
    { icon: '🔔', label: 'Notifications', count: 8 },
    { icon: '📊', label: 'Groups', onClick: () => setShowGroupsManager(true) },
    { icon: '📄', label: 'Pages', onClick: () => setShowCreatePage(true) },
    { icon: '💰', label: 'Advertise', onClick: () => setShowAdManager(true) },
    { icon: '📅', label: 'Events' },
    { icon: '🎮', label: 'Gaming' },
    { icon: '🛒', label: 'Marketplace' },
    { icon: '📺', label: 'Watch' },
    { icon: '💼', label: 'Jobs' },
  ];

  return (
    <>
      <aside className="w-80 bg-blue-900 border-r border-blue-700 h-screen sticky top-0 overflow-y-auto">
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <h3 className="text-white font-semibold">John Doe</h3>
              <p className="text-gray-400 text-sm">@johndoe</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                     item.active 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                   }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                   {item.count && (
                     <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                       {item.count}
                     </span>
                   )}
                  {item.count && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-700">
          <h4 className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">
            Quick Actions
          </h4>
          <div className="space-y-2">
            <Button
              onClick={() => setShowCreateGroup(true)}
              variant="outline"
              className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <span className="mr-2">➕</span>
              Create Group
            </Button>
            <Button
              onClick={() => setShowCreatePage(true)}
              variant="outline"
              className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <span className="mr-2">📄</span>
              Create Page
            </Button>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="p-4 border-t border-gray-700">
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-3">
              <div className="flex items-start space-x-2">
                <span className="text-yellow-400 text-lg">🛡️</span>
                <div>
                  <h5 className="text-white text-sm font-medium">Stay Safe</h5>
                  <p className="text-gray-400 text-xs mt-1">
                    Report suspicious messages or content. We're committed to fighting human trafficking.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 text-xs border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black"
                  >
                    Safety Center
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Modals */}
      {showCreateGroup && (
        <CreateGroup onClose={() => setShowCreateGroup(false)} />
      )}
      
      {showCreatePage && (
        <CreateBusinessPage onClose={() => setShowCreatePage(false)} />
      )}
      
      {showGroupsManager && (
        <GroupsManager onClose={() => setShowGroupsManager(false)} />
      )}

      {showMessaging && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg w-full max-w-6xl h-[80vh] relative">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                onClick={() => setShowMessaging(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
            <MessagingSystem />
          </div>
        </div>
      )}

      {showAdManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg w-full max-w-7xl h-[90vh] relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                onClick={() => setShowAdManager(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
            <div className="p-6 h-full overflow-y-auto">
              <AdManager />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;