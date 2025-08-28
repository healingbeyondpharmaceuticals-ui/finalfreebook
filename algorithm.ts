// High-performance algorithm for handling billions of users
export interface UserActivity {
  userId: string;
  engagementScore: number;
  lastActive: Date;
  reactionHistory: Record<string, number>;
  contentPreferences: string[];
}

export interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  reactions?: Record<string, number>;
  userReactions?: Record<string, boolean>;
  comments?: number;
  shares?: number;
  engagementScore?: number;
}

// Enhanced engagement calculation with new reaction types
export const calculateEngagementScore = (post: Post): number => {
  const reactions = post.reactions || {};
  const reactionWeights = {
    like: 1,
    dislike: -0.5,
    laugh: 1.5,
    cry: 1.2,
    love: 2,
    sick: -1
  };

  let score = 0;
  Object.entries(reactions).forEach(([type, count]) => {
    const weight = reactionWeights[type as keyof typeof reactionWeights] || 1;
    score += count * weight;
  });

  // Add comment and share bonuses
  score += (post.comments || 0) * 3;
  score += (post.shares || 0) * 5;

  return Math.max(0, score);
};
// Caching system for high-performance operations
const engagementCache = new Map<string, { score: number; timestamp: number }>();
const CACHE_TTL = 60000; // 1 minute

export const calculateUserEngagement = (activity: UserActivity): number => {
  const cacheKey = `user-${activity.userId}`;
  const now = Date.now();
  const cached = engagementCache.get(cacheKey);
  
  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return cached.score;
  }

  // Enhanced scoring with reaction history
  let score = activity.engagementScore;
  
  // Bonus for diverse reactions
  const reactionTypes = Object.keys(activity.reactionHistory).length;
  score += reactionTypes * 2;
  
  // Recency bonus
  const hoursSinceActive = (now - activity.lastActive.getTime()) / (1000 * 60 * 60);
  const recencyBonus = Math.max(0, 10 - hoursSinceActive);
  score += recencyBonus;

  engagementCache.set(cacheKey, { score, timestamp: now });
  return score;
};

// Optimized sorting for billions of posts
export const sortPostsByEngagement = (posts: Post[]): Post[] => {
  return posts
    .map(post => ({
      ...post,
      engagementScore: calculateEngagementScore(post)
    }))
    .sort((a, b) => {
      // Primary: Engagement score
      if (a.engagementScore !== b.engagementScore) {
        return b.engagementScore - a.engagementScore;
      }
      
      // Secondary: Recency
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
};

export const getUserActivityLevel = (score: number): string => {
  if (score >= 100) return "🔥 Power User";
  if (score >= 50) return "⭐ Active User";
  if (score >= 20) return "👍 Regular User";
  return "👋 New User";
};