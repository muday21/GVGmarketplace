"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Plus, Search, Edit, Trash2, Package, CheckCircle, XCircle, Eye } from 'lucide-react';
import { ProductFormDialog } from '@/components/admin/ProductFormDialog';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import { RejectionDialog } from '@/components/admin/RejectionDialog';

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
  approval_status: string;
  created_at: string;
  submitted_at?: string;
  approved_at?: string;
  rejected_at?: string;
  rejection_reason?: string;
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
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
    loadProducers();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    // Mock data - replace with real API calls later
    setTimeout(() => {
      setProducts([
        {
          id: '1',
          name: 'Ethiopian Yirgacheffe Coffee',
          description: 'Premium single-origin coffee from Yirgacheffe region',
          category: 'Coffee',
          price: 45.00,
          stock_quantity: 100,
          producer_id: '1',
          image_url: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg',
          status: 'active',
          approval_status: 'approved',
          created_at: '2024-10-01',
          submitted_at: '2024-10-01',
          approved_at: '2024-10-02',
        },
        {
          id: '2',
          name: 'Humera Sesame Seeds',
          description: 'High-quality sesame seeds from Humera region',
          category: 'Grains & Seeds',
          price: 32.00,
          stock_quantity: 250,
          producer_id: '2',
          image_url: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg',
          status: 'active',
          approval_status: 'approved',
          created_at: '2024-10-02',
          submitted_at: '2024-10-02',
          approved_at: '2024-10-03',
        },
        {
          id: '3',
          name: 'Handcrafted Leather Bag',
          description: 'Traditional Ethiopian leather craftsmanship',
          category: 'Leather Goods',
          price: 125.00,
          stock_quantity: 50,
          producer_id: '3',
          image_url: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
          status: 'active',
          approval_status: 'approved',
          created_at: '2024-10-03',
          submitted_at: '2024-10-03',
          approved_at: '2024-10-04',
        },
        {
          id: '4',
          name: 'Organic Teff Grain',
          description: 'Nutritious ancient grain from Ethiopia',
          category: 'Grains & Seeds',
          price: 28.00,
          stock_quantity: 200,
          producer_id: '1',
          image_url: 'https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg',
          status: 'pending',
          approval_status: 'pending',
          created_at: '2024-10-04',
          submitted_at: '2024-10-04',
        },
        {
          id: '5',
          name: 'Ethiopian Honey',
          description: 'Pure wild honey from Ethiopian highlands',
          category: 'Food & Beverages',
          price: 18.00,
          stock_quantity: 150,
          producer_id: '4',
          image_url: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg',
          status: 'inactive',
          approval_status: 'rejected',
          created_at: '2024-10-05',
          submitted_at: '2024-10-05',
          rejected_at: '2024-10-06',
          rejection_reason: 'Missing certification documents',
        },
        {
          id: '6',
          name: 'Traditional Spices Mix',
          description: 'Authentic Ethiopian spice blend',
          category: 'Spices',
          price: 22.00,
          stock_quantity: 80,
          producer_id: '2',
          image_url: 'https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg',
          status: 'pending',
          approval_status: 'pending',
          created_at: '2024-10-06',
          submitted_at: '2024-10-06',
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const loadProducers = async () => {
    // Mock data - replace with real API calls later
    setProducers([
      { id: '1', company_name: 'Sidama Coffee Cooperative' },
      { id: '2', company_name: 'Tigray Agricultural Union' },
      { id: '3', company_name: 'Addis Leather Works' },
      { id: '4', company_name: 'Shewa Farmers Association' },
    ]);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (selectedProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, ...formData, price: parseFloat(formData.price), stock_quantity: parseInt(formData.stock_quantity) }
          : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        created_at: new Date().toISOString().split('T')[0],
      };
      setProducts([...products, newProduct]);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setIsDeleteOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleApproveProduct = (product: Product) => {
    setProducts(products.map(p => 
      p.id === product.id 
        ? { 
            ...p, 
            approval_status: 'approved', 
            status: 'active',
            approved_at: new Date().toISOString().split('T')[0],
            rejected_at: undefined,
            rejection_reason: undefined
          }
        : p
    ));
  };

  const handleRejectProduct = (product: Product, reason: string) => {
    setProducts(products.map(p => 
      p.id === product.id 
        ? { 
            ...p, 
            approval_status: 'rejected', 
            status: 'inactive',
            rejected_at: new Date().toISOString().split('T')[0],
            rejection_reason: reason,
            approved_at: undefined
          }
        : p
    ));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If search query is empty, show all products
    if (!searchQuery) return true;
    
    // If search query matches approval status, filter by that
    if (searchQuery === 'pending' || searchQuery === 'approved' || searchQuery === 'rejected') {
      return product.approval_status === searchQuery;
    }
    
    // Otherwise, use text search
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'destructive';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getApprovalStatusColor = (approvalStatus: string) => {
    switch (approvalStatus) {
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Products Management</h1>
            <p className="text-slate-600">Manage your marketplace products</p>
          </div>
          <Button onClick={handleAddProduct} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSearchQuery('')}
                >
                  All Products
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSearchQuery('pending')}
                >
                  Pending Review
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSearchQuery('approved')}
                >
                  Approved
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSearchQuery('rejected')}
                >
                  Rejected
                </Button>
              </div>
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
        ) : (
          <div className="grid gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-slate-900">
                                {product.name}
                              </h3>
                              <Badge variant={getStatusColor(product.status) as any}>
                                {product.status}
                              </Badge>
                              <Badge variant={getApprovalStatusColor(product.approval_status) as any}>
                                {product.approval_status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-2">
                              <span>Category: {product.category}</span>
                              <span>Price: ${product.price}</span>
                              <span>Stock: {product.stock_quantity}</span>
                            </div>
                            {product.rejection_reason && (
                              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                <strong>Rejection Reason:</strong> {product.rejection_reason}
                              </div>
                            )}
                            <div className="text-xs text-slate-400 mt-1">
                              Submitted: {product.submitted_at} 
                              {product.approved_at && ` • Approved: ${product.approved_at}`}
                              {product.rejected_at && ` • Rejected: ${product.rejected_at}`}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {product.approval_status === 'pending' && (
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveProduct(product)}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setIsRejectionOpen(true);
                                  }}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProduct(product)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600 mb-4">
                {searchQuery ? 'Try adjusting your search criteria' : 'Get started by adding your first product'}
              </p>
              {!searchQuery && (
                <Button onClick={handleAddProduct}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        <ProductFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          product={selectedProduct}
          producers={producers}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Product"
          message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        />

        <RejectionDialog
          isOpen={isRejectionOpen}
          onClose={() => setIsRejectionOpen(false)}
          onConfirm={(reason) => {
            if (selectedProduct) {
              handleRejectProduct(selectedProduct, reason);
            }
          }}
          productName={selectedProduct?.name || ''}
        />
      </div>
    </AdminLayout>
  );
}
