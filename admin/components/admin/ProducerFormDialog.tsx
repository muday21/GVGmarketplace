"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

type Producer = {
  id: string;
  email: string;
  company_name: string;
  contact_person: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: string;
  verification_status: string;
  total_products: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  producer: Producer | null;
};

const STATUSES = ['active', 'inactive', 'pending'];
const VERIFICATION_STATUSES = ['verified', 'pending', 'rejected'];

export function ProducerFormDialog({ isOpen, onClose, onSuccess, producer }: Props) {
  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    contact_person: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    status: 'active',
    verification_status: 'pending',
    total_products: '0',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (producer) {
      setFormData({
        email: producer.email,
        company_name: producer.company_name,
        contact_person: producer.contact_person,
        phone: producer.phone,
        address: producer.address,
        city: producer.city,
        country: producer.country,
        status: producer.status,
        verification_status: producer.verification_status,
        total_products: producer.total_products.toString(),
      });
    } else {
      setFormData({
        email: '',
        company_name: '',
        contact_person: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        status: 'active',
        verification_status: 'pending',
        total_products: '0',
      });
    }
    setError('');
  }, [producer, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const producerData = {
      email: formData.email,
      company_name: formData.company_name,
      contact_person: formData.contact_person,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      status: formData.status,
      verification_status: formData.verification_status,
      total_products: parseInt(formData.total_products),
      updated_at: new Date().toISOString(),
    };

    let result;
    if (producer) {
      result = await supabase
        .from('producers')
        .update(producerData)
        .eq('id', producer.id);
    } else {
      result = await supabase
        .from('producers')
        .insert([producerData]);
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
          <DialogTitle>{producer ? 'Edit Producer' : 'Add New Producer'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="contact_person">Contact Person *</Label>
              <Input
                id="contact_person"
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
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
                placeholder="+251-911-234567"
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
              <Label htmlFor="verification_status">Verification Status *</Label>
              <Select
                value={formData.verification_status}
                onValueChange={(value) => setFormData({ ...formData, verification_status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VERIFICATION_STATUSES.map((status) => (
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
              <Label htmlFor="total_products">Total Products</Label>
              <Input
                id="total_products"
                type="number"
                value={formData.total_products}
                onChange={(e) => setFormData({ ...formData, total_products: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
              {loading ? 'Saving...' : producer ? 'Update Producer' : 'Create Producer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
