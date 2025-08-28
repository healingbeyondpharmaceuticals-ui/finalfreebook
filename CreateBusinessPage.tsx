import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const CreateBusinessPage = ({ onClose }: { onClose: () => void }) => {
  const [pageData, setPageData] = useState({
    name: '',
    category: 'business',
    description: '',
    website: '',
    phone: '',
    address: ''
  });

  const categories = [
    'Local Business', 'Company/Organization', 'Brand/Product',
    'Restaurant/Food', 'Shopping/Retail', 'Health/Medical',
    'Professional Services', 'Entertainment', 'Non-Profit'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating business page:', pageData);
    // Here you would typically send to backend
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Create Business Page</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="mb-4 p-3 bg-blue-900 rounded-lg">
          <p className="text-blue-200 text-sm">
            📢 Business pages are always public and visible to everyone
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Business Name</label>
            <Input
              value={pageData.name}
              onChange={(e) => setPageData({...pageData, name: e.target.value})}
              placeholder="Enter business name"
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <select
              value={pageData.category}
              onChange={(e) => setPageData({...pageData, category: e.target.value})}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <Textarea
              value={pageData.description}
              onChange={(e) => setPageData({...pageData, description: e.target.value})}
              placeholder="Tell people about your business"
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Website</label>
            <Input
              value={pageData.website}
              onChange={(e) => setPageData({...pageData, website: e.target.value})}
              placeholder="https://your-website.com"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
            <Input
              value={pageData.phone}
              onChange={(e) => setPageData({...pageData, phone: e.target.value})}
              placeholder="Business phone number"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
            <Input
              value={pageData.address}
              onChange={(e) => setPageData({...pageData, address: e.target.value})}
              placeholder="Business address"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Page
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { CreateBusinessPage };
export default CreateBusinessPage;