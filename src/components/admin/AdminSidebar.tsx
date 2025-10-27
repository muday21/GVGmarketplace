"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { demoAuth } from '@/lib/demo-auth';
import {
  LayoutDashboard,
  Package,
  Users,
  UserCircle,
  Building2,
  LogOut,
  Shield,
  Mail,
  Calendar,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Producers', href: '/admin/producers', icon: Building2 },
  { name: 'Admin Users', href: '/admin/users', icon: UserCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminInfo, setAdminInfo] = useState<{
    name: string;
    email: string;
    role: string;
    lastLogin: string;
  } | null>(null);

  useEffect(() => {
    // Get admin information from localStorage
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    if (userName && userEmail && userRole) {
      setAdminInfo({
        name: userName,
        email: userEmail,
        role: userRole,
        lastLogin: new Date().toLocaleDateString()
      });
    }
  }, []);

  const handleSignOut = () => {
    demoAuth.signOut();
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">GVG Admin</h1>
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

      {/* Admin Profile Section */}
      {adminInfo && (
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <UserCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                  {adminInfo.name}
                </h3>
                <p className="text-xs text-slate-400 truncate">
                  {adminInfo.role}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Mail className="w-3 h-3" />
                <span className="truncate">{adminInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Calendar className="w-3 h-3" />
                <span>Last login: {adminInfo.lastLogin}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-slate-700">
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <Settings className="w-3 h-3" />
                <span>Profile Settings</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
