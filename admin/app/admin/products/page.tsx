"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProductFormDialog } from '@/components/admin/ProductFormDialog';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';

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
  created_at: string;
};

type Producer = {
  id: string;
  company_name: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
    loadProducers();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const loadProducers = async () => {
    const { data } = await supabase
      .from('producers')
      .select('id, company_name')
      .eq('status', 'active');

    if (data) {
      setProducers(data);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', selectedProduct.id);

    if (!error) {
      loadProducts();
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleFormSuccess = () => {
    loadProducts();
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Products</h1>
            <p className="text-slate-600">Manage your product catalog</p>
          </div>
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setIsFormOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search products by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-slate-600">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first product</p>
              <Button
                onClick={() => {
                  setSelectedProduct(null);
                  setIsFormOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={product.image_url || 'https://images.pexels.com/photos/3944405/pexels-photo-3944405.jpeg'}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-slate-600 mb-2">{product.description}</p>
                          <div className="flex items-center space-x-3 text-sm text-slate-500">
                            <span className="font-medium text-emerald-600">{product.category}</span>
                            <span>•</span>
                            <span>Stock: {product.stock_quantity}</span>
                            <span>•</span>
                            <span className="font-semibold text-slate-900">${product.price}</span>
                          </div>
                        </div>
                        <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <ProductFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedProduct(null);
          }}
          onSuccess={handleFormSuccess}
          product={selectedProduct}
          producers={producers}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Product"
          description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}
