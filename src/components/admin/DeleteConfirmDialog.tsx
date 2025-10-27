'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function DeleteConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-red-600">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex space-x-2">
            <Button 
              onClick={onConfirm} 
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
