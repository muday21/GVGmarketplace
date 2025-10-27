"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Edit, Trash2, Users, Mail, Phone, MapPin, Plus } from 'lucide-react';
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
          total_spent: 1250.00,
        },
        {
          id: '2',
          name: 'Marie Dubois',
          email: 'marie.dubois@email.com',
          phone: '+33-1-2345-6789',
          address: '45 Rue de la Paix, Paris, France',
          role: 'BUYER',
          status: 'active',
          created_at: '2024-09-20',
          total_orders: 8,
          total_spent: 890.00,
        },
        {
          id: '3',
          name: 'Ahmed Hassan',
          email: 'ahmed.hassan@email.com',
          phone: '+971-50-123-4567',
          address: 'Dubai Mall, Dubai, UAE',
          role: 'BUYER',
          status: 'active',
          created_at: '2024-09-25',
          total_orders: 15,
          total_spent: 2100.00,
        },
        {
          id: '4',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1-555-0456',
          address: '789 Oak Ave, Los Angeles, CA 90210',
          role: 'BUYER',
          status: 'inactive',
          created_at: '2024-08-10',
          total_orders: 3,
          total_spent: 150.00,
        },
        {
          id: '5',
          name: 'Michael Brown',
          email: 'michael.brown@email.com',
          phone: '+44-20-7946-0958',
          address: '10 Downing Street, London, UK',
          role: 'BUYER',
          status: 'active',
          created_at: '2024-10-01',
          total_orders: 6,
          total_spent: 750.00,
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

  const handleFormSubmit = (customerData: any) => {
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
        ...customerData,
        id: `customer-${Date.now()}`,
        created_at: new Date().toISOString().split('T')[0],
        total_orders: 0,
        total_spent: 0,
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'BUYER': return 'info';
      case 'PRODUCER': return 'warning';
      case 'ADMIN': return 'destructive';
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
          <div className="grid gap-6">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {customer.name}
                          </h3>
                          <Badge variant={getStatusColor(customer.status) as any}>
                            {customer.status}
                          </Badge>
                          <Badge variant={getRoleColor(customer.role) as any}>
                            {customer.role}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{customer.email}</span>
                          </div>
                          {customer.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{customer.phone}</span>
                            </div>
                          )}
                          {customer.address && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate">{customer.address}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-6 mt-3 text-sm">
                          <div>
                            <span className="text-slate-500">Orders:</span>
                            <span className="ml-1 font-medium">{customer.total_orders}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Total Spent:</span>
                            <span className="ml-1 font-medium">${customer.total_spent}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Joined:</span>
                            <span className="ml-1 font-medium">{customer.created_at}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredCustomers.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No customers found</h3>
              <p className="text-slate-600">
                {searchQuery ? 'Try adjusting your search criteria' : 'No customers registered yet'}
              </p>
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
