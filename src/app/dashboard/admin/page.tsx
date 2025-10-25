'use client';

import { useState } from 'react';
import { Users, Package, ShoppingCart, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { CardHeader } from '../../../components/ui/Card';
import { Card, CardContent } from '../../../components/ui/Card';
import { Layout } from '../../../components/layout/Layout';
import { ChatWidget } from '../../../components/chat/ChatWidget';

export default function AdminDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const stats = [
    { label: 'Total Users', value: 1250, icon: Users, color: 'text-blue-600' },
    { label: 'Total Products', value: 450, icon: Package, color: 'text-emerald-600' },
    { label: 'Total Orders', value: 3200, icon: ShoppingCart, color: 'text-purple-600' },
    { label: 'Revenue', value: '$125K', icon: TrendingUp, color: 'text-green-600' },
  ];

  return (
    <>
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Monitor and manage the platform</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 bg-slate-100 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8">
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
              </CardContent>
            </Card>
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

