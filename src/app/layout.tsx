import type { Metadata } from 'next';
import './globals.css';
import { I18nProvider } from './i18n-provider';
import { CartProvider } from '../contexts/CartContext';

export const metadata: Metadata = {
  title: 'GVG Blockchain',
  description: 'Ethiopian Agricultural Product Verification System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

