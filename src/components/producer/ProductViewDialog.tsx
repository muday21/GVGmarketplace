'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { X, Package, MapPin, Shield, DollarSign, Layers } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  currency: string;
  unit: string;
  producerId: string;
  producerName: string;
  producerRegion: string;
  certifications: string[];
  stock: number;
  verified: boolean;
}

interface ProductViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function ProductViewDialog({
  isOpen,
  onClose,
  product
}: ProductViewDialogProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-white z-10 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Product Details</CardTitle>
            <Button variant="outline" size="sm" onClick={onClose} className="!bg-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Product Image */}
            <div className="flex justify-center">
              <img 
                src={product.images?.[0] || '/placeholder-product.jpg'} 
                alt={product.name}
                className="w-48 h-48 rounded-lg object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
                <Badge variant={product.verified ? 'success' : 'warning'}>
                  {product.verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>

              <p className="text-slate-600">{product.description}</p>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-slate-500">Category</p>
                    <p className="font-medium">{product.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="font-medium">{product.price} {product.currency}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-slate-500">Stock</p>
                    <p className="font-medium">{product.stock} {product.unit}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-slate-500">Producer Region</p>
                    <p className="font-medium">{product.producerRegion || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {product.certifications && product.certifications.length > 0 && (
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-slate-500">Certifications</p>
                    <p className="font-medium text-emerald-700">{product.certifications.join(', ')}</p>
                  </div>
                </div>
              )}

              {/* Blockchain Info */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Blockchain Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Verification Status:</span>
                    <Badge variant={product.verified ? 'success' : 'warning'}>
                      {product.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Blockchain Hash:</span>
                    <span className="font-mono text-xs">0x1234...5678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Last Updated:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
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
