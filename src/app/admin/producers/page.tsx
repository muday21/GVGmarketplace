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
  contact_name: string;
  email: string;
  phone?: string;
  address?: string;
  status: string;
  created_at: string;
  total_products: number;
  total_sales: number;
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
          contact_name: 'Alemayehu Tadesse',
          email: 'contact@sidamacoffee.et',
          phone: '+251-11-123-4567',
          address: 'Sidama Zone, Southern Ethiopia',
          status: 'active',
          created_at: '2024-08-15',
          total_products: 8,
          total_sales: 15000.00,
        },
        {
          id: '2',
          company_name: 'Tigray Agricultural Union',
          contact_name: 'Meron Gebre',
          email: 'info@tigrayagricultural.et',
          phone: '+251-14-234-5678',
          address: 'Tigray Region, Northern Ethiopia',
          status: 'active',
          created_at: '2024-08-20',
          total_products: 12,
          total_sales: 22000.00,
        },
        {
          id: '3',
          company_name: 'Addis Leather Works',
          contact_name: 'Kebede Assefa',
          email: 'sales@addisleather.et',
          phone: '+251-11-345-6789',
          address: 'Addis Ababa, Ethiopia',
          status: 'active',
          created_at: '2024-09-01',
          total_products: 15,
          total_sales: 18000.00,
        },
        {
          id: '4',
          company_name: 'Shewa Farmers Association',
          contact_name: 'Tigist Worku',
          email: 'contact@shewafarmers.et',
          phone: '+251-11-456-7890',
          address: 'Shewa Zone, Central Ethiopia',
          status: 'pending',
          created_at: '2024-09-10',
          total_products: 5,
          total_sales: 3500.00,
        },
        {
          id: '5',
          company_name: 'Harar Honey Producers',
          contact_name: 'Ahmed Ali',
          email: 'info@hararhoney.et',
          phone: '+251-25-567-8901',
          address: 'Harar, Eastern Ethiopia',
          status: 'active',
          created_at: '2024-09-15',
          total_products: 6,
          total_sales: 8500.00,
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

  const handleFormSubmit = (producerData: any) => {
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
        ...producerData,
        id: `producer-${Date.now()}`,
        created_at: new Date().toISOString().split('T')[0],
        total_products: 0,
        total_sales: 0,
      };
      setProducers([...producers, newProducer]);
    }
    setIsFormOpen(false);
    setSelectedProducer(null);
  };

  const filteredProducers = producers.filter(producer =>
    producer.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    producer.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    producer.email.toLowerCase().includes(searchQuery.toLowerCase())
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
          <div className="grid gap-6">
            {filteredProducers.map((producer) => (
              <Card key={producer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {producer.company_name}
                          </h3>
                          <Badge variant={getStatusColor(producer.status) as any}>
                            {producer.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-slate-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Contact:</span>
                            <span>{producer.contact_name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{producer.email}</span>
                          </div>
                          {producer.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{producer.phone}</span>
                            </div>
                          )}
                          {producer.address && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate">{producer.address}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1">
                            <Package className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-500">Products:</span>
                            <span className="font-medium">{producer.total_products}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Total Sales:</span>
                            <span className="ml-1 font-medium">${producer.total_sales}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Joined:</span>
                            <span className="ml-1 font-medium">{producer.created_at}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProducer(producer)}
                      >
                        <Edit className="w-4 h-4" />
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProducers.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No producers found</h3>
              <p className="text-slate-600">
                {searchQuery ? 'Try adjusting your search criteria' : 'No producers registered yet'}
              </p>
            </CardContent>
          </Card>
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
