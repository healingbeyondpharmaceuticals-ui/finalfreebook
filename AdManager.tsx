import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DollarSign, TrendingUp, Users, Eye, Star, Gift } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  status: 'active' | 'paused' | 'completed';
  isFirstTime?: boolean;
}

export const AdManager: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Coffee Shop Grand Opening', budget: 200, spent: 45.50, impressions: 12500, clicks: 234, status: 'active', isFirstTime: true },
    { id: '2', name: 'Local Bakery Promotion', budget: 150, spent: 89.25, impressions: 8900, clicks: 156, status: 'active' },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    budget: '',
    content: '',
    targetAudience: 'local',
    isFirstTime: false
  });

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.budget) return;
    
    const budget = parseFloat(newCampaign.budget);
    const discountedBudget = newCampaign.isFirstTime ? Math.min(budget * 0.5, budget - 500) : budget;
    
    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      budget: discountedBudget,
      spent: 0,
      impressions: 0,
      clicks: 0,
      status: 'active',
      isFirstTime: newCampaign.isFirstTime
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({ name: '', budget: '', content: '', targetAudience: 'local', isFirstTime: false });
    setShowCreateForm(false);
  };
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Business Advertising</h2>
          <p className="text-gray-600">Promote your small business and reach more customers</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-blue-600 hover:bg-blue-700">
          <Star className="w-4 h-4 mr-2" />
          Create New Campaign
        </Button>
      </div>

      {/* First-Time Advertiser Promotion */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Gift className="w-12 h-12 text-green-600" />
            <div>
              <h3 className="text-xl font-bold text-green-800">🎉 First-Time Advertiser Special!</h3>
              <p className="text-green-700">Get 50% off your first campaign (up to $500 savings)</p>
              <p className="text-sm text-green-600 mt-1">Perfect for small businesses just getting started</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Dashboard */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-bold">${campaigns.reduce((sum, c) => sum + c.spent, 0).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-xl font-bold">{campaigns.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Impressions</p>
                <p className="text-xl font-bold">{campaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-xl font-bold">{campaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Create Campaign Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Advertising Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Campaign Name</Label>
              <Input
                placeholder="e.g., Coffee Shop Grand Opening"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label>Daily Budget ($)</Label>
              <Input
                type="number"
                min="5"
                placeholder="50"
                value={newCampaign.budget}
                onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
              />
            </div>

            <div>
              <Label>Ad Content</Label>
              <Textarea
                placeholder="Tell people about your business..."
                value={newCampaign.content}
                onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="firstTime"
                checked={newCampaign.isFirstTime}
                onChange={(e) => setNewCampaign({...newCampaign, isFirstTime: e.target.checked})}
              />
              <Label htmlFor="firstTime" className="text-green-600 font-medium">
                🎁 I'm a first-time advertiser (50% off up to $500!)
              </Label>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={() => {
                  // Show Stripe payment for campaign creation
                  handleCreateCampaign();
                }} 
                className="flex-1"
                disabled={!newCampaign.name || !newCampaign.budget}
              >
                Pay & Create Campaign
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaign List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Campaigns</h3>
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold">{campaign.name}</h4>
                    {campaign.isFirstTime && (
                      <Badge className="bg-green-100 text-green-800">First-Time Discount Applied</Badge>
                    )}
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm mt-4">
                    <div>
                      <p className="text-gray-600">Daily Budget</p>
                      <p className="font-medium">${campaign.budget}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Spent</p>
                      <p className="font-medium">${campaign.spent.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Impressions</p>
                      <p className="font-medium">{campaign.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Clicks</p>
                      <p className="font-medium">{campaign.clicks}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant={campaign.status === 'active' ? 'destructive' : 'default'}>
                    {campaign.status === 'active' ? 'Pause' : 'Resume'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};