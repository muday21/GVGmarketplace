'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface AdminUserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<AdminUser>) => void;
  user?: AdminUser | null;
}

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  permissions: string[];
};

export function AdminUserFormDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  user 
}: AdminUserFormDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'ADMIN',
    status: 'active',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'ADMIN',
        status: user.status || 'active',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'ADMIN',
        status: 'active',
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className="shadow-2xl">
          <CardHeader className="sticky top-0 bg-white z-10 border-b">
            <CardTitle className="text-xl">{user ? 'Edit Admin User' : 'Add New Admin User'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="MODERATOR">Moderator</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Role Permissions:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li><strong>Super Admin:</strong> Full system access, can manage all users</li>
                  <li><strong>Admin:</strong> Manage products, customers, producers</li>
                  <li><strong>Moderator:</strong> View and moderate content</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  {user ? 'Update Admin User' : 'Add Admin User'}
                </Button>
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
