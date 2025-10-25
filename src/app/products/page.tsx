'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Search, Filter, Package } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Layout } from '../../components/layout/Layout';
import { mockProducts } from '../../data/mockData';

export default function ProductList() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Coffee', 'Grains & Seeds', 'Leather Goods'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="bg-emerald-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">{t('products.title')}</h1>
            <p className="text-emerald-100 text-lg">Discover authentic Ethiopian products with verified provenance</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                placeholder={t('products.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categories.map(cat => ({ value: cat, label: cat === 'ALL' ? t('products.allCategories') : cat }))}
              className="md:w-64"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> products
            </p>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-4">
                  <div className="text-xs text-emerald-600 font-medium mb-1">{product.category}</div>
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center text-xs text-slate-500 mb-3">
                    <Package className="w-3 h-3 mr-1" />
                    {product.producerName}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.certifications.slice(0, 2).map((cert, idx) => (
                      <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                  <Link href={`/products/${product.slug}`}>
                    <Button variant="primary" size="sm" className="w-full transform hover:scale-105 transition-all">
                      {t('products.viewDetails')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

