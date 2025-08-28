import React, { useState } from 'react';
import { PostAdvertisingOptions } from './PostAdvertisingOptions';

const CreatePost = () => {
  const [postText, setPostText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showAdvertising, setShowAdvertising] = useState(false);

  const handlePost = () => {
    if (!postText.trim()) return;
    
    // Show advertising options after posting
    setShowAdvertising(true);
    setShowOptions(false);
    setPostText('');
  };

  const handleAdvertisingPurchase = (option: string) => {
    console.log('Purchased advertising option:', option);
    // Handle the advertising purchase
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
        <div className="flex items-start space-x-4">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/68ae94a5eedbe96a21c1eca2_1756271822201_5e7a8ddf.webp"
            alt="Your avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's on your mind? Share anything - no censorship here!"
              className="w-full bg-gray-700 text-white rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
              onFocus={() => setShowOptions(true)}
            />
            
            {showOptions && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span>Photo</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    <span>Video</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>Poll</span>
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => {setShowOptions(false); setPostText('');}}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={!postText.trim()}
                    onClick={handlePost}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAdvertising && (
        <PostAdvertisingOptions
          onClose={() => setShowAdvertising(false)}
          onPurchase={handleAdvertisingPurchase}
        />
      )}
    </>
  );
};

export { CreatePost };
export default CreatePost;