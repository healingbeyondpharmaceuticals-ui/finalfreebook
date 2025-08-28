import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface AdCardProps {
  id: string;
  businessName: string;
  title: string;
  description: string;
  imageUrl: string;
  website?: string;
  cta: string;
  onAdClick: (adId: string) => void;
}

export const AdCard: React.FC<AdCardProps> = ({
  id,
  businessName,
  title,
  description,
  imageUrl,
  website,
  cta,
  onAdClick
}) => {
  const handleClick = () => {
    onAdClick(id);
    if (website) {
      window.open(website, '_blank');
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-blue-500 relative overflow-hidden hover:shadow-lg transition-shadow">
      <div className="absolute top-2 right-2">
        <Badge variant="secondary" className="text-xs">
          <TrendingUp className="h-3 w-3 mr-1" />
          Sponsored
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex space-x-4">
          {imageUrl && (
            <div className="flex-shrink-0">
              <img
                src={imageUrl}
                alt={title}
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-semibold text-blue-400 truncate">
                {businessName}
              </h3>
            </div>
            
            <h4 className="text-white font-medium text-sm mb-2 line-clamp-1">
              {title}
            </h4>
            
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">
              {description}
            </p>
            
            <Button
              size="sm"
              onClick={handleClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {cta}
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};