'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Package, MapPin, Award, ShoppingCart, ChevronLeft, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Layout } from '../../../components/layout/Layout';
import { mockProducts } from '../../../data/mockData';
import { useCart } from '../../../contexts/CartContext';

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const product = mockProducts.find(p => p.slug === slug);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        category: product.category,
        producer: product.producerName,
        location: product.producerRegion,
        harvestDate: '2024-01-01', // Default harvest date
        blockchainVerified: product.verified || false,
        organic: product.certifications.includes('Organic'),
        fairTrade: product.certifications.includes('Fair Trade'),
        inStock: (product.stock || 0) > 0, // Convert stock to inStock boolean
        maxQuantity: Math.min(product.stock || 10, 10), // Use actual stock or default to 10
      });
      
      setIsAdding(false);
      
      // Show success message
      alert(`Added ${quantity} ${product.name} to cart!`);
    }, 1000);
  };

  const increaseQuantity = () => {
    const maxQty = Math.min(product?.stock || 10, 10);
    if (quantity < maxQty) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h2>
            <Link href="/products">
              <Button variant="primary">Back to Products</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/products" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="bg-white rounded-xl overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-emerald-500' : 'border-slate-200'
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${idx + 1}`} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="info">{product.category}</Badge>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-6">{product.name}</h1>

              <div className="bg-slate-50 rounded-lg p-4 mb-6 space-y-3">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Producer</p>
                    <p className="font-medium text-slate-900">{product.producerName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Origin</p>
                    <p className="font-medium text-slate-900">{product.producerRegion}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Certifications</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.certifications.map((cert, idx) => (
                        <span key={idx} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Description</h3>
                  <p className="text-slate-700">{product.description}</p>
                </CardContent>
              </Card>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={increaseQuantity}
                      disabled={quantity >= Math.min(product.stock || 10, 10)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-slate-500">
                      Max: {Math.min(product.stock || 10, 10)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={isAdding || !((product.stock || 0) > 0)}
                    className="flex-1"
                  >
                    {isAdding ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <Heart className="w-5 h-5" />
                  </Button>
                  
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {!((product.stock || 0) > 0) && (
                  <div className="text-red-600 text-sm">
                    This product is currently out of stock
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

