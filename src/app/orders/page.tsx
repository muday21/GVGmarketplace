'use client';

import { Clock, CheckCircle, Truck } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Layout } from '../../components/layout/Layout';

export default function OrderList() {

  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-10-20',
      status: 'DELIVERED',
      total: '$450.00',
      items: 2,
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-10-22',
      status: 'SHIPPED',
      total: '$320.00',
      items: 1,
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-10-24',
      status: 'PROCESSING',
      total: '$180.00',
      items: 3,
    },
  ];

  const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
    DELIVERED: { icon: CheckCircle, color: 'success', label: 'Delivered' },
    SHIPPED: { icon: Truck, color: 'info', label: 'Shipped' },
    PROCESSING: { icon: Clock, color: 'warning', label: 'Processing' },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="bg-emerald-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">My Orders</h1>
            <p className="text-emerald-100 text-lg">Track and manage your orders</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{order.orderNumber}</h3>
                          <Badge variant={statusConfig[order.status].color as any}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[order.status].label}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span>Date: {order.date}</span>
                          <span>Items: {order.items}</span>
                          <span className="font-semibold text-slate-900">{order.total}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

