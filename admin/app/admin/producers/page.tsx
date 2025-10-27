"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Building2, Mail, Phone, MapPin, CheckCircle, Clock, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProducerFormDialog } from '@/components/admin/ProducerFormDialog';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';

type Producer = {
  id: string;
  email: string;
  company_name: string;
  contact_person: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: string;
  verification_status: string;
  total_products: number;
  created_at: string;
};

export default function ProducersPage() {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);

  useEffect(() => {
    loadProducers();
  }, []);

  const loadProducers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('producers')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducers(data);
    }
    setLoading(false);
  };

  const handleEdit = (producer: Producer) => {
    setSelectedProducer(producer);
    setIsFormOpen(true);
  };

  const handleDelete = (producer: Producer) => {
    setSelectedProducer(producer);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProducer) return;

    const { error } = await supabase
      .from('producers')
      .delete()
      .eq('id', selectedProducer.id);

    if (!error) {
      loadProducers();
      setIsDeleteOpen(false);
      setSelectedProducer(null);
    }
  };

  const handleFormSuccess = () => {
    loadProducers();
    setIsFormOpen(false);
    setSelectedProducer(null);
  };

  const filteredProducers = producers.filter(
    (producer) =>
      producer.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Producers</h1>
            <p className="text-slate-600">Manage your producer network</p>
          </div>
          <Button
            onClick={() => {
              setSelectedProducer(null);
              setIsFormOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Producer
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search producers by company, contact person, or city..."
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
              <p className="mt-4 text-slate-600">Loading producers...</p>
            </div>
          </div>
        ) : filteredProducers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No producers found</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first producer</p>
              <Button
                onClick={() => {
                  setSelectedProducer(null);
                  setIsFormOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Producer
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProducers.map((producer) => (
              <Card key={producer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">
                        {producer.company_name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">{producer.contact_person}</p>
                      <div className="flex space-x-2">
                        <Badge variant={producer.status === 'active' ? 'default' : 'secondary'}>
                          {producer.status}
                        </Badge>
                        <Badge
                          variant={
                            producer.verification_status === 'verified' ? 'default' :
                            producer.verification_status === 'pending' ? 'secondary' :
                            'destructive'
                          }
                          className="flex items-center space-x-1"
                        >
                          {getVerificationIcon(producer.verification_status)}
                          <span>{producer.verification_status}</span>
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(producer)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(producer)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-slate-400" />
                      <span>{producer.email}</span>
                    </div>
                    {producer.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{producer.phone}</span>
                      </div>
                    )}
                    {producer.city && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                        <span>{producer.city}, {producer.country}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Total Products</span>
                      <span className="font-semibold text-emerald-600">{producer.total_products}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <ProducerFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedProducer(null);
          }}
          onSuccess={handleFormSuccess}
          producer={selectedProducer}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedProducer(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Producer"
          description={`Are you sure you want to delete "${selectedProducer?.company_name}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}
