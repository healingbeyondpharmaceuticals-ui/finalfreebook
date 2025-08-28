import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  created: number;
}

interface WebhookHandlerProps {
  onPaymentSuccess?: (paymentId: string, amount: number) => void;
  onPaymentFailed?: (paymentId: string, error: string) => void;
}

export const WebhookHandler: React.FC<WebhookHandlerProps> = ({
  onPaymentSuccess,
  onPaymentFailed
}) => {
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Start listening for webhook events
    const startWebhookListener = async () => {
      setIsListening(true);
      
      // In a real implementation, this would connect to your webhook endpoint
      // For now, we'll simulate webhook events
      const simulateWebhooks = () => {
        const eventTypes = [
          'payment_intent.succeeded',
          'payment_intent.payment_failed',
          'invoice.payment_succeeded',
          'customer.subscription.created'
        ];
        
        const randomEvent: WebhookEvent = {
          id: `evt_${Math.random().toString(36).substr(2, 9)}`,
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          data: {
            object: {
              id: `pi_${Math.random().toString(36).substr(2, 9)}`,
              amount: Math.floor(Math.random() * 10000) + 500,
              currency: 'usd',
              status: Math.random() > 0.1 ? 'succeeded' : 'failed'
            }
          },
          created: Date.now()
        };
        
        setWebhookEvents(prev => [randomEvent, ...prev.slice(0, 9)]);
        handleWebhookEvent(randomEvent);
      };
      
      // Simulate webhook events every 30 seconds
      const interval = setInterval(simulateWebhooks, 30000);
      
      return () => {
        clearInterval(interval);
        setIsListening(false);
      };
    };
    
    const cleanup = startWebhookListener();
    return () => cleanup.then(fn => fn?.());
  }, []);

  const handleWebhookEvent = (event: WebhookEvent) => {
    switch (event.type) {
      case 'payment_intent.succeeded':
        if (onPaymentSuccess) {
          onPaymentSuccess(event.data.object.id, event.data.object.amount / 100);
        }
        break;
        
      case 'payment_intent.payment_failed':
        if (onPaymentFailed) {
          onPaymentFailed(event.data.object.id, 'Payment failed');
        }
        break;
        
      default:
        console.log('Unhandled webhook event:', event.type);
    }
  };

  // This component is typically invisible - it just handles webhook events
  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm font-medium">Webhook Status</span>
      </div>
      <p className="text-xs text-gray-600 mb-2">
        {isListening ? 'Listening for payment events' : 'Not connected'}
      </p>
      {webhookEvents.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium">Recent Events:</p>
          {webhookEvents.slice(0, 3).map(event => (
            <div key={event.id} className="text-xs text-gray-500">
              {event.type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};