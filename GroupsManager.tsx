import React, { useState } from 'react';
import { Button } from './ui/button';
import CreateGroup from './CreateGroup';
import CreateBusinessPage from './CreateBusinessPage';

const GroupsManager = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showCreatePage, setShowCreatePage] = useState(false);

  const myGroups = [
    { name: 'Crypto Uncensored', members: 15420, privacy: 'public', role: 'Admin' },
    { name: 'Free Thinkers', members: 8930, privacy: 'private', role: 'Member' },
    { name: 'Truth Seekers', members: 12100, privacy: 'public', role: 'Moderator' }
  ];

  const myPages = [
    { name: 'FreedomTech Solutions', followers: 2340, category: 'Technology' },
    { name: 'Uncensored News Hub', followers: 18200, category: 'Media' }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Groups & Pages</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowCreateGroup(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            + Create Group
          </Button>
          <Button 
            onClick={() => setShowCreatePage(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            + Create Page
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Your Groups</h3>
          <div className="space-y-3">
            {myGroups.map((group, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white">{group.name}</h4>
                  <span className={`px-2 py-1 text-xs rounded ${
                    group.privacy === 'public' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                  }`}>
                    {group.privacy === 'public' ? '🌍 Public' : '🔒 Private'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{group.members.toLocaleString()} members</p>
                <p className="text-blue-400 text-sm">Role: {group.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Your Pages</h3>
          <div className="space-y-3">
            {myPages.map((page, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white">{page.name}</h4>
                  <span className="px-2 py-1 text-xs rounded bg-blue-600 text-white">
                    📢 Public
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{page.followers.toLocaleString()} followers</p>
                <p className="text-green-400 text-sm">Category: {page.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCreateGroup && <CreateGroup onClose={() => setShowCreateGroup(false)} />}
      {showCreatePage && <CreateBusinessPage onClose={() => setShowCreatePage(false)} />}
    </div>
  );
};

export { GroupsManager };
export default GroupsManager;