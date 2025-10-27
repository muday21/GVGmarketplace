"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Edit, Trash2, Users, Mail, Phone, Plus } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import { CustomerFormDialog } from '@/components/admin/CustomerFormDialog';

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  status: string;
  created_at: string;
  total_orders: number;
  total_spent: number;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    // Mock data - replace with real API calls later
    setTimeout(() => {
      setCustomers([
        {
          id: '1',
          name: 'John Anderson',
          email: 'john.anderson@email.com',
          phone: '+1-555-0123',
          address: '123 Main St, New York, NY 10001',
          role: 'BUYER',
          status: 'active',
          created_at: '2024-09-15',
          total_orders: 12,
          total_spent: 500.75,
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane.doe@email.com',
          phone: '+1-555-0456',
          address: '456 Oak Ave, Los Angeles, CA 90001',
          role: 'BUYER',
          status: 'active',
          created_at: '2024-09-20',
          total_orders: 8,
          total_spent: 320.50,
        },
        {
          id: '3',
          name: 'Peter Jones',
          email: 'peter.j@email.com',
          phone: '+1-555-0789',
          address: '789 Pine St, Chicago, IL 60601',
          role: 'PRODUCER', // Example of a producer who is also a customer
          status: 'inactive',
          created_at: '2024-08-01',
          total_orders: 3,
          total_spent: 150.00,
        },
        {
          id: '4',
          name: 'Admin User',
          email: 'admin@example.com',
          phone: '+1-555-1011',
          address: 'Admin Office, Metropolis',
          role: 'ADMIN',
          status: 'active',
          created_at: '2024-01-01',
          total_orders: 0,
          total_spent: 0,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      setIsDeleteOpen(false);
      setSelectedCustomer(null);
    }
  };

  const handleFormSubmit = (customerData: Partial<Customer>) => {
    if (selectedCustomer) {
      // Update existing customer
      setCustomers(customers.map(c =>
        c.id === selectedCustomer.id
          ? { ...c, ...customerData }
          : c
      ));
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: `customer-${Date.now()}`,
        created_at: new Date().toISOString().split('T')[0],
        total_orders: 0,
        total_spent: 0,
        name: customerData.name || '',
        email: customerData.email || '',
        phone: customerData.phone,
        address: customerData.address,
        role: customerData.role || 'BUYER',
        status: customerData.status || 'active',
      };
      setCustomers([...customers, newCustomer]);
    }
    setIsFormOpen(false);
    setSelectedCustomer(null);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'destructive';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Customers Management</h1>
            <p className="text-slate-600">Manage your marketplace customers</p>
          </div>
          <Button onClick={handleAddCustomer}>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
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
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="h-8 w-8 text-slate-500 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-slate-900">{customer.name}</div>
                              <div className="text-xs text-slate-500">{customer.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          <div className="flex items-center mb-1">
                            <Mail className="h-4 w-4 mr-2 text-slate-400" /> {customer.email}
                          </div>
                          {customer.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-slate-400" /> {customer.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          <div className="text-sm text-slate-900">
                            {customer.total_orders} orders
                          </div>
                          <div className="text-xs text-slate-500">
                            ${customer.total_spent.toFixed(2)} spent
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={getStatusColor(customer.status) as "success" | "destructive" | "warning" | "default"}>{customer.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditCustomer(customer)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCustomer(customer)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <CustomerFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          customer={selectedCustomer}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Customer"
          message={`Are you sure you want to delete "${selectedCustomer?.name}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}