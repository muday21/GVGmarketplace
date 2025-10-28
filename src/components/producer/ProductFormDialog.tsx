'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { X } from 'lucide-react';

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

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Partial<Product>) => void;
  product?: Product | null;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  onSubmit,
  product
}: ProductFormDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    price: '',
    currency: 'ETB',
    unit: 'kg',
    producerId: '',
    producerName: '',
    producerRegion: '',
    certifications: '',
    stock: '',
    verified: false,
    imageUrl: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price?.toString() || '',
        currency: product.currency || 'ETB',
        unit: product.unit || 'kg',
        producerId: product.producerId || '',
        producerName: product.producerName || '',
        producerRegion: product.producerRegion || '',
        certifications: product.certifications?.join(', ') || '',
        stock: product.stock?.toString() || '',
        verified: product.verified || false,
        imageUrl: product.images?.[0] || ''
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        category: '',
        price: '',
        currency: 'ETB',
        unit: 'kg',
        producerId: '',
        producerName: '',
        producerRegion: '',
        certifications: '',
        stock: '',
        verified: false,
        imageUrl: ''
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      certifications: formData.certifications ? formData.certifications.split(',').map(c => c.trim()) : [],
      images: formData.imageUrl ? [formData.imageUrl] : [],
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
              {product ? 'Edit Product' : 'Add New Product'}
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
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter category"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="product-slug"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Producer ID</label>
                <Input
                  value={formData.producerId}
                  onChange={(e) => setFormData({ ...formData, producerId: e.target.value })}
                  placeholder="producer-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Producer Name</label>
                <Input
                  value={formData.producerName}
                  onChange={(e) => setFormData({ ...formData, producerName: e.target.value })}
                  placeholder="Producer Company Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Producer Region</label>
                <Input
                  value={formData.producerRegion}
                  onChange={(e) => setFormData({ ...formData, producerRegion: e.target.value })}
                  placeholder="Enter producer region"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Certifications</label>
                <Input
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  placeholder="e.g., Organic, Fair Trade (comma separated)"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="verified" className="text-sm font-medium text-gray-700">
                Verified Product
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                {product ? 'Update Product' : 'Add Product'}
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
