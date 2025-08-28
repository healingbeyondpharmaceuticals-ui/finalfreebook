import React, { useState, useCallback, useMemo } from 'react';
import { PostCard } from './PostCard';
import { AdCard } from './AdCard';
import { useVirtualScroll } from '../hooks/useVirtualScroll';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useAuth } from '@/contexts/AuthContext';
interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  image?: string;
  avatar?: string;
  reactions?: Record<string, number>;
  userReactions?: Record<string, boolean>;
  comments?: number;
  shares?: number;
  type?: 'post' | 'ad';
  isSponsored?: boolean;
}

export const VirtualizedNewsFeed: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Jonathan Knows',
      content: '🇺🇸 Welcome to Social Freedom! This platform is built for patriots who value free speech and authentic connections. Join us in building a community of truth!',
      timestamp: '1 hour ago',
      reactions: { like: 124, love: 48 },
      userReactions: {},
      comments: 23,
      shares: 15
    },
    {
      id: '2', 
      author: 'Jo Freedom',
      content: 'Amazing to see this community growing! 🦅 Freedom of speech is not just a right, it\'s a responsibility. Let\'s use it wisely and connect with fellow patriots!',
      timestamp: '3 hours ago',
      reactions: { like: 87, love: 32 },
      userReactions: { like: true },
      comments: 18,
      shares: 9
    }
  ]);
  const handleReaction = useCallback((postId: string, reactionType: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newReactions = { ...post.reactions };
          const newUserReactions = { ...post.userReactions };
          
          // Toggle reaction
          if (newUserReactions[reactionType]) {
            newReactions[reactionType] = (newReactions[reactionType] || 1) - 1;
            delete newUserReactions[reactionType];
          } else {
            newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
            newUserReactions[reactionType] = true;
          }
          
          return {
            ...post,
            reactions: newReactions,
            userReactions: newUserReactions
          };
        }
        return post;
      })
    );
  }, []);

  const handleComment = useCallback((postId: string) => {
    console.log('Comment on post:', postId);
  }, []);

  const handleShare = useCallback((postId: string) => {
    console.log('Share post:', postId);
  }, []);

  const handleReport = useCallback((postId: string) => {
    console.log('Report post:', postId);
  }, []);

  const handleAdvertise = useCallback((postId: string) => {
    console.log('Advertise post:', postId);
    // Here you could open a modal or navigate to advertising setup
  }, []);

  const currentUser = user?.name || 'Guest';
  return (
    <div className="space-y-4 max-h-screen overflow-auto">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
        <h3 className="text-lg font-bold">⚡ High-Performance Feed</h3>
        <p className="text-sm opacity-90">Handling {posts.length.toLocaleString()} posts • Billions supported</p>
      </div>
      
      {posts.map((post, index) => {
        // Insert ads every 3 posts
        const showAd = index > 0 && index % 3 === 0;
        
        return (
          <React.Fragment key={post.id}>
            {post.type === 'ad' || post.isSponsored ? (
              <AdCard
                businessName={post.author}
                title="Sponsored Content"
                description={post.content}
                imageUrl={post.image || ''}
                website="https://example.com"
                cta="Learn More"
                onAdClick={() => console.log('Ad clicked:', post.id)}
              />
            ) : (
              <PostCard
                post={post}
                currentUser={currentUser}
                onReaction={handleReaction}
                onComment={handleComment}
                onShare={handleShare}
                onReport={handleReport}
                onAdvertise={handleAdvertise}
              />
            )}
            
            {showAd && (
              <AdCard
                businessName="Local Business"
                title="Advertise Your Business Here!"
                description="Reach millions of users with our advertising platform. First-time advertisers get 50% off up to $500!"
                imageUrl="https://d64gsuwffb70l.cloudfront.net/68ae94a5eedbe96a21c1eca2_1756272957576_9c4efad2.webp"
                website="/advertise"
                cta="Start Advertising"
                onAdClick={() => console.log('Promotion ad clicked')}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};