'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  Shield, 
  CreditCard,
  Tag,
  Award,
  Leaf,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Layout } from '../../components/layout/Layout';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const moveToWishlist = (id: string) => {
    // In real app, this would add to wishlist
    console.log('Added to wishlist:', id);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15.00;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your cart...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <ShoppingCart className="w-24 h-24 text-slate-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
              <p className="text-slate-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/products">
                <Button variant="primary" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
                <p className="text-slate-600 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
              </div>
              <Link href="/products">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        {item.blockchainVerified && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full">
                            <Shield className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-slate-600 mb-2">{item.producer}</p>
                            
                            {/* Certifications */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {item.blockchainVerified && (
                                <Badge variant="success" className="text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Blockchain Verified
                                </Badge>
                              )}
                              {item.organic && (
                                <Badge variant="info" className="text-xs">
                                  <Leaf className="w-3 h-3 mr-1" />
                                  Organic
                                </Badge>
                              )}
                              {item.fairTrade && (
                                <Badge variant="warning" className="text-xs">
                                  <Award className="w-3 h-3 mr-1" />
                                  Fair Trade
                                </Badge>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="text-sm text-slate-500 space-y-1">
                              <p><span className="font-medium">Location:</span> {item.location}</p>
                              <p><span className="font-medium">Harvested:</span> {new Date(item.harvestDate).toLocaleDateString()}</p>
                              <p><span className="font-medium">Category:</span> {item.category}</p>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-900 mb-4">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 mb-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.maxQuantity}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveToWishlist(item.id)}
                                className="text-slate-600 hover:text-red-600"
                              >
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-slate-600 hover:text-red-600"
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

            {/* Order Summary */}
            <div className="space-y-6">
              
              {/* Product Analysis */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-slate-900">Product Analysis</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category Breakdown */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">By Category</h3>
                    <div className="space-y-2">
                      {Object.entries(
                        cartItems.reduce((acc, item) => {
                          acc[item.category] = (acc[item.category] || 0) + (item.price * item.quantity);
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([category, amount]) => (
                        <div key={category} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700">{category}</span>
                          <span className="text-sm font-bold text-slate-900">${amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Producer Analysis */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">By Producer</h3>
                    <div className="space-y-2">
                      {Object.entries(
                        cartItems.reduce((acc, item) => {
                          acc[item.producer] = (acc[item.producer] || 0) + (item.price * item.quantity);
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([producer, amount]) => (
                        <div key={producer} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm font-medium text-slate-700 truncate">{producer}</span>
                          <span className="text-sm font-bold text-slate-900">${amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certification Analysis */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Certifications</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-2 bg-emerald-50 rounded-lg">
                        <div className="text-lg font-bold text-emerald-600">
                          {cartItems.filter(item => item.blockchainVerified).length}
                        </div>
                        <div className="text-xs text-slate-600">Blockchain Verified</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">
                          {cartItems.filter(item => item.organic).length}
                        </div>
                        <div className="text-xs text-slate-600">Organic</div>
                      </div>
                      <div className="text-center p-2 bg-amber-50 rounded-lg">
                        <div className="text-lg font-bold text-amber-600">
                          {cartItems.filter(item => item.fairTrade).length}
                        </div>
                        <div className="text-xs text-slate-600">Fair Trade</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">
                          {cartItems.length}
                        </div>
                        <div className="text-xs text-slate-600">Total Items</div>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Analysis */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Quantity Insights</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Total Items:</span>
                        <span className="font-medium">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Average per Item:</span>
                        <span className="font-medium">
                          {(cartItems.reduce((sum, item) => sum + item.quantity, 0) / cartItems.length).toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Highest Quantity:</span>
                        <span className="font-medium">
                          {Math.max(...cartItems.map(item => item.quantity))}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Value Analysis */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Value Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Average Item Price:</span>
                        <span className="font-medium">${(subtotal / cartItems.reduce((sum, item) => sum + item.quantity, 0)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Most Expensive:</span>
                        <span className="font-medium">${Math.max(...cartItems.map(item => item.price)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Least Expensive:</span>
                        <span className="font-medium">${Math.min(...cartItems.map(item => item.price)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Pricing Breakdown */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {subtotal < 100 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm text-amber-800">
                        Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-slate-900">Promo Code</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <Button variant="outline">
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button variant="primary" size="lg" className="w-full">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Security & Trust */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span>Secure checkout with blockchain verification</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Items */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-slate-900">You might also like</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Recommended product"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">Handcrafted Leather Bag</p>
                        <p className="text-sm text-slate-600">$125.00</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
