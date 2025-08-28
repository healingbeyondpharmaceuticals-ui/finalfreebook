import React, { useState, useEffect, memo } from 'react';
import { Card } from './ui/card';

interface PerformanceMetrics {
  memoryUsage: number;
  renderTime: number;
  activeUsers: number;
  postsLoaded: number;
  cacheHitRate: number;
}

const PerformanceMonitor: React.FC = memo(() => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memoryUsage: 0,
    renderTime: 0,
    activeUsers: 1000000000, // 1 billion users
    postsLoaded: 0,
    cacheHitRate: 98.5
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time metrics
      setMetrics(prev => ({
        memoryUsage: Math.min(100, prev.memoryUsage + Math.random() * 2 - 1),
        renderTime: Math.max(1, 16 + Math.random() * 4 - 2), // Target 60fps
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 1000),
        postsLoaded: prev.postsLoaded + Math.floor(Math.random() * 50),
        cacheHitRate: Math.min(100, Math.max(95, prev.cacheHitRate + Math.random() * 0.2 - 0.1))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors z-50"
      >
        📊 Performance
      </button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-gray-900 border-gray-700 text-white p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-green-400">⚡ System Status</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Memory Usage:</span>
          <span className={metrics.memoryUsage > 80 ? 'text-red-400' : 'text-green-400'}>
            {metrics.memoryUsage.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Render Time:</span>
          <span className={metrics.renderTime > 20 ? 'text-yellow-400' : 'text-green-400'}>
            {metrics.renderTime.toFixed(1)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Active Users:</span>
          <span className="text-blue-400">
            {(metrics.activeUsers / 1000000000).toFixed(2)}B
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Posts Loaded:</span>
          <span className="text-purple-400">
            {metrics.postsLoaded.toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Cache Hit Rate:</span>
          <span className="text-green-400">
            {metrics.cacheHitRate.toFixed(1)}%
          </span>
        </div>
        <div className="mt-3 pt-2 border-t border-gray-700">
          <div className="text-xs text-green-400 font-semibold mb-1">
            🎉 Share & Engage - Get Rewarded!
          </div>
          <div className="text-xs text-blue-400 font-semibold">
            ✨ No Censorship • No Shadow Bans
          </div>
        </div>
      </div>
    </Card>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export { PerformanceMonitor };