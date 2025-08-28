import React from 'react';
import { TrendingUp, Users, Clock } from 'lucide-react';

export const RightPanel: React.FC = () => {
  const trendingTopics = [
    { topic: "#FreeSpeechFirst", posts: "12.4K posts", trend: "+45%" },
    { topic: "#UncensoredTruth", posts: "8.9K posts", trend: "+32%" },
    { topic: "#MediaBias", posts: "6.7K posts", trend: "+28%" },
    { topic: "#IndependentNews", posts: "5.2K posts", trend: "+19%" },
    { topic: "#AlgorithmTransparency", posts: "4.1K posts", trend: "+67%" }
  ];

  const activeUsers = [
    { name: "Alex Thompson", status: "🔥 Power User", score: 267, online: true },
    { name: "Sarah Chen", status: "⭐ Active User", score: 234, online: true },
    { name: "Mike Rodriguez", status: "👍 Regular User", score: 89, online: false },
    { name: "Jordan Kim", status: "👋 New User", score: 23, online: true },
    { name: "Riley Foster", status: "⭐ Active User", score: 156, online: true }
  ];
  return (
    <div className="w-80 bg-gray-900 h-screen overflow-y-auto border-l border-gray-700">
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">Algorithm Boost</h3>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg mb-4">
            <h4 className="text-white font-semibold mb-2">🚀 Get More Visibility!</h4>
            <p className="text-blue-100 text-sm mb-3">Active users get priority in feeds. Engage more to boost your content!</p>
            <div className="text-xs text-blue-200">
              • Post daily: +10 points<br/>
              • Like posts: +1 point each<br/>
              • Comment: +3 points each<br/>
              • Share content: +5 points each
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-400" />
            <h3 className="text-white font-semibold">Trending Topics</h3>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-blue-400 font-medium">{topic.topic}</div>
                    <div className="text-gray-400 text-sm">{topic.posts}</div>
                  </div>
                  <span className="text-green-400 text-xs font-semibold">{topic.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-green-400" />
            <h3 className="text-white font-semibold">Top Active Users</h3>
          </div>
          <div className="space-y-3">
            {activeUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    {user.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.status}</div>
                  </div>
                </div>
                <div className="text-blue-400 text-sm font-semibold">{user.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};