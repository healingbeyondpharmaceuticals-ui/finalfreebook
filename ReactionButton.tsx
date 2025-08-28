import React from 'react';
import { Button } from './ui/button';

interface ReactionButtonProps {
  emoji: string;
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}

export const ReactionButton: React.FC<ReactionButtonProps> = ({
  emoji,
  label,
  count,
  isActive,
  onClick,
  color = 'text-gray-600'
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`flex items-center gap-1 transition-all duration-200 hover:scale-110 ${
        isActive ? `${color} bg-blue-50 scale-105` : 'text-gray-600 hover:text-blue-600'
      }`}
    >
      <span className="text-lg">{emoji}</span>
      <span className="text-xs font-medium">{count > 0 && count}</span>
      <span className="sr-only">{label}</span>
    </Button>
  );
};

export const ReactionBar: React.FC<{
  reactions: Record<string, number>;
  userReactions: Record<string, boolean>;
  onReaction: (type: string) => void;
}> = ({ reactions, userReactions, onReaction }) => {
  const reactionTypes = [
    { type: 'like', emoji: '👍', label: 'Like', color: 'text-blue-600' },
    { type: 'dislike', emoji: '👎', label: 'Dislike', color: 'text-red-600' },
    { type: 'laugh', emoji: '😂', label: 'Laugh', color: 'text-yellow-600' },
    { type: 'wow', emoji: '😮', label: 'Wow', color: 'text-blue-500' },
    { type: 'love', emoji: '🤍', label: 'Love', color: 'text-pink-600' },
    { type: 'sick', emoji: '🤮', label: 'Sick', color: 'text-green-600' },
  ];

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {reactionTypes.map(({ type, emoji, label, color }) => (
        <ReactionButton
          key={type}
          emoji={emoji}
          label={label}
          count={reactions[type] || 0}
          isActive={userReactions[type] || false}
          onClick={() => onReaction(type)}
          color={color}
        />
      ))}
    </div>
  );
};