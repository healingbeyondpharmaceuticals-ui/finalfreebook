import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TrendingUp, Users, Zap, Crown, Target } from 'lucide-react';
import { StripePayment } from './StripePayment';

interface PostAdvertisingOptionsProps {
  onClose: () => void;
  onPurchase: (option: string) => void;
}

const adOptions = [
  {
    id: 'boost',
    name: 'Boost Post',
    price: 5,
    description: 'Increase visibility for 24 hours',
    icon: TrendingUp,
    features: ['2x more views', '24 hour boost', 'Higher feed priority']
  },
  {
    id: 'promote',
    name: 'Promote Post',
    price: 15,
    description: 'Featured placement for 3 days',
    icon: Users,
    features: ['5x more views', '3 day promotion', 'Featured section', 'Mobile push notifications']
  },
  {
    id: 'premium',
    name: 'Premium Spotlight',
    price: 30,
    description: 'Top placement for 1 week',
    icon: Crown,
    features: ['10x more views', '1 week spotlight', 'Top of feed', 'Email newsletter inclusion', 'Analytics dashboard']
  }
];

export const PostAdvertisingOptions: React.FC<PostAdvertisingOptionsProps> = ({
  onClose,
  onPurchase
}) => {
  const [selectedOption, setSelectedOption] = useState<typeof adOptions[0] | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleSelectOption = (option: typeof adOptions[0]) => {
    setSelectedOption(option);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    if (selectedOption) {
      // Store payment information for tracking
      const paymentRecord = {
        paymentIntentId,
        optionId: selectedOption.id,
        amount: selectedOption.price,
        timestamp: new Date().toISOString(),
        type: 'post_promotion'
      };
      
      // In a real app, you'd save this to your database
      localStorage.setItem(`payment_${paymentIntentId}`, JSON.stringify(paymentRecord));
      
      onPurchase(selectedOption.id);
      onClose();
    }
  };

  if (showPayment && selectedOption) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <StripePayment
          amount={selectedOption.price}
          description={selectedOption.name}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowPayment(false)}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Advertise Your Post</h2>
              <p className="text-gray-600">Boost your reach and engagement</p>
            </div>
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </div>

          <div className="space-y-4">
            {adOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card key={option.id} className="border-2 hover:border-blue-300 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{option.name}</h3>
                            <Badge variant="secondary">${option.price}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{option.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {option.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => handleSelectOption(option)}>
                        Select ${option.price}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="font-medium">Why advertise your posts?</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Reach more people in your local community</li>
              <li>• Increase engagement and responses</li>
              <li>• Perfect for business announcements and events</li>
              <li>• All payments processed securely through Stripe</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};