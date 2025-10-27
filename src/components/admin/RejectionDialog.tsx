'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface RejectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  productName: string;
}

export function RejectionDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  productName 
}: RejectionDialogProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onConfirm(reason.trim());
      setReason('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-red-600">Reject Product</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Are you sure you want to reject <strong>"{productName}"</strong>? Please provide a reason for rejection.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rejection Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter the reason for rejection..."
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none"
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={!reason.trim()}
              >
                Reject Product
              </Button>
              <Button 
                type="button" 
                onClick={onClose} 
                variant="outline" 
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
