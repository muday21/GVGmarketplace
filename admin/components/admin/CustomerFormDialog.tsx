"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

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
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customer: Customer | null;
};

const STATUSES = ['active', 'inactive'];

export function CustomerFormDialog({ isOpen, onClose, onSuccess, customer }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    status: 'active',
    total_orders: '0',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (customer) {
      setFormData({
        email: customer.email,
        full_name: customer.full_name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        status: customer.status,
        total_orders: customer.total_orders.toString(),
      });
    } else {
      setFormData({
        email: '',
        full_name: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        status: 'active',
        total_orders: '0',
      });
    }
    setError('');
  }, [customer, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const customerData = {
      email: formData.email,
      full_name: formData.full_name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      status: formData.status,
      total_orders: parseInt(formData.total_orders),
      updated_at: new Date().toISOString(),
    };

    let result;
    if (customer) {
      result = await supabase
        .from('customers')
        .update(customerData)
        .eq('id', customer.id);
    } else {
      result = await supabase
        .from('customers')
        .insert([customerData]);
    }

    if (result.error) {
      setError(result.error.message);
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{customer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1-555-0123"
              />
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="total_orders">Total Orders</Label>
              <Input
                id="total_orders"
                type="number"
                value={formData.total_orders}
                onChange={(e) => setFormData({ ...formData, total_orders: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
              {loading ? 'Saving...' : customer ? 'Update Customer' : 'Create Customer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
