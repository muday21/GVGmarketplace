'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingCart, Clock, CheckCircle, Heart,
  CreditCard, Gift, MessageCircle,
  TrendingUp, Star, MapPin, RefreshCw, Eye,
  ChevronRight, Award, Truck, Calendar
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Layout } from '../../../components/layout/Layout';
import { ChatWidget } from '../../../components/chat/ChatWidget';

export default function BuyerDashboard() {
  const [userName, setUserName] = useState('Guest');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Guest';
    setUserName(name);
  }, []);



  const recentOrders = [
    { 
      id: 'ORD-2024-001', 
      product: 'Ethiopian Yirgacheffe Coffee', 
      status: 'Delivered', 
      date: '2024-10-20',
      amount: '$45.00',
      image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    { 
      id: 'ORD-2024-002', 
      product: 'Organic Teff Grain', 
      status: 'Shipped', 
      date: '2024-10-22',
      amount: '$32.00',
      image: 'https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    { 
      id: 'ORD-2024-003', 
      product: 'Humera Sesame Seeds', 
      status: 'Processing', 
      date: '2024-10-24',
      amount: '$28.00',
      image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
  ];

  const recommendations = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      price: '$52.00',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Handcrafted Leather Bag',
      price: '$125.00',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'Organic Honey',
      price: '$18.00',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
  ];


  const statusConfig: Record<string, { color: string; icon: any }> = {
    'Delivered': { color: 'success', icon: CheckCircle },
    'Shipped': { color: 'info', icon: Truck },
    'Processing': { color: 'warning', icon: Clock },
  };

      return (
        <>
        <Layout>
          {/* Full-width Welcome Section */}
          <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'url(https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1200)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-white border-opacity-30">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Welcome back, {userName}! 👋</h1>
                    <p className="text-emerald-100 flex items-center mt-1">
                      <Award className="w-4 h-4 mr-1 text-amber-300" />
                      Gold Member • 2,450 Points
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Link href="/cart">
                    <Button variant="outline" size="sm" className="relative bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        2
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Order Management Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">Recent Orders</h2>
                    <Link href="/orders">
                      <Button variant="ghost" size="sm">
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => {
                      const StatusIcon = statusConfig[order.status].icon;
                      return (
                        <div key={order.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                          <img 
                            src={order.image} 
                            alt={order.product} 
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{order.product}</p>
                            <p className="text-sm text-slate-600">Order #{order.id}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={statusConfig[order.status].color as any}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {order.status}
                              </Badge>
                              <span className="text-xs text-slate-500">{order.date}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">{order.amount}</p>
                            <div className="flex space-x-2 mt-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Personalized Recommendations */}
              <Card className="mt-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">You Might Like</h2>
                      <p className="text-sm text-slate-600">Based on your browsing history</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {recommendations.map((product) => (
                      <div key={product.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg mb-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                            <Heart className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-600 font-bold">{product.price}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="text-sm text-slate-600">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Account Overview Widget */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-slate-900">Account Overview</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Gift className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm text-slate-600">Reward Points</p>
                        <p className="font-bold text-slate-900">2,450 pts</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-slate-600">Payment Methods</p>
                        <p className="font-bold text-slate-900">2 Cards</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-slate-600">Saved Addresses</p>
                        <p className="font-bold text-slate-900">3 Locations</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </CardContent>
              </Card>


              {/* Support & Help Center */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-slate-900">Need Help?</h2>
                </CardHeader>
                <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setIsChatOpen(true)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Live Chat
                      </Button>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>

            </div>
          </div>
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

