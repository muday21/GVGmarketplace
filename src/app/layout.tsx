import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from './i18n-provider';
import { CartProvider } from '../contexts/CartContext';
import { PerformanceMonitor } from '../components/PerformanceMonitor';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'GVG Blockchain Marketplace',
    template: '%s | GVG Blockchain'
  },
  description: 'Ethiopian Agricultural Product Verification System - Transparent blockchain marketplace for authentic products',
  keywords: ['blockchain', 'agriculture', 'ethiopia', 'verification', 'marketplace'],
  authors: [{ name: 'GVG Team' }],
  creator: 'Green Value Groups',
  publisher: 'GVG',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gvgmarketplace.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gvgmarketplace.com',
    title: 'GVG Blockchain Marketplace',
    description: 'Ethiopian Agricultural Product Verification System',
    siteName: 'GVG Marketplace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GVG Blockchain Marketplace',
    description: 'Ethiopian Agricultural Product Verification System',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#059669" />
      </head>
      <body>
        <PerformanceMonitor />
        <Suspense fallback={<div>Loading...</div>}>
          <I18nProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </I18nProvider>
        </Suspense>
      </body>
    </html>
  );
}

