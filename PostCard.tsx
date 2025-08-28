import React, { useState } from 'react';
import { ReactionButton } from './ReactionButton';
import { PostAdvertisingOptions } from './PostAdvertisingOptions';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp } from 'lucide-react';

interface PostCardProps {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  reactions: {
    likes: number;
    dislikes: number;
    userReaction?: 'like' | 'dislike' | null;
  };
  isPromoted?: boolean;
  isOwner?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  id, 
  author, 
  content, 
  timestamp, 
  reactions,
  isPromoted = false,
  isOwner = false
}) => {
  const [showAdvertising, setShowAdvertising] = useState(false);

  const handleAdvertisingPurchase = (option: string) => {
    console.log(`Purchased ${option} for post ${id}`);
    // Handle advertising purchase
  };

  return (
    <>
      <div className={`bg-gray-800 rounded-lg p-6 mb-4 border ${isPromoted ? 'border-yellow-400 bg-gradient-to-r from-gray-800 to-gray-700' : 'border-gray-700'}`}>
        {isPromoted && (
          <div className="flex items-center gap-2 mb-3 text-yellow-400 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Promoted Post</span>
            <Badge variant="outline" className="border-yellow-400 text-yellow-400">
              Sponsored
            </Badge>
          </div>
        )}
        
        <div className="flex items-start space-x-4">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-white">{author.name}</h3>
              {author.verified && (
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-gray-400 text-sm">{timestamp}</span>
            </div>
            
            <p className="text-gray-300 mb-4 leading-relaxed">{content}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <ReactionButton
                  type="like"
                  count={reactions.likes}
                  isActive={reactions.userReaction === 'like'}
                  onClick={() => console.log('Like clicked')}
                />
                <ReactionButton
                  type="dislike"
                  count={reactions.dislikes}
                  isActive={reactions.userReaction === 'dislike'}
                  onClick={() => console.log('Dislike clicked')}
                />
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Reply</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
              
              {isOwner && !isPromoted && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAdvertising(true)}
                  className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Promote
                </Button>
              )}
            </div>
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