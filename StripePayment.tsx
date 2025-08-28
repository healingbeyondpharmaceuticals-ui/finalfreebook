import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { createPaymentIntent, confirmPayment, type PaymentIntent } from '../lib/stripe';

interface StripePaymentProps {
  amount: number;
  description: string;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

export const StripePayment: React.FC<StripePaymentProps> = ({
  amount,
  description,
  onSuccess,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  useEffect(() => {
    // Create payment intent when component mounts
    const initializePayment = async () => {
      try {
        const intent = await createPaymentIntent(amount, description);
        setPaymentIntent(intent);
      } catch (err) {
        setError('Failed to initialize payment');
      }
    };
    initializePayment();
  }, [amount, description]);

  const handlePayment = async () => {
    if (!paymentIntent) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const paymentMethod = {
        card: {
          number: cardData.number,
          exp_month: parseInt(cardData.expiry.split('/')[0]),
          exp_year: parseInt(cardData.expiry.split('/')[1]),
          cvc: cardData.cvc
        },
        billing_details: {
          name: cardData.name
        }
      };

      const result = await confirmPayment(paymentIntent.client_secret, paymentMethod);
      
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setPaymentComplete(true);
        setTimeout(() => {
          onSuccess(result.paymentIntent.id);
        }, 1500);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600">Your advertising campaign is now active.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Secure Payment
        </CardTitle>
        <div className="flex justify-between text-sm">
          <span>{description}</span>
          <span className="font-bold">${amount.toFixed(2)}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}
        
        <div>
          <Label>Cardholder Name</Label>
          <Input
            placeholder="John Doe"
            value={cardData.name}
            onChange={(e) => setCardData({...cardData, name: e.target.value})}
          />
        </div>
        
        <div>
          <Label>Card Number</Label>
          <Input
            placeholder="1234 5678 9012 3456"
            value={cardData.number}
            onChange={(e) => setCardData({...cardData, number: e.target.value})}
            maxLength={19}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Expiry Date</Label>
            <Input
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
              maxLength={5}
            />
          </div>
          <div>
            <Label>CVC</Label>
            <Input
              placeholder="123"
              value={cardData.cvc}
              onChange={(e) => setCardData({...cardData, cvc: e.target.value})}
              maxLength={4}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>Secured by Stripe</span>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button
            onClick={handlePayment}
            disabled={isProcessing || !cardData.name || !cardData.number || !paymentIntent}
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};