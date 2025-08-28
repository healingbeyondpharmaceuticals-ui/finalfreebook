import React from 'react';
import { PostCard } from './PostCard';
import { AdCard } from './AdCard';
import { sortPostsByAlgorithm, calculateEngagementScore, getUserActivityLevel, type Post } from '../lib/algorithm';

export const NewsFeed: React.FC = () => {
  // Mock user activity data - in real app this would come from backend
  const userActivities = {
    "sarah_activist": {
      userId: "sarah_activist",
      username: "Sarah Chen",
      postsToday: 8,
      likesGiven: 45,
      commentsGiven: 23,
      sharesGiven: 12,
      timeSpentMinutes: 180,
      lastActive: new Date(),
      engagementScore: 0
    },
    "mike_truth": {
      userId: "mike_truth",
      username: "Mike Rodriguez",
      postsToday: 3,
      likesGiven: 15,
      commentsGiven: 8,
      sharesGiven: 4,
      timeSpentMinutes: 90,
      lastActive: new Date(Date.now() - 30 * 60 * 1000),
      engagementScore: 0
    },
    "alex_free": {
      userId: "alex_free",
      username: "Alex Thompson",
      postsToday: 12,
      likesGiven: 67,
      commentsGiven: 34,
      sharesGiven: 18,
      timeSpentMinutes: 240,
      lastActive: new Date(),
      engagementScore: 0
    },
    "jordan_speak": {
      userId: "jordan_speak",
      username: "Jordan Kim",
      postsToday: 1,
      likesGiven: 5,
      commentsGiven: 2,
      sharesGiven: 1,
      timeSpentMinutes: 25,
      lastActive: new Date(Date.now() - 120 * 60 * 1000),
      engagementScore: 0
    }
  };

  // Calculate engagement scores
  Object.values(userActivities).forEach(activity => {
    activity.engagementScore = calculateEngagementScore(activity);
  });

  const rawPosts: Post[] = [
    {
      id: "1",
      userId: "alex_free",
      username: "Alex Thompson",
      content: "🚨 BREAKING: Major tech companies are quietly implementing new content policies. Time to move to platforms that actually respect free speech! Who's with me?",
      likes: 234,
      comments: 67,
      shares: 89,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      userActivity: userActivities.alex_free
    },
    {
      id: "2",
      userId: "sarah_activist",
      username: "Sarah Chen",
      content: "The mainstream media won't cover this story, but independent journalists are exposing the truth. This is exactly why we need uncensored platforms! 🔥",
      likes: 189,
      comments: 45,
      shares: 78,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      userActivity: userActivities.sarah_activist
    },
    {
      id: "3",
      userId: "mike_truth",
      username: "Mike Rodriguez",
      content: "Anyone else notice how certain topics just 'disappear' from trending? 🤔 At least here we can discuss what really matters without fear of being silenced.",
      likes: 156,
      comments: 32,
      shares: 41,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      userActivity: userActivities.mike_truth
    },
    {
      id: "4",
      userId: "alex_free",
      username: "Alex Thompson", 
      content: "UPDATE: The documentary I mentioned yesterday is now available! Link in comments. This is the kind of content that gets buried elsewhere but thrives here! 📺",
      likes: 298,
      comments: 89,
      shares: 156,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      userActivity: userActivities.alex_free
    },
    {
      id: "5",
      userId: "jordan_speak",
      username: "Jordan Kim",
      content: "First time posting here after leaving the other platforms. Feels good to finally speak freely without worrying about algorithms hiding my posts! 👋",
      likes: 67,
      comments: 23,
      shares: 12,
      timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
      userActivity: userActivities.jordan_speak
    }
  ];
  // Apply algorithm to sort posts
  const sortedPosts = sortPostsByAlgorithm(rawPosts);

  // Mock ads data - in real app this would come from backend
  const ads = [
    {
      id: "ad-1",
      businessName: "TechStart Solutions",
      title: "Grow Your Business Online",
      description: "Professional web development services for startups and small businesses",
      imageUrl: "https://d64gsuwffb70l.cloudfront.net/68ae94a5eedbe96a21c1eca2_1756272957576_9c4efad2.webp",
      website: "https://techstart.example.com",
      cta: "Learn More"
    },
    {
      id: "ad-2", 
      businessName: "Local Coffee Roasters",
      title: "Fresh Coffee Delivered Daily",
      description: "Premium artisan coffee beans roasted locally and delivered to your door",
      imageUrl: "https://d64gsuwffb70l.cloudfront.net/68ae94a5eedbe96a21c1eca2_1756272961800_cec25f4a.webp",
      website: "https://coffeeroasters.example.com",
      cta: "Order Now"
    }
  ];

  const handleAdClick = (adId: string) => {
    console.log(`Ad clicked: ${adId}`);
    // In real app, this would track clicks and charge advertiser
  };
  return (
    <div className="space-y-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">🔥 Algorithm Status</h3>
        <p className="text-gray-300 text-sm mb-3">Posts are prioritized by user activity. Active users get more visibility!</p>
        <div className="space-y-2">
          {Object.values(userActivities)
            .sort((a, b) => b.engagementScore - a.engagementScore)
            .map(activity => (
              <div key={activity.userId} className="flex justify-between items-center text-sm">
                <span className="text-white">{activity.username}</span>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">Score: {activity.engagementScore}</span>
                  <span className="text-xs">{getUserActivityLevel(activity.engagementScore)}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      
      {sortedPosts.map((post, index) => (
        <React.Fragment key={post.id}>
          <PostCard
            id={post.id}
            author={{
              name: post.username,
              avatar: `https://d64gsuwffb70l.cloudfront.net/68ae94a5eedbe96a21c1eca2_1756271822201_5e7a8ddf.webp`,
              verified: post.userActivity.engagementScore > 80
            }}
            content={post.content}
            timestamp={post.timestamp.toLocaleString()}
            reactions={{
              likes: post.likes,
              dislikes: Math.floor(post.likes * 0.1),
              userReaction: null
            }}
            isPromoted={index === 0} // First post is promoted for demo
            isOwner={post.userId === 'alex_free'} // Demo: Alex owns posts
          />
          
          {/* Insert ads every 3 posts */}
          {(index + 1) % 3 === 0 && ads[Math.floor((index + 1) / 3) - 1] && (
            <AdCard
              key={ads[Math.floor((index + 1) / 3) - 1].id}
              {...ads[Math.floor((index + 1) / 3) - 1]}
              onAdClick={handleAdClick}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};