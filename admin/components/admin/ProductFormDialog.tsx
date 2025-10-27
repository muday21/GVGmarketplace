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
  company_name: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock_quantity: number;
  producer_id: string | null;
  image_url: string;
  status: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
  producers: Producer[];
};

const CATEGORIES = ['Coffee', 'Grains & Seeds', 'Leather Goods', 'Spices', 'Textiles', 'Honey', 'Other'];
const STATUSES = ['active', 'inactive', 'out_of_stock'];

export function ProductFormDialog({ isOpen, onClose, onSuccess, product, producers }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Coffee',
    price: '',
    stock_quantity: '',
    producer_id: '',
    image_url: '',
    status: 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price.toString(),
        stock_quantity: product.stock_quantity.toString(),
        producer_id: product.producer_id || '',
        image_url: product.image_url,
        status: product.status,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Coffee',
        price: '',
        stock_quantity: '',
        producer_id: '',
        image_url: '',
        status: 'active',
      });
    }
    setError('');
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const productData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      stock_quantity: parseInt(formData.stock_quantity),
      producer_id: formData.producer_id || null,
      image_url: formData.image_url,
      status: formData.status,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (product) {
      result = await supabase
        .from('products')
        .update(productData)
        .eq('id', product.id);
    } else {
      result = await supabase
        .from('products')
        .insert([productData]);
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
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="stock_quantity">Stock Quantity *</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="producer_id">Producer</Label>
              <Select
                value={formData.producer_id}
                onValueChange={(value) => setFormData({ ...formData, producer_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a producer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No producer</SelectItem>
                  {producers.map((producer) => (
                    <SelectItem key={producer.id} value={producer.id}>
                      {producer.company_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://images.pexels.com/..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
