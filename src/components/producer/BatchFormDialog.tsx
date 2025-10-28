'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { X } from 'lucide-react';

interface Batch {
  id: string;
  code: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  manufactureDate: string;
  expiryDate: string;
  status: string;
  qrCode: string;
  onChainRef: string;
}

interface BatchFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (batch: Partial<Batch>) => void;
  batch?: Batch | null;
}

export function BatchFormDialog({
  isOpen,
  onClose,
  onSubmit,
  batch
}: BatchFormDialogProps) {
  const [formData, setFormData] = useState({
    code: '',
    productId: '',
    productName: '',
    quantity: '',
    unit: 'kg',
    manufactureDate: '',
    expiryDate: '',
    status: 'ACTIVE',
    qrCode: '',
    onChainRef: '',
    notes: ''
  });

  useEffect(() => {
    if (batch) {
      setFormData({
        code: batch.code || '',
        productId: batch.productId || '',
        productName: batch.productName || '',
        quantity: batch.quantity?.toString() || '',
        unit: batch.unit || 'kg',
        manufactureDate: batch.manufactureDate || '',
        expiryDate: batch.expiryDate || '',
        status: batch.status || 'ACTIVE',
        qrCode: batch.qrCode || '',
        onChainRef: batch.onChainRef || '',
        notes: ''
      });
    } else {
      // Generate a default batch code
      const defaultCode = `BATCH-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      setFormData({
        code: defaultCode,
        productId: '',
        productName: '',
        quantity: '',
        unit: 'kg',
        manufactureDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        status: 'ACTIVE',
        qrCode: '',
        onChainRef: '',
        notes: ''
      });
    }
  }, [batch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      quantity: parseInt(formData.quantity) || 0,
    };
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-white z-10 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {batch ? 'Edit Batch' : 'Create New Batch'}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose} className="!bg-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Batch Code</label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Enter batch code"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Product</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select Product</option>
                  <option value="1">Ethiopian Yirgacheffe Coffee</option>
                  <option value="2">Humera Sesame Seeds</option>
                  <option value="3">Handcrafted Leather Bag</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lbs">Pounds (lbs)</option>
                  <option value="pieces">Pieces</option>
                  <option value="liters">Liters</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <Input
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  placeholder="Product name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Manufacture Date</label>
                <Input
                  type="date"
                  value={formData.manufactureDate}
                  onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                <Input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">QR Code</label>
                <Input
                  value={formData.qrCode}
                  onChange={(e) => setFormData({ ...formData, qrCode: e.target.value })}
                  placeholder="QR code identifier"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Blockchain Reference</label>
              <Input
                value={formData.onChainRef}
                onChange={(e) => setFormData({ ...formData, onChainRef: e.target.value })}
                placeholder="0x..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes about this batch..."
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                {batch ? 'Update Batch' : 'Create Batch'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 !bg-white">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
