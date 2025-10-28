'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { X } from 'lucide-react';

interface SupplyEvent {
  id: string;
  batchId: string;
  type: 'HARVEST' | 'PROCESSING' | 'PACKAGING' | 'QUALITY_CHECK' | 'SHIPPING' | 'DELIVERY' | 'STORAGE' | 'OTHER';
  description: string;
  location: string;
  timestamp: string;
  notes?: string;
  blockchainHash?: string;
}

interface EventFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Partial<SupplyEvent>) => void;
}

export function EventFormDialog({
  isOpen,
  onClose,
  onSubmit
}: EventFormDialogProps) {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    timestamp: new Date().toISOString().slice(0, 16),
    batchId: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      type: formData.type as 'HARVEST' | 'PROCESSING' | 'PACKAGING' | 'QUALITY_CHECK' | 'SHIPPING' | 'DELIVERY' | 'STORAGE' | 'OTHER',
    };
    onSubmit(submitData);
    // Reset form
    setFormData({
      type: '',
      description: '',
      location: '',
      timestamp: new Date().toISOString().slice(0, 16),
      batchId: '',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-white z-10 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Record Supply Chain Event</CardTitle>
            <Button variant="outline" size="sm" onClick={onClose} className="!bg-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Event Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="HARVEST">Harvest</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="PACKAGING">Packaging</option>
                  <option value="QUALITY_CHECK">Quality Check</option>
                  <option value="SHIPPING">Shipping</option>
                  <option value="DELIVERY">Delivery</option>
                  <option value="STORAGE">Storage</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Batch ID</label>
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select Batch</option>
                  <option value="YRG-2024-001">YRG-2024-001 - Ethiopian Yirgacheffe Coffee</option>
                  <option value="SES-2024-002">SES-2024-002 - Humera Sesame Seeds</option>
                  <option value="LEA-2024-003">LEA-2024-003 - Handcrafted Leather Bag</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what happened during this event..."
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date & Time</label>
                <Input
                  type="datetime-local"
                  value={formData.timestamp}
                  onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any additional information about this event..."
                className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Blockchain Notice */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Blockchain Recording</h3>
              <p className="text-sm text-blue-800">
                This event will be permanently recorded on the blockchain for transparency and traceability.
                Once submitted, it cannot be modified or deleted.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                Record Event on Blockchain
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
