'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Plus, Package, Layers, CheckCircle, Clock, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Layout } from '../../../components/layout/Layout';
import { ChatWidget } from '../../../components/chat/ChatWidget';
import { mockProducts, mockBatches } from '../../../data/mockData';

export default function ProducerDashboard() {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const stats = [
    { label: 'Total Products', value: mockProducts.length, icon: Package, color: 'text-blue-600' },
    { label: 'Active Batches', value: mockBatches.length, icon: Layers, color: 'text-emerald-600' },
    { label: 'Pending Orders', value: 3, icon: Clock, color: 'text-amber-600' },
    { label: 'Completed Orders', value: 12, icon: CheckCircle, color: 'text-green-600' },
  ];

  return (
    <>
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('producer.dashboard')}</h1>
            <p className="text-slate-600">Welcome back! Manage your products and track your supply chain.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/products/create">
                  <Button variant="primary" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('producer.createProduct')}
                  </Button>
                </Link>
                <Link href="/batches/create">
                  <Button variant="outline" className="w-full justify-start">
                    <Layers className="w-4 h-4 mr-2" />
                    Create New Batch
                  </Button>
                </Link>
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

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">{t('producer.myProducts')}</h2>
                <Button variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  {t('producer.createProduct')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{product.name}</p>
                      <p className="text-sm text-slate-500">{product.category}</p>
                    </div>
                    <Link href={`/products/${product.slug}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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

