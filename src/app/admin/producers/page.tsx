"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Edit, Trash2, Building2, Mail, Phone, MapPin, Package, Plus } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import { ProducerFormDialog } from '@/components/admin/ProducerFormDialog';

type Producer = {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone?: string;
  address?: string;
  business_type: string;
  status: string;
  created_at: string;
  total_products: number;
  verified: boolean;
};

export default function ProducersPage() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);

  useEffect(() => {
    loadProducers();
  }, []);

  const loadProducers = async () => {
    setLoading(true);
    // Mock data - replace with real API calls later
    setTimeout(() => {
      setProducers([
        {
          id: '1',
          company_name: 'Sidama Coffee Cooperative',
          contact_person: 'Alemayehu Tadesse',
          email: 'info@sidamacoffee.com',
          phone: '+251-911-234-567',
          address: 'Sidama Zone, Southern Ethiopia',
          business_type: 'Agricultural Cooperative',
          status: 'active',
          created_at: '2024-01-15',
          total_products: 8,
          verified: true,
        },
        {
          id: '2',
          company_name: 'Tigray Agricultural Union',
          contact_person: 'Meron Gebre',
          email: 'contact@tigrayagriculture.org',
          phone: '+251-912-345-678',
          address: 'Mekelle, Tigray Region',
          business_type: 'Agricultural Union',
          status: 'active',
          created_at: '2024-02-20',
          total_products: 12,
          verified: true,
        },
        {
          id: '3',
          company_name: 'Addis Leather Works',
          contact_person: 'Kebede Assefa',
          email: 'sales@addisleather.com',
          phone: '+251-913-456-789',
          address: 'Addis Ababa, Ethiopia',
          business_type: 'Manufacturing',
          status: 'active',
          created_at: '2024-03-10',
          total_products: 15,
          verified: true,
        },
        {
          id: '4',
          company_name: 'Shewa Farmers Association',
          contact_person: 'Tigist Worku',
          email: 'info@shewafarmers.org',
          phone: '+251-914-567-890',
          address: 'Debre Berhan, Amhara Region',
          business_type: 'Farmers Association',
          status: 'pending',
          created_at: '2024-04-05',
          total_products: 5,
          verified: false,
        },
        {
          id: '5',
          company_name: 'Oromia Honey Producers',
          contact_person: 'Dawit Bekele',
          email: 'contact@oromiahoney.com',
          phone: '+251-915-678-901',
          address: 'Jimma, Oromia Region',
          business_type: 'Honey Production',
          status: 'inactive',
          created_at: '2024-05-12',
          total_products: 3,
          verified: false,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteProducer = (producer: Producer) => {
    setSelectedProducer(producer);
    setIsDeleteOpen(true);
  };

  const handleEditProducer = (producer: Producer) => {
    setSelectedProducer(producer);
    setIsFormOpen(true);
  };

  const handleAddProducer = () => {
    setSelectedProducer(null);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProducer) {
      setProducers(producers.filter(p => p.id !== selectedProducer.id));
      setIsDeleteOpen(false);
      setSelectedProducer(null);
    }
  };

  const handleFormSubmit = (producerData: Partial<Producer>) => {
    if (selectedProducer) {
      // Update existing producer
      setProducers(producers.map(p =>
        p.id === selectedProducer.id
          ? { ...p, ...producerData }
          : p
      ));
    } else {
      // Add new producer
      const newProducer: Producer = {
        id: `producer-${Date.now()}`,
        created_at: new Date().toISOString().split('T')[0],
        total_products: 0,
        verified: false,
        company_name: producerData.company_name || '',
        contact_person: producerData.contact_person || '',
        email: producerData.email || '',
        phone: producerData.phone,
        address: producerData.address,
        business_type: producerData.business_type || '',
        status: producerData.status || 'pending',
      };
      setProducers([...producers, newProducer]);
    }
    setIsFormOpen(false);
    setSelectedProducer(null);
  };

  const filteredProducers = producers.filter(producer =>
    producer.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    producer.contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
    producer.business_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'destructive';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Producers Management</h1>
            <p className="text-slate-600">Manage your marketplace producers</p>
          </div>
          <Button onClick={handleAddProducer}>
            <Plus className="w-4 h-4 mr-2" />
            Add Producer
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search producers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-slate-600">Loading producers...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducers.map((producer) => (
              <Card key={producer.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <Building2 className="h-8 w-8 text-emerald-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {producer.company_name}
                        </h3>
                        <p className="text-sm text-slate-600">{producer.business_type}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant={getStatusColor(producer.status) as "success" | "destructive" | "warning" | "default"}>
                        {producer.status}
                      </Badge>
                      {producer.verified && (
                        <Badge variant="success" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="h-4 w-4 mr-2 text-slate-400" />
                      {producer.email}
                    </div>
                    {producer.phone && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Phone className="h-4 w-4 mr-2 text-slate-400" />
                        {producer.phone}
                      </div>
                    )}
                    {producer.address && (
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                        {producer.address}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-slate-500">
                      <Package className="h-4 w-4 mr-1" />
                      {producer.total_products} products
                    </div>
                    <div className="text-xs text-slate-400">
                      Joined: {producer.created_at}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditProducer(producer)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProducer(producer)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <ProducerFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          producer={selectedProducer}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Producer"
          message={`Are you sure you want to delete "${selectedProducer?.company_name}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}