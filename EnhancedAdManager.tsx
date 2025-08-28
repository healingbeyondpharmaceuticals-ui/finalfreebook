import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Target, DollarSign, Clock, Users, Gift } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  objective: 'awareness' | 'traffic' | 'conversions';
  budgetType: 'daily' | 'lifetime';
  budget: number;
  bidStrategy: 'cpm' | 'cpc' | 'cpa';
  targeting: {
    ageMin: number;
    ageMax: number;
    interests: string[];
    location: string;
  };
  schedule: {
    startDate: string;
    endDate?: string;
    timeSlots: string[];
  };
  spent: number;
  impressions: number;
  clicks: number;
  status: 'active' | 'paused' | 'completed';
  isFirstTime?: boolean;
  discountApplied?: number;
}

export const EnhancedAdManager: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    objective: 'awareness' as const,
    budgetType: 'daily' as const,
    budget: '',
    bidStrategy: 'cpm' as const,
    targeting: {
      ageMin: 18,
      ageMax: 65,
      interests: [] as string[],
      location: 'local'
    },
    schedule: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      timeSlots: ['all-day']
    },
    isFirstTime: false
  });

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.budget) return;
    
    const budget = parseFloat(newCampaign.budget);
    let finalBudget = budget;
    let discountApplied = 0;
    
    // Apply Facebook-style first-time discount: 50% off up to $500
    if (newCampaign.isFirstTime) {
      const discount = Math.min(budget * 0.5, 500);
      finalBudget = budget - discount;
      discountApplied = discount;
    }

    // Here we would integrate with Stripe payment
    try {
      // Simulate payment processing with Stripe
      const paymentAmount = finalBudget;
      const description = `${newCampaign.name} - ${newCampaign.objective} campaign`;
      
      // In a real implementation, you would:
      // 1. Create payment intent with Stripe
      // 2. Process payment
      // 3. Only create campaign after successful payment
      
      const campaign: Campaign = {
        id: Date.now().toString(),
        name: newCampaign.name,
        objective: newCampaign.objective,
        budgetType: newCampaign.budgetType,
        budget: finalBudget,
        bidStrategy: newCampaign.bidStrategy,
        targeting: newCampaign.targeting,
        schedule: newCampaign.schedule,
        spent: 0,
        impressions: 0,
        clicks: 0,
        status: 'active',
        isFirstTime: newCampaign.isFirstTime,
        discountApplied
      };

      // Store payment record
      const paymentRecord = {
        campaignId: campaign.id,
        originalAmount: budget,
        finalAmount: finalBudget,
        discountApplied,
        timestamp: new Date().toISOString(),
        type: 'campaign_creation'
      };
      
      localStorage.setItem(`campaign_payment_${campaign.id}`, JSON.stringify(paymentRecord));
      
      setCampaigns([...campaigns, campaign]);
      setShowCreateForm(false);
      
      // Reset form
      setNewCampaign({
        name: '',
        objective: 'awareness',
        budgetType: 'daily',
        budget: '',
        bidStrategy: 'cpm',
        targeting: {
          ageMin: 18,
          ageMax: 65,
          interests: [],
          location: 'local'
        },
        schedule: {
          startDate: new Date().toISOString().split('T')[0],
          endDate: '',
          timeSlots: ['all-day']
        },
        isFirstTime: false
      });
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Facebook-Style Ad Manager</h2>
          <p className="text-gray-600">Create targeted campaigns with advanced options</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          Create Campaign
        </Button>
      </div>

      {/* First-Time Advertiser Promotion */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Gift className="w-12 h-12 text-green-600" />
            <div>
              <h3 className="text-xl font-bold text-green-800">🎉 New Advertiser Special!</h3>
              <p className="text-green-700">Get 50% off your first campaign (up to $500 savings)</p>
              <p className="text-sm text-green-600">Just like Facebook's new advertiser credits</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="objective" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="objective">Objective</TabsTrigger>
                <TabsTrigger value="targeting">Targeting</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>

              <TabsContent value="objective" className="space-y-4">
                <div>
                  <Label>Campaign Name</Label>
                  <Input
                    placeholder="e.g., Coffee Shop Grand Opening"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label>Campaign Objective</Label>
                  <Select value={newCampaign.objective} onValueChange={(value: any) => setNewCampaign({...newCampaign, objective: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">Brand Awareness</SelectItem>
                      <SelectItem value="traffic">Drive Traffic</SelectItem>
                      <SelectItem value="conversions">Get Conversions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="targeting" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Age</Label>
                    <Input
                      type="number"
                      min="18"
                      max="65"
                      value={newCampaign.targeting.ageMin}
                      onChange={(e) => setNewCampaign({
                        ...newCampaign,
                        targeting: {...newCampaign.targeting, ageMin: parseInt(e.target.value)}
                      })}
                    />
                  </div>
                  <div>
                    <Label>Max Age</Label>
                    <Input
                      type="number"
                      min="18"
                      max="65"
                      value={newCampaign.targeting.ageMax}
                      onChange={(e) => setNewCampaign({
                        ...newCampaign,
                        targeting: {...newCampaign.targeting, ageMax: parseInt(e.target.value)}
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Location</Label>
                  <Select value={newCampaign.targeting.location} onValueChange={(value) => setNewCampaign({
                    ...newCampaign,
                    targeting: {...newCampaign.targeting, location: value}
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Area (5 miles)</SelectItem>
                      <SelectItem value="city">City Wide</SelectItem>
                      <SelectItem value="state">State Wide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="budget" className="space-y-4">
                <div>
                  <Label>Budget Type</Label>
                  <Select value={newCampaign.budgetType} onValueChange={(value: any) => setNewCampaign({...newCampaign, budgetType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Budget</SelectItem>
                      <SelectItem value="lifetime">Lifetime Budget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Budget Amount ($)</Label>
                  <Input
                    type="number"
                    min="5"
                    placeholder="50"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Bid Strategy</Label>
                  <Select value={newCampaign.bidStrategy} onValueChange={(value: any) => setNewCampaign({...newCampaign, bidStrategy: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpm">CPM (Cost per 1000 impressions)</SelectItem>
                      <SelectItem value="cpc">CPC (Cost per click)</SelectItem>
                      <SelectItem value="cpa">CPA (Cost per acquisition)</SelectItem>
                    </SelectContent>
                  </Select>
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
              </TabsContent>

              <TabsContent value="review" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold">Campaign Summary</h4>
                  <p><strong>Name:</strong> {newCampaign.name}</p>
                  <p><strong>Objective:</strong> {newCampaign.objective}</p>
                  <p><strong>Budget:</strong> ${newCampaign.budget} ({newCampaign.budgetType})</p>
                  <p><strong>Targeting:</strong> Ages {newCampaign.targeting.ageMin}-{newCampaign.targeting.ageMax}, {newCampaign.targeting.location}</p>
                  {newCampaign.isFirstTime && (
                    <p className="text-green-600"><strong>Discount:</strong> 50% off (up to $500 savings)</p>
                  )}
                </div>
                
                <Button onClick={handleCreateCampaign} className="w-full" disabled={!newCampaign.name || !newCampaign.budget}>
                  Pay & Launch Campaign
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Campaign List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-semibold">{campaign.name}</h4>
                    {campaign.isFirstTime && (
                      <Badge className="bg-green-100 text-green-800">First-Time Discount</Badge>
                    )}
                    <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Budget ({campaign.budgetType})</p>
                      <p className="font-medium">${campaign.budget}</p>
                      {campaign.discountApplied && (
                        <p className="text-green-600 text-xs">Saved: ${campaign.discountApplied}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">Spent</p>
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