'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Lock,
  Smartphone,
  Building2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Layout } from '../../components/layout/Layout';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'mobile';
  name: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
  isVerified: boolean;
  bankName?: string;
  accountNumber?: string;
  phoneNumber?: string;
}

export default function PaymentMethods() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedType, setSelectedType] = useState<'card' | 'bank' | 'mobile'>('card');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa **** 4242',
      lastFour: '4242',
      expiryDate: '12/25',
      isDefault: true,
      isVerified: true
    },
    {
      id: '2',
      type: 'card',
      name: 'Mastercard **** 5555',
      lastFour: '5555',
      expiryDate: '08/26',
      isDefault: false,
      isVerified: true
    },
    {
      id: '3',
      type: 'bank',
      name: 'Commercial Bank of Ethiopia',
      bankName: 'Commercial Bank of Ethiopia',
      accountNumber: '****1234',
      isDefault: false,
      isVerified: true
    },
    {
      id: '4',
      type: 'mobile',
      name: 'Mobile Money',
      phoneNumber: '+251 9** *** 5678',
      isDefault: false,
      isVerified: false
    }
  ]);

  const handleAddPaymentMethod = () => {
    setIsAddingNew(true);
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'bank':
        return <Building2 className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case 'card':
        return 'text-blue-600 bg-blue-100';
      case 'bank':
        return 'text-green-600 bg-green-100';
      case 'mobile':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Payment Methods</h1>
                <p className="text-slate-600 mt-2">Manage your payment methods for secure transactions</p>
              </div>
              <Button 
                variant="primary" 
                onClick={handleAddPaymentMethod}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Payment Method</span>
              </Button>
            </div>
          </div>

          {/* Security Notice */}
          <Card className="mb-8 bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-900">Secure Payment Processing</h3>
                  <p className="text-sm text-emerald-800 mt-1">
                    All payment information is encrypted and processed securely. We never store your full card details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods List */}
          <div className="space-y-4 mb-8">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${getPaymentTypeColor(method.type)}`}>
                        {getPaymentIcon(method.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-slate-900">{method.name}</h3>
                          {method.isDefault && (
                            <Badge variant="success" className="text-xs">Default</Badge>
                          )}
                          {method.isVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                          )}
                        </div>
                        <div className="text-sm text-slate-600 mt-1">
                          {method.type === 'card' && (
                            <span>Expires {method.expiryDate}</span>
                          )}
                          {method.type === 'bank' && (
                            <span>Account: {method.accountNumber}</span>
                          )}
                          {method.type === 'mobile' && (
                            <span>{method.phoneNumber}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(method.id)}
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

          {/* Add New Payment Method Form */}
          {isAddingNew && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Add New Payment Method</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setIsAddingNew(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Payment Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Payment Method Type
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { type: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                        { type: 'bank', label: 'Bank Account', icon: Building2 },
                        { type: 'mobile', label: 'Mobile Money', icon: Smartphone }
                      ].map(({ type, label, icon: Icon }) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type as 'card' | 'bank' | 'mobile')}
                          className={`p-4 border-2 rounded-lg text-center transition-colors ${
                            selectedType === type
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                          <span className="text-sm font-medium text-slate-700">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Form */}
                  {selectedType === 'card' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <Input
                          label="Cardholder Name"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                          required
                        />
                        <Input
                          label="CVV"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Bank Account Form */}
                  {selectedType === 'bank' && (
                    <div className="space-y-4">
                      <Input
                        label="Bank Name"
                        placeholder="Commercial Bank of Ethiopia"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Account Number"
                          placeholder="1234567890"
                          required
                        />
                        <Input
                          label="Account Holder Name"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Mobile Money Form */}
                  {selectedType === 'mobile' && (
                    <div className="space-y-4">
                      <Select
                        label="Mobile Money Provider"
                        options={[
                          { value: 'telebirr', label: 'Telebirr' },
                          { value: 'm-pesa', label: 'M-Pesa' },
                          { value: 'amole', label: 'Amole' }
                        ]}
                        required
                      />
                      <Input
                        label="Phone Number"
                        placeholder="+251 9XX XXX XXX"
                        required
                      />
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Lock className="w-5 h-5 text-slate-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-900">Security & Privacy</h4>
                        <p className="text-sm text-slate-600 mt-1">
                          Your payment information is encrypted and processed securely. 
                          We use industry-standard security measures to protect your data.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button variant="primary" className="flex-1">
                      Add Payment Method
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingNew(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-slate-900">Transaction History</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">View your recent payment transactions</p>
                <Link href="/orders">
                  <Button variant="outline" className="w-full">
                    View Transactions
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-slate-900">Security Settings</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Manage your payment security preferences</p>
                <Button variant="outline" className="w-full">
                  Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
