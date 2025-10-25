'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Package, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">{t('app.name')}</span>
            </div>
            <p className="text-sm">{t('app.tagline')}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-emerald-500 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-500 transition-colors">
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-emerald-500 transition-colors">
                  {t('nav.verify')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">For Producers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/signup" className="hover:text-emerald-500 transition-colors">
                  Become a Producer
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-500 transition-colors">
                  Producer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@gigsupplychain.et</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+251 11 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {t('app.name')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
