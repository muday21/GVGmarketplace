"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  UserCircle,
  Building2,
  LogOut,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Producers', href: '/admin/producers', icon: Building2 },
  { name: 'Admin Users', href: '/admin/users', icon: UserCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">GIG Admin</h1>
            <p className="text-xs text-slate-400">Management Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={signOut}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
