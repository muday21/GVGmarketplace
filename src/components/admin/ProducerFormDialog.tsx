'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface ProducerFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (producer: any) => void;
  producer?: any;
}

export function ProducerFormDialog({
  isOpen,
  onClose,
  onSubmit,
  producer,
}: ProducerFormDialogProps) {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active',
  });

  useEffect(() => {
    if (producer) {
      setFormData({
        company_name: producer.company_name || '',
        contact_name: producer.contact_name || '',
        email: producer.email || '',
        phone: producer.phone || '',
        address: producer.address || '',
        status: producer.status || 'active',
      });
    } else {
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        address: '',
        status: 'active',
      });
    }
  }, [producer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="shadow-2xl">
          <CardHeader className="sticky top-0 bg-white z-10 border-b">
            <CardTitle className="text-xl">{producer ? 'Edit Producer' : 'Add New Producer'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <Input
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Name</label>
                  <Input
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    placeholder="Enter contact person name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter company address"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  {producer ? 'Update Producer' : 'Add Producer'}
                </Button>
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}