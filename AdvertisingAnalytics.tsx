import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Eye, MousePointer, DollarSign, Calendar, Target } from 'lucide-react';

interface AnalyticsData {
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

const mockAnalytics: AnalyticsData[] = [
  { date: '2024-01-01', impressions: 1200, clicks: 45, spend: 12.50, conversions: 3 },
  { date: '2024-01-02', impressions: 1850, clicks: 67, spend: 18.75, conversions: 5 },
  { date: '2024-01-03', impressions: 2100, clicks: 89, spend: 22.30, conversions: 7 },
  { date: '2024-01-04', impressions: 1950, clicks: 72, spend: 19.80, conversions: 4 },
  { date: '2024-01-05', impressions: 2350, clicks: 95, spend: 25.60, conversions: 8 },
  { date: '2024-01-06', impressions: 2800, clicks: 112, spend: 28.90, conversions: 9 },
  { date: '2024-01-07', impressions: 3200, clicks: 134, spend: 32.40, conversions: 12 }
];

const audienceData = [
  { name: '18-24', value: 25, fill: '#3b82f6' },
  { name: '25-34', value: 35, fill: '#10b981' },
  { name: '35-44', value: 20, fill: '#f59e0b' },
  { name: '45-54', value: 15, fill: '#ef4444' },
  { name: '55+', value: 5, fill: '#8b5cf6' }
];

export const AdvertisingAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const totalImpressions = mockAnalytics.reduce((sum, item) => sum + item.impressions, 0);
  const totalClicks = mockAnalytics.reduce((sum, item) => sum + item.clicks, 0);
  const totalSpend = mockAnalytics.reduce((sum, item) => sum + item.spend, 0);
  const totalConversions = mockAnalytics.reduce((sum, item) => sum + item.conversions, 0);
  
  const ctr = ((totalClicks / totalImpressions) * 100).toFixed(2);
  const cpc = (totalSpend / totalClicks).toFixed(2);
  const conversionRate = ((totalConversions / totalClicks) * 100).toFixed(2);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Advertising Analytics</h2>
          <p className="text-gray-600">Track your campaign performance and ROI</p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded text-sm ${
                selectedPeriod === period 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Impressions</p>
                <p className="text-xl font-bold">{totalImpressions.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% vs last period</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MousePointer className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Clicks</p>
                <p className="text-xl font-bold">{totalClicks}</p>
                <p className="text-xs text-green-600">CTR: {ctr}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Spend</p>
                <p className="text-xl font-bold">${totalSpend.toFixed(2)}</p>
                <p className="text-xs text-blue-600">CPC: ${cpc}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-xl font-bold">{totalConversions}</p>
                <p className="text-xs text-green-600">Rate: {conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="impressions" stroke="#3b82f6" name="Impressions" />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" name="Clicks" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="spend" fill="#8b5cf6" name="Daily Spend ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};