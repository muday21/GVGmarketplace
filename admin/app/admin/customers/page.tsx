"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Users, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { CustomerFormDialog } from '@/components/admin/CustomerFormDialog';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';

type Customer = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: string;
  total_orders: number;
  created_at: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCustomers(data);
    }
    setLoading(false);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCustomer) return;

    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', selectedCustomer.id);

    if (!error) {
      loadCustomers();
      setIsDeleteOpen(false);
      setSelectedCustomer(null);
    }
  };

  const handleFormSuccess = () => {
    loadCustomers();
    setIsFormOpen(false);
    setSelectedCustomer(null);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Customers</h1>
            <p className="text-slate-600">Manage your customer database</p>
          </div>
          <Button
            onClick={() => {
              setSelectedCustomer(null);
              setIsFormOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search customers by name, email, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-slate-600">Loading customers...</p>
            </div>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No customers found</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first customer</p>
              <Button
                onClick={() => {
                  setSelectedCustomer(null);
                  setIsFormOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">
                        {customer.full_name}
                      </h3>
                      <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(customer)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(customer)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-slate-400" />
                      <span>{customer.email}</span>
                    </div>
                    {customer.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{customer.phone}</span>
                      </div>
                    )}
                    {customer.city && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{customer.city}, {customer.country}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Total Orders</span>
                      <span className="font-semibold text-emerald-600">{customer.total_orders}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <CustomerFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedCustomer(null);
          }}
          onSuccess={handleFormSuccess}
          customer={selectedCustomer}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedCustomer(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Customer"
          description={`Are you sure you want to delete "${selectedCustomer?.full_name}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}
