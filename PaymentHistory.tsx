import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, Download, Search, Filter, Calendar, DollarSign } from 'lucide-react';

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  type: 'campaign' | 'post_promotion';
  description: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  campaignName?: string;
  discountApplied?: number;
  paymentMethod: string;
  transactionId: string;
}

const mockPayments: PaymentRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    amount: 25.00,
    type: 'campaign',
    description: 'Coffee Shop Grand Opening Campaign',
    status: 'completed',
    campaignName: 'Coffee Shop Grand Opening',
    discountApplied: 25.00,
    paymentMethod: '**** 4242',
    transactionId: 'pi_1234567890'
  },
  {
    id: '2',
    date: '2024-01-14',
    amount: 15.00,
    type: 'post_promotion',
    description: 'Post Promotion - "New Menu Items"',
    status: 'completed',
    paymentMethod: '**** 4242',
    transactionId: 'pi_0987654321'
  },
  {
    id: '3',
    date: '2024-01-12',
    amount: 89.25,
    type: 'campaign',
    description: 'Local Bakery Promotion Campaign',
    status: 'completed',
    campaignName: 'Local Bakery Promotion',
    paymentMethod: '**** 1234',
    transactionId: 'pi_1122334455'
  },
  {
    id: '4',
    date: '2024-01-10',
    amount: 5.00,
    type: 'post_promotion',
    description: 'Post Promotion - "Weekend Special"',
    status: 'pending',
    paymentMethod: '**** 4242',
    transactionId: 'pi_5566778899'
  }
];

export const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalSpent = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalSavings = payments
    .filter(p => p.status === 'completed' && p.discountApplied)
    .reduce((sum, p) => sum + (p.discountApplied || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'campaign' ? '🎯' : '📈';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment History</h2>
          <p className="text-gray-600">Track all your advertising payments and transactions</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-xl font-bold">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-bold">${(totalSpent * 0.6).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-xl font-bold text-green-600">${totalSavings.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2 flex-1 min-w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-none shadow-none"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="campaign">Campaigns</SelectItem>
                <SelectItem value="post_promotion">Post Promotions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payment List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getTypeIcon(payment.type)}</div>
                  <div>
                    <h4 className="font-medium">{payment.description}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{payment.date}</span>
                      <span>•</span>
                      <span>{payment.paymentMethod}</span>
                      <span>•</span>
                      <span className="font-mono text-xs">{payment.transactionId}</span>
                    </div>
                    {payment.discountApplied && (
                      <p className="text-xs text-green-600 mt-1">
                        💰 First-time discount: ${payment.discountApplied.toFixed(2)} saved
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-lg">${payment.amount.toFixed(2)}</p>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
            
            {filteredPayments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No payments found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};