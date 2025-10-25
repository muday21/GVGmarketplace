'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Menu, X, ShoppingCart, User, Package, LogOut, CreditCard, MapPin, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCart } from '../../contexts/CartContext';

export const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole') || '';
    const name = localStorage.getItem('userName') || '';
    const email = localStorage.getItem('userEmail') || '';
    setIsAuthenticated(authStatus);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserRole('');
    setUserName('');
    setUserEmail('');
    setShowProfileDropdown(false);
    router.push('/');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileDropdown) {
        const target = event.target as Element;
        if (!target.closest('.profile-dropdown')) {
          setShowProfileDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-slate-900">{t('app.name')}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link href="/products" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
              {t('nav.products')}
            </Link>
            <Link href="/verify" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
              {t('nav.verify')}
            </Link>
            <Link href="/about" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative profile-dropdown">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{userName}</span>
                  </Button>
                  
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                      {/* Profile Header */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                            {userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{userName}</p>
                            <p className="text-sm text-slate-600">{userEmail}</p>
                            <p className="text-xs text-emerald-600 font-medium">{userRole} Account</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Profile Menu Items */}
                      <div className="py-2">
                        <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <User className="w-4 h-4 mr-3" />
                          Profile Settings
                        </Link>
                        <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <ShoppingCart className="w-4 h-4 mr-3" />
                          My Orders
                        </Link>
                        <Link href="/notifications" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <Bell className="w-4 h-4 mr-3" />
                          Notifications
                        </Link>
                        <Link href="/payment-methods" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <CreditCard className="w-4 h-4 mr-3" />
                          Payment Methods
                        </Link>
                        <Link href="/addresses" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <MapPin className="w-4 h-4 mr-3" />
                          Addresses
                        </Link>
                      </div>
                      
                      {/* Logout */}
                      <div className="border-t border-slate-100 pt-2">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">{t('nav.signin')}</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">{t('nav.signup')}</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block text-slate-700 hover:text-emerald-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/products"
              className="block text-slate-700 hover:text-emerald-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.products')}
            </Link>
            <Link
              href="/verify"
              className="block text-slate-700 hover:text-emerald-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.verify')}
            </Link>
            <Link
              href="/about"
              className="block text-slate-700 hover:text-emerald-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block text-slate-700 hover:text-emerald-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-slate-200">
              <LanguageSwitcher />
            </div>
            {isAuthenticated ? (
              <div className="space-y-2">
                {/* Mobile Profile Info */}
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{userName}</p>
                    <p className="text-sm text-slate-600">{userEmail}</p>
                    <p className="text-xs text-emerald-600 font-medium">{userRole} Account</p>
                  </div>
                </div>
                
                {/* Mobile Profile Menu */}
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg">
                  <User className="w-4 h-4 mr-3" />
                  Profile Settings
                </Link>
                <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg">
                  <ShoppingCart className="w-4 h-4 mr-3" />
                  My Orders
                </Link>
                <Link href="/notifications" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg">
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </Link>
                <Link href="/payment-methods" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg">
                  <CreditCard className="w-4 h-4 mr-3" />
                  Payment Methods
                </Link>
                <Link href="/addresses" onClick={() => setIsMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg">
                  <MapPin className="w-4 h-4 mr-3" />
                  Addresses
                </Link>
                
                <div className="pt-2 border-t border-slate-200">
                  <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">{t('nav.signin')}</Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full">{t('nav.signup')}</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
