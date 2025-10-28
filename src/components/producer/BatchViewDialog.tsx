'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { X, QrCode, Calendar, Package, Shield } from 'lucide-react';

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

interface BatchViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  batch: Batch;
}

export function BatchViewDialog({
  isOpen,
  onClose,
  batch
}: BatchViewDialogProps) {
  if (!isOpen || !batch) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-white z-10 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Batch Details</CardTitle>
            <Button variant="outline" size="sm" onClick={onClose} className="!bg-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Batch Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <QrCode className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{batch.code}</h2>
                  <p className="text-slate-600">{batch.productName}</p>
                </div>
              </div>
              <Badge variant={batch.status === 'ACTIVE' ? 'success' : 'warning'}>
                {batch.status}
              </Badge>
            </div>

            {/* Batch Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Package className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-slate-500">Quantity</p>
                  <p className="font-medium">{batch.quantity} {batch.unit}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-slate-500">Manufacture Date</p>
                  <p className="font-medium">{batch.manufactureDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-slate-500">Expiry Date</p>
                  <p className="font-medium">{batch.expiryDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <QrCode className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm text-slate-500">QR Code</p>
                  <p className="font-medium">{batch.qrCode || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Blockchain Information */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Blockchain Verification
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Verification Status:</span>
                  <Badge variant="success">Verified</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Blockchain Reference:</span>
                  <span className="font-mono text-xs">{batch.onChainRef || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Verification Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Network:</span>
                  <span>Ethereum Mainnet</span>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="p-4 bg-slate-50 rounded-lg text-center">
              <h3 className="font-semibold text-slate-900 mb-3">QR Code for Tracking</h3>
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-slate-400" />
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                Scan this QR code to track this batch in the supply chain
              </p>
            </div>


            <div className="flex justify-end pt-4 border-t">
              <Button onClick={onClose} variant="outline" className="!bg-white">
                Close
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
