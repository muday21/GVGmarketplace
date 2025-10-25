'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Card, CardContent } from '../../components/ui/Card';
import { Layout } from '../../components/layout/Layout';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for contacting us! We will get back to you soon.');
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@gigsupplychain.et',
      link: 'mailto:info@gigsupplychain.et',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+251 11 123 4567',
      link: 'tel:+251111234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Bole Road, Addis Ababa, Ethiopia',
      link: null,
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon-Fri: 8:00 AM - 6:00 PM',
      link: null,
    },
  ];

  return (
    <Layout>
      <div className="bg-white">
        <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                    <info.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-slate-600 hover:text-emerald-600 transition-colors">
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-slate-600">{info.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
                <Input
                  label="Subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What is this about?"
                  required
                />
                <Textarea
                  label="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more..."
                  rows={6}
                  required
                />
                <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Visit Our Office</h2>
              <div className="bg-slate-100 rounded-xl overflow-hidden h-96 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.558673478674!2d38.76302631477994!3d9.012378893525895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Office Location</h3>
                  <p className="text-slate-700 mb-2">Bole Road, near Edna Mall</p>
                  <p className="text-slate-700 mb-2">Addis Ababa, Ethiopia</p>
                  <p className="text-slate-700">Postal Code: 1000</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 mb-8">Need quick answers? Check our FAQ section</p>
            <a href="/faq">
              <Button variant="outline" size="lg">View FAQs</Button>
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}

