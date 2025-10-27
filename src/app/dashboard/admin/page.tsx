"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Package, Users, Building2, UserCircle, TrendingUp, ShoppingBag } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    producers: 0,
    adminUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - you'll replace with MySQL calls later
    setTimeout(() => {
      setStats({
        products: 45,
        customers: 1250,
        producers: 12,
        adminUsers: 3,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      label: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Customers',
      value: stats.customers,
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Total Producers',
      value: stats.producers,
      icon: Building2,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Admin Users',
      value: stats.adminUsers,
      icon: UserCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Welcome to the GVG Admin Portal</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-slate-600">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="/admin/products"
                    className="flex items-center p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Package className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="font-medium text-slate-900">Manage Products</span>
                  </a>
                  <a
                    href="/admin/customers"
                    className="flex items-center p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Users className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="font-medium text-slate-900">Manage Customers</span>
                  </a>
                  <a
                    href="/admin/producers"
                    className="flex items-center p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Building2 className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="font-medium text-slate-900">Manage Producers</span>
                  </a>
                  <a
                    href="/admin/users"
                    className="flex items-center p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <UserCircle className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="font-medium text-slate-900">Manage Admin Users</span>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-emerald-600 mr-3" />
                        <span className="text-sm text-slate-700">Platform Status</span>
                      </div>
                      <span className="text-sm font-medium text-emerald-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <ShoppingBag className="w-5 h-5 text-blue-600 mr-3" />
                        <span className="text-sm text-slate-700">Active Products</span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{stats.products}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}