import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const CreateGroup = ({ onClose }: { onClose: () => void }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    privacy: 'public',
    category: 'general'
  });

  const categories = [
    'General Discussion', 'Politics & News', 'Crypto & Finance', 
    'Technology', 'Entertainment', 'Sports', 'Business', 'Education'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating group:', groupData);
    // Here you would typically send to backend
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Create New Group</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Group Name</label>
            <Input
              value={groupData.name}
              onChange={(e) => setGroupData({...groupData, name: e.target.value})}
              placeholder="Enter group name"
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <Textarea
              value={groupData.description}
              onChange={(e) => setGroupData({...groupData, description: e.target.value})}
              placeholder="What's this group about?"
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Privacy</label>
            <select
              value={groupData.privacy}
              onChange={(e) => setGroupData({...groupData, privacy: e.target.value})}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              <option value="public">🌍 Public - Anyone can see and join</option>
              <option value="private">🔒 Private - Only members can see posts</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select
              value={groupData.category}
              onChange={(e) => setGroupData({...groupData, category: e.target.value})}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Group
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateGroup };
export default CreateGroup;