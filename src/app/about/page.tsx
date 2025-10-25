'use client';

import { Shield, Globe, Users, Target, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Layout } from '../../components/layout/Layout';

export default function AboutUs() {

  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Every transaction recorded on an immutable blockchain ledger',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting Ethiopian producers with worldwide markets',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Empowering local farmers and cooperatives',
    },
    {
      icon: Target,
      title: 'Quality Assurance',
      description: 'Verified authenticity from farm to consumer',
    },
  ];

  const team = [
    {
      name: 'Abebe Bekele',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '15+ years in agricultural supply chain management',
    },
    {
      name: 'Meron Tadesse',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Blockchain expert with passion for social impact',
    },
    {
      name: 'Dawit Hailu',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Connecting farmers across Ethiopia',
    },
    {
      name: 'Sara Mohammed',
      role: 'Product Manager',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Building tools that empower producers',
    },
  ];

  return (
    <Layout>
      <div className="bg-white">
        <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=1200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About GIG Supply Chain</h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
              Revolutionizing Ethiopian agriculture through blockchain technology
            </p>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-700 mb-4">
                GIG Supply Chain is dedicated to creating a transparent, efficient, and trustworthy
                marketplace for Ethiopian agricultural products. We leverage blockchain technology
                to ensure every product&apos;s journey is tracked, verified, and accessible to all stakeholders.
              </p>
              <p className="text-lg text-slate-700 mb-4">
                Our platform empowers local producers by connecting them directly with global markets
                while maintaining complete transparency about product origins, quality, and journey.
              </p>
              <div className="flex items-center space-x-4 mt-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-600">500+</p>
                  <p className="text-sm text-slate-600">Producers</p>
                </div>
                <div className="w-px h-16 bg-slate-300" />
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-600">10K+</p>
                  <p className="text-sm text-slate-600">Products Tracked</p>
                </div>
                <div className="w-px h-16 bg-slate-300" />
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-600">25+</p>
                  <p className="text-sm text-slate-600">Countries Reached</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ethiopian Coffee Farm"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                <Award className="w-12 h-12 mb-2" />
                <p className="font-semibold">ISO Certified</p>
                <p className="text-sm text-emerald-100">Quality Assured</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-slate-600">The principles that guide everything we do</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
                      <value.icon className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-slate-600">Passionate people building the future of supply chain</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-slate-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Be part of the revolution that&apos;s transforming Ethiopian agriculture and empowering communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/signup" className="inline-block">
                <button className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                  Become a Producer
                </button>
              </a>
              <a href="/contact" className="inline-block">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

