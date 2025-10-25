'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Edit, 
  Home,
  Building,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Navigation
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Layout } from '../../components/layout/Layout';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  label: string;
  country: string;
  region: string;
  state: string;
  city: string;
  kebele: string;
  woreda: string;
  phoneNumber: string;
  additionalPhone?: string;
  email: string;
  zipCode: string;
  additionalInfo?: string;
  isDefault: boolean;
  isVerified: boolean;
}

export default function Addresses() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      label: 'Home Address',
      country: 'Ethiopia',
      region: 'Oromia',
      state: 'Addis Ababa',
      city: 'Addis Ababa',
      kebele: 'Kebele 01',
      woreda: 'Woreda 03',
      phoneNumber: '+251 911 234 567',
      additionalPhone: '+251 911 234 568',
      email: 'john.doe@example.com',
      zipCode: '1000',
      additionalInfo: 'Near Bole Airport, House No. 123',
      isDefault: true,
      isVerified: true
    },
    {
      id: '2',
      type: 'work',
      label: 'Office Address',
      country: 'Ethiopia',
      region: 'Oromia',
      state: 'Addis Ababa',
      city: 'Addis Ababa',
      kebele: 'Kebele 05',
      woreda: 'Woreda 02',
      phoneNumber: '+251 911 345 678',
      email: 'john.work@company.com',
      zipCode: '1001',
      additionalInfo: 'Commercial Bank Building, 5th Floor',
      isDefault: false,
      isVerified: true
    },
    {
      id: '3',
      type: 'other',
      label: 'Warehouse Address',
      country: 'Ethiopia',
      region: 'Oromia',
      state: 'Addis Ababa',
      city: 'Addis Ababa',
      kebele: 'Kebele 10',
      woreda: 'Woreda 01',
      phoneNumber: '+251 911 456 789',
      email: 'warehouse@example.com',
      zipCode: '1002',
      additionalInfo: 'Industrial Zone, Warehouse Block A',
      isDefault: false,
      isVerified: false
    }
  ]);

  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'home',
    label: '',
    country: 'Ethiopia',
    region: '',
    state: '',
    city: '',
    kebele: '',
    woreda: '',
    phoneNumber: '',
    additionalPhone: '',
    email: '',
    zipCode: '',
    additionalInfo: ''
  });

  const handleAddAddress = () => {
    setIsAddingNew(true);
  };

  const handleSaveAddress = () => {
    if (newAddress.label && newAddress.region && newAddress.state && newAddress.city && 
        newAddress.kebele && newAddress.phoneNumber && newAddress.email) {
      const address: Address = {
        id: Date.now().toString(),
        type: newAddress.type as 'home' | 'work' | 'other',
        label: newAddress.label,
        country: newAddress.country || 'Ethiopia',
        region: newAddress.region,
        state: newAddress.state,
        city: newAddress.city,
        kebele: newAddress.kebele,
        woreda: newAddress.woreda || '',
        phoneNumber: newAddress.phoneNumber,
        additionalPhone: newAddress.additionalPhone,
        email: newAddress.email,
        zipCode: newAddress.zipCode || '',
        additionalInfo: newAddress.additionalInfo,
        isDefault: addresses.length === 0, // First address is default
        isVerified: false
      };
      
      setAddresses(prev => [...prev, address]);
      setNewAddress({
        type: 'home',
        label: '',
        country: 'Ethiopia',
        region: '',
        state: '',
        city: '',
        kebele: '',
        woreda: '',
        phoneNumber: '',
        additionalPhone: '',
        email: '',
        zipCode: '',
        additionalInfo: ''
      });
      setIsAddingNew(false);
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(address => ({
        ...address,
        isDefault: address.id === id
      }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(address => address.id !== id));
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Building className="w-5 h-5" />;
      case 'other':
        return <MapPin className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case 'home':
        return 'text-blue-600 bg-blue-100';
      case 'work':
        return 'text-green-600 bg-green-100';
      case 'other':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const ethiopianRegions = [
    'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa',
    'Gambela', 'Harari', 'Oromia', 'Sidama', 'Somali', 'SNNP', 'Tigray'
  ];

  const ethiopianCities = [
    'Addis Ababa', 'Dire Dawa', 'Mekelle', 'Gondar', 'Bahir Dar',
    'Hawassa', 'Jimma', 'Harar', 'Dessie', 'Jijiga', 'Shashamane'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Addresses</h1>
                <p className="text-slate-600 mt-2">Manage your delivery and billing addresses</p>
              </div>
              <Button 
                variant="primary" 
                onClick={handleAddAddress}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </Button>
            </div>
          </div>

          {/* Addresses List */}
          <div className="space-y-4 mb-8">
            {addresses.map((address) => (
              <Card key={address.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${getAddressTypeColor(address.type)}`}>
                        {getAddressIcon(address.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{address.label}</h3>
                          {address.isDefault && (
                            <Badge variant="success" className="text-xs">Default</Badge>
                          )}
                          {address.isVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {address.kebele}, {address.woreda}, {address.city}, {address.state}, {address.region}, {address.country}
                            </span>
                          </div>
                          {address.zipCode && (
                            <div className="flex items-center space-x-2">
                              <Navigation className="w-4 h-4" />
                              <span>ZIP: {address.zipCode}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <span>{address.phoneNumber}</span>
                            {address.additionalPhone && (
                              <span className="text-slate-500">• {address.additionalPhone}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{address.email}</span>
                          </div>
                          {address.additionalInfo && (
                            <div className="mt-2 p-2 bg-slate-50 rounded text-slate-700">
                              <strong>Additional Info:</strong> {address.additionalInfo}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(address.id)}
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
                        onClick={() => handleDelete(address.id)}
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

          {/* Add New Address Form */}
          {isAddingNew && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">Add New Address</h2>
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
                  {/* Address Type and Label */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Address Type
                      </label>
                      <Select
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({...newAddress, type: e.target.value as 'home' | 'work' | 'other'})}
                        options={[
                          { value: 'home', label: 'Home' },
                          { value: 'work', label: 'Work' },
                          { value: 'other', label: 'Other' }
                        ]}
                        required
                      />
                    </div>
                    <Input
                      label="Address Label"
                      placeholder="e.g., Home Address, Office"
                      value={newAddress.label}
                      onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                      required
                    />
                  </div>

                  {/* Location Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-900">Location Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Country"
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                        options={[
                          { value: 'Ethiopia', label: 'Ethiopia' },
                          { value: 'Kenya', label: 'Kenya' },
                          { value: 'Uganda', label: 'Uganda' }
                        ]}
                        required
                      />
                      <Select
                        label="Region"
                        value={newAddress.region}
                        onChange={(e) => setNewAddress({...newAddress, region: e.target.value})}
                        options={ethiopianRegions.map(region => ({ value: region, label: region }))}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="State/Zone"
                        placeholder="e.g., Addis Ababa"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                        required
                      />
                      <Select
                        label="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        options={ethiopianCities.map(city => ({ value: city, label: city }))}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Kebele"
                        placeholder="e.g., Kebele 01"
                        value={newAddress.kebele}
                        onChange={(e) => setNewAddress({...newAddress, kebele: e.target.value})}
                        required
                      />
                      <Input
                        label="Woreda"
                        placeholder="e.g., Woreda 03"
                        value={newAddress.woreda}
                        onChange={(e) => setNewAddress({...newAddress, woreda: e.target.value})}
                      />
                    </div>
                    <Input
                      label="ZIP Code"
                      placeholder="e.g., 1000"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-900">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Phone Number"
                        placeholder="+251 911 234 567"
                        value={newAddress.phoneNumber}
                        onChange={(e) => setNewAddress({...newAddress, phoneNumber: e.target.value})}
                        required
                      />
                      <Input
                        label="Additional Phone (Optional)"
                        placeholder="+251 911 234 568"
                        value={newAddress.additionalPhone}
                        onChange={(e) => setNewAddress({...newAddress, additionalPhone: e.target.value})}
                      />
                    </div>
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={newAddress.email}
                      onChange={(e) => setNewAddress({...newAddress, email: e.target.value})}
                      required
                    />
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-900">Additional Information</h3>
                    <Input
                      label="Additional Details (Optional)"
                      placeholder="e.g., House number, landmarks, special instructions"
                      value={newAddress.additionalInfo}
                      onChange={(e) => setNewAddress({...newAddress, additionalInfo: e.target.value})}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={handleSaveAddress}
                    >
                      Save Address
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
                <h3 className="font-semibold text-slate-900">Delivery Preferences</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Set your preferred delivery times and instructions</p>
                <Button variant="outline" className="w-full">
                  Manage Delivery Preferences
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-slate-900">Address Verification</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">Verify your addresses for faster delivery</p>
                <Button variant="outline" className="w-full">
                  Verify Addresses
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
