'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  MapPin, 
  Truck, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  Lock,
  Calendar,
  Phone
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Layout } from '../../components/layout/Layout';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Ethiopia',
    
    // Payment Information
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Delivery Options
    deliveryMethod: 'standard',
    deliveryDate: '',
    specialInstructions: ''
  });

  const steps = [
    { id: 1, name: 'Shipping', icon: MapPin },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: CheckCircle }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In real app, this would process the order
    console.log('Order submitted:', formData);
    alert('Order placed successfully! You will receive a confirmation email shortly.');
  };

  const subtotal = 105.00; // Mock data
  const shipping = 15.00;
  const tax = 8.40;
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
            <p className="text-slate-600 mt-1">Complete your blockchain-verified purchase</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isActive 
                        ? 'border-emerald-500 bg-emerald-500 text-white' 
                        : isCompleted 
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-slate-300 bg-white text-slate-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      isActive ? 'text-emerald-600' : isCompleted ? 'text-emerald-600' : 'text-slate-500'
                    }`}>
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-slate-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {currentStep === 1 && 'Shipping Information'}
                    {currentStep === 2 && 'Payment Information'}
                    {currentStep === 3 && 'Order Review'}
                  </h2>
                </CardHeader>
                <CardContent>
                  
                  {/* Step 1: Shipping */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                        <Input
                          label="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                        <Input
                          label="Phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                      
                      <Input
                        label="Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Street address"
                        required
                      />
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                        <Input
                          label="State/Region"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          required
                        />
                        <Input
                          label="ZIP Code"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          required
                        />
                      </div>
                      
                      <Select
                        label="Country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        options={[
                          { value: 'Ethiopia', label: 'Ethiopia' },
                          { value: 'Kenya', label: 'Kenya' },
                          { value: 'Tanzania', label: 'Tanzania' },
                          { value: 'Uganda', label: 'Uganda' }
                        ]}
                        required
                      />
                    </div>
                  )}

                  {/* Step 2: Payment */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Payment Method
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={formData.paymentMethod === 'card'}
                                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                className="mr-3"
                              />
                              <CreditCard className="w-5 h-5 mr-2 text-slate-600" />
                              <span>Credit/Debit Card</span>
                            </label>
                            <label className="flex items-center p-3 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="mobile"
                                checked={formData.paymentMethod === 'mobile'}
                                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                className="mr-3"
                              />
                              <Phone className="w-5 h-5 mr-2 text-slate-600" />
                              <span>Mobile Money</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {formData.paymentMethod === 'card' && (
                        <>
                          <Input
                            label="Card Number"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          
                          <div className="grid md:grid-cols-3 gap-4">
                            <Input
                              label="Expiry Date"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              placeholder="MM/YY"
                              required
                            />
                            <Input
                              label="CVV"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              placeholder="123"
                              required
                            />
                            <Input
                              label="Cardholder Name"
                              value={formData.cardName}
                              onChange={(e) => handleInputChange('cardName', e.target.value)}
                              required
                            />
                          </div>
                        </>
                      )}
                      
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex items-center text-sm text-slate-600">
                          <Shield className="w-4 h-4 mr-2 text-emerald-600" />
                          <span>Your payment information is encrypted and secure</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Shipping Address</h3>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                          <p>{formData.address}</p>
                          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                          <p>{formData.country}</p>
                          <p className="text-sm text-slate-600 mt-2">{formData.email} • {formData.phone}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Payment Method</h3>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <CreditCard className="w-5 h-5 mr-2 text-slate-600" />
                            <span className="font-medium">
                              {formData.paymentMethod === 'card' ? 'Credit Card' : 'Mobile Money'}
                            </span>
                          </div>
                          {formData.paymentMethod === 'card' && (
                            <p className="text-sm text-slate-600 mt-1">
                              **** **** **** {formData.cardNumber.slice(-4)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Delivery Options</h3>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Truck className="w-5 h-5 mr-2 text-slate-600" />
                              <span>Standard Delivery (3-5 business days)</span>
                            </div>
                            <span className="font-medium">Free</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t border-slate-200 mt-8">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    
                    {currentStep < 3 ? (
                      <Button variant="primary" onClick={nextStep}>
                        Next Step
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-slate-900">Order Summary</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-medium text-emerald-600">Free</span>
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
                </CardContent>
              </Card>

              {/* Security Features */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-slate-900">Security & Trust</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Shield className="w-4 h-4 mr-2 text-emerald-600" />
                    <span>SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                    <span>Blockchain Verified Products</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Lock className="w-4 h-4 mr-2 text-emerald-600" />
                    <span>Secure Payment Processing</span>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-slate-900">Delivery Information</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-slate-600">
                    <Truck className="w-4 h-4 mr-2 text-slate-600" />
                    <span>Standard Delivery: 3-5 business days</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="w-4 h-4 mr-2 text-slate-600" />
                    <span>Estimated delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
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
