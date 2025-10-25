'use client';

import { useState, useEffect, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Shield, TrendingUp, Globe, Package, Star, Quote } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Layout } from '../components/layout/Layout';

// Lazy load dashboard components for better performance
const BuyerDashboard = lazy(() => import('./dashboard/buyer/page'));
const ProducerDashboard = lazy(() => import('./dashboard/producer/page'));
const AdminDashboard = lazy(() => import('./dashboard/admin/page'));

export default function Home() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole') || '';
    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, []);

  // If user is authenticated, show their dashboard
  if (isAuthenticated) {
    if (userRole === 'PRODUCER') {
      return <ProducerDashboard />;
    } else if (userRole === 'ADMIN') {
      return <AdminDashboard />;
    } else {
      return <BuyerDashboard />; // Default for BUYER role
    }
  }

  const features = [
    {
      icon: Shield,
      title: 'Blockchain Verified',
      description: 'Every product tracked on an immutable blockchain ledger',
    },
    {
      icon: TrendingUp,
      title: 'Direct from Producers',
      description: 'Connect directly with Ethiopian farmers and cooperatives',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Ethiopian quality products available worldwide',
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Ethiopian Yirgacheffe Coffee',
      category: 'Coffee',
      image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800',
      producer: 'Sidama Coffee Cooperative',
    },
    {
      id: 2,
      name: 'Humera Sesame Seeds',
      category: 'Grains & Seeds',
      image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=800',
      producer: 'Tigray Agricultural Union',
    },
    {
      id: 3,
      name: 'Handcrafted Leather Bag',
      category: 'Leather Goods',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      producer: 'Addis Leather Works',
    },
    {
      id: 4,
      name: 'Organic Teff Grain',
      category: 'Grains & Seeds',
      image: 'https://images.pexels.com/photos/4197439/pexels-photo-4197439.jpeg?auto=compress&cs=tinysrgb&w=800',
      producer: 'Shewa Farmers Association',
    },
  ];

  const testimonials = [
    {
      name: 'John Anderson',
      role: 'Coffee Importer, USA',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'GIG Supply Chain has revolutionized how we source Ethiopian coffee. The blockchain verification gives us complete confidence in product authenticity.',
      rating: 5,
    },
    {
      name: 'Marie Dubois',
      role: 'Retailer, France',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'The transparency provided by this platform is unmatched. We can trace every product back to its origin, which our customers truly value.',
      rating: 5,
    },
    {
      name: 'Ahmed Hassan',
      role: 'Distributor, UAE',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Finally, a platform that bridges Ethiopian producers with global markets while ensuring quality and authenticity at every step.',
      rating: 5,
    },
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* CSS Test - Remove this after confirming CSS works */}
        <div className="bg-red-500 text-white p-4 mb-4 text-center">
          <h1 className="text-2xl font-bold">CSS TEST - If you see this styled, CSS is working!</h1>
        </div>
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-700/90"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-700/90" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
            <div className="max-w-4xl animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-3xl mb-8 text-emerald-100 animate-slide-up animation-delay-200">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
                <Link href="/products">
                  <Button variant="primary" size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 transform hover:scale-105 transition-all">
                    {t('hero.cta')}
                  </Button>
                </Link>
                <Link href="/verify">
                  <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 transform hover:scale-105 transition-all">
                    {t('hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mb-4 transform hover:rotate-12 transition-transform">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1843288/pexels-photo-1843288.jpeg?auto=compress&cs=tinysrgb&w=1600)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }} className="absolute inset-0" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-2">{t('products.title')}</h2>
                <p className="text-slate-600 text-lg">Authentic Ethiopian products with blockchain-verified provenance</p>
              </div>
              <Link href="/products">
                <Button variant="outline" className="hover:shadow-lg transform hover:scale-105 transition-all">View All Products</Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative h-56 overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="p-4">
                    <div className="text-xs text-emerald-600 font-medium mb-1">{product.category}</div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-lg">{product.name}</h3>
                    <div className="flex items-center text-xs text-slate-500 mb-3">
                      <Package className="w-3 h-3 mr-1" />
                      {product.producer}
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <Button variant="primary" size="sm" className="w-full transform hover:scale-105 transition-all">
                        {t('products.viewDetails')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-slate-50 to-emerald-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Partners Say</h2>
              <p className="text-xl text-slate-600">Trusted by importers and distributors worldwide</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-emerald-600 mb-4 opacity-50" />
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-6 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
                      />
                      <div>
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1600)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-700/95" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Join Our Marketplace</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              Are you a producer? List your products and reach global markets with blockchain-verified authenticity.
            </p>
            <Link href="/auth/signup">
              <Button variant="primary" size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 transform hover:scale-110 transition-all animate-fade-in animation-delay-400">
                Become a Producer
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

