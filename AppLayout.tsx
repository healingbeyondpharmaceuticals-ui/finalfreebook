import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { RightPanel } from './RightPanel';
import { VirtualizedNewsFeed } from './VirtualizedNewsFeed';
import { MessagingSystem } from './MessagingSystem';
import { GroupsManager } from './GroupsManager';
import { CreatePost } from './CreatePost';
import { EnhancedAdManager } from './EnhancedAdManager';
import { AdvertisingAnalytics } from './AdvertisingAnalytics';
import { PaymentHistory } from './PaymentHistory';
import { WebhookHandler } from './WebhookHandler';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent } from './ui/dialog';
export const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showAdManager, setShowAdManager] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return <MessagingSystem />;
      case 'groups':
        return <GroupsManager />;
      case 'create':
        return <CreatePost />;
      default:
        return <VirtualizedNewsFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onAdvertiseClick={() => setShowAdManager(true)} />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onAdvertiseClick={() => setShowAdManager(true)}
        />
        
        <main className="flex-1 max-w-4xl mx-auto">
          {renderContent()}
        </main>
        
        <RightPanel />
      </div>
      {/* Enhanced Ad Manager Modal */}
      <Dialog open={showAdManager} onOpenChange={setShowAdManager}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-auto">
          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
            </TabsList>
            <TabsContent value="campaigns">
              <EnhancedAdManager />
            </TabsContent>
            <TabsContent value="analytics">
              <AdvertisingAnalytics />
            </TabsContent>
            <TabsContent value="payments">
              <PaymentHistory />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Stripe Webhook Handler */}
      <WebhookHandler 
        onPaymentSuccess={(paymentId, amount) => {
          console.log('Payment successful:', paymentId, amount);
          // Handle successful payment
        }}
        onPaymentFailed={(paymentId, error) => {
          console.log('Payment failed:', paymentId, error);
          // Handle failed payment
        }}
      />
    </div>
  );
};

export default AppLayout;