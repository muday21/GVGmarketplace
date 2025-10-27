'use client';

import { useState } from 'react';
import { 
  Plus, Package, Layers, Clock, MessageCircle,
  TrendingUp, DollarSign, Eye, Edit,
  Settings, Bell, Shield, BarChart3, Wallet, Truck,
  MapPin, QrCode, Star, Filter, Search
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { Layout } from '../../../components/layout/Layout';
import { ChatWidget } from '../../../components/chat/ChatWidget';
import { mockProducts, mockBatches, mockOrders, mockSupplyEvents } from '../../../data/mockData';

type TabType = 'overview' | 'products' | 'batches' | 'orders' | 'supply-chain' | 'analytics' | 'tokens' | 'messages' | 'settings';

export default function ProducerDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, message: 'New order received for Ethiopian Yirgacheffe Coffee', time: '2 hours ago', unread: true },
    { id: 2, message: 'Batch YRG-2024-001 approved for blockchain verification', time: '1 day ago', unread: true },
    { id: 3, message: 'KYC documents approved', time: '3 days ago', unread: false },
  ]);

  // Mock data for producer-specific content
  const producerProducts = mockProducts.filter(p => p.producerId === 'producer-1');
  const producerBatches = mockBatches.filter(b => b.productId === '1');
  const producerOrders = mockOrders.filter(o => o.items.some(item => item.productId === '1'));
  
  const stats = [
    { label: 'Total Products', value: producerProducts.length, icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Active Batches', value: producerBatches.length, icon: Layers, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { label: 'Pending Orders', value: producerOrders.filter(o => o.status === 'SHIPPED').length, icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { label: 'Total Revenue', value: '₦45,000', icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Blockchain Verified', value: producerProducts.filter(p => p.verified).length, icon: Shield, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Customer Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'batches', label: 'Batches', icon: Layers },
    { id: 'orders', label: 'Orders', icon: Truck },
    { id: 'supply-chain', label: 'Supply Chain', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'tokens', label: 'Tokens', icon: Wallet },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="primary" className="w-full justify-start" onClick={() => setActiveTab('products')}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Product
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('batches')}>
              <Layers className="w-4 h-4 mr-2" />
              Create New Batch
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('supply-chain')}>
              <MapPin className="w-4 h-4 mr-2" />
              Record Supply Event
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => setIsChatOpen(true)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Live Chat Support
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg ${notification.unread ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-slate-50'}`}>
                  <p className="text-sm text-slate-900">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('orders')}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {producerOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{order.orderNumber}</p>
                  <p className="text-sm text-slate-600">{order.buyerName}</p>
                </div>
                <div className="text-right">
                  <Badge variant={order.status === 'DELIVERED' ? 'success' : order.status === 'SHIPPED' ? 'info' : 'warning'}>
                    {order.status}
                  </Badge>
                  <p className="text-sm text-slate-600 mt-1">{order.totalAmount} {order.currency}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Product Management</h2>
          <p className="text-slate-600">Manage your products and inventory</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {producerProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                      <p className="text-slate-600">{product.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-slate-500">Category: {product.category}</span>
                        <span className="text-sm text-slate-500">Stock: {product.stock}</span>
                        <span className="text-sm text-slate-500">Price: {product.price} {product.currency}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={product.verified ? 'success' : 'warning'}>
                        {product.verified ? 'Verified' : 'Pending'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBatches = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Batch Management</h2>
          <p className="text-slate-600">Track your production batches and blockchain verification</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Batch
        </Button>
      </div>

      <div className="grid gap-4">
        {producerBatches.map((batch) => (
          <Card key={batch.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <QrCode className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{batch.code}</h3>
                    <p className="text-slate-600">{batch.productName}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-slate-500">Quantity: {batch.quantity} {batch.unit}</span>
                      <span className="text-sm text-slate-500">Manufactured: {batch.manufactureDate}</span>
                      <span className="text-sm text-slate-500">Expires: {batch.expiryDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={batch.status === 'ACTIVE' ? 'success' : 'warning'}>
                    {batch.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Order Management</h2>
          <p className="text-slate-600">Process and fulfill customer orders</p>
        </div>
      </div>

      <div className="grid gap-4">
        {producerOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{order.orderNumber}</h3>
                  <p className="text-slate-600">Customer: {order.buyerName}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-slate-500">Total: {order.totalAmount} {order.currency}</span>
                    <span className="text-sm text-slate-500">Items: {order.items.length}</span>
                    <span className="text-sm text-slate-500">Date: {order.createdAt.split('T')[0]}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={order.status === 'DELIVERED' ? 'success' : order.status === 'SHIPPED' ? 'info' : 'warning'}>
                    {order.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Truck className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSupplyChain = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Supply Chain Tracking</h2>
          <p className="text-slate-600">Record and track supply chain events on blockchain</p>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Record Event
        </Button>
      </div>

      <div className="grid gap-4">
        {mockSupplyEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{event.type}</h3>
                  <p className="text-slate-600">{event.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-slate-500">Location: {event.location}</span>
                    <span className="text-sm text-slate-500">Time: {event.timestamp.split('T')[0]}</span>
                    <Badge variant="success">Verified</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Analytics & Reports</h2>
        <p className="text-slate-600">Track your performance and sales metrics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Sales</span>
                <span className="font-semibold">₦45,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Orders Completed</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Average Order Value</span>
                <span className="font-semibold">₦3,750</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {producerProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{product.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold">{product.stock} units</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTokens = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Token Management</h2>
        <p className="text-slate-600">Manage your blockchain tokens and earnings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Token Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">1,250 GVG</p>
              <p className="text-sm text-slate-600 mt-2">Available Tokens</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">This Month</span>
                <span className="font-semibold">₦15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Total Earned</span>
                <span className="font-semibold">₦45,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="primary" className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              Request Payout
            </Button>
            <Button variant="outline" className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              Stake Tokens
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Messages & Notifications</h2>
        <p className="text-slate-600">Communicate with buyers and admins</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium">Admin Support</p>
                <p className="text-xs text-slate-600">Your KYC documents have been approved</p>
                <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium">Customer Inquiry</p>
                <p className="text-xs text-slate-600">Question about product quality</p>
                <p className="text-xs text-slate-500 mt-1">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg ${notification.unread ? 'bg-blue-50' : 'bg-slate-50'}`}>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings & Profile</h2>
        <p className="text-slate-600">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
              <Input value="Sidama Coffee Cooperative" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
              <Input value="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <Input value="producer@example.com" />
            </div>
            <Button variant="primary">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>KYC Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Business License</span>
                <Badge variant="success">Approved</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Farm Certificate</span>
                <Badge variant="success">Approved</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Tax Certificate</span>
                <Badge variant="warning">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'products': return renderProducts();
      case 'batches': return renderBatches();
      case 'orders': return renderOrders();
      case 'supply-chain': return renderSupplyChain();
      case 'analytics': return renderAnalytics();
      case 'tokens': return renderTokens();
      case 'messages': return renderMessages();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Producer Dashboard</h1>
                  <p className="text-slate-600">Welcome back! Manage your products and track your supply chain.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications ({notifications.filter(n => n.unread).length})
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsChatOpen(true)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-8">
              <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </div>
      </Layout>
      
      <ChatWidget 
        showFloatingButton={false}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </>
  );
}