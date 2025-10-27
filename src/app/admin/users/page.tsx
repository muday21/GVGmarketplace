"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Edit, Trash2, UserCircle, Mail, Shield, Plus } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import { AdminUserFormDialog } from '@/components/admin/AdminUserFormDialog';

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  last_login?: string;
  permissions: string[];
};

export default function AdminUsersPage() {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    loadAdminUsers();
  }, []);

  const loadAdminUsers = async () => {
    setLoading(true);
    // Mock data - replace with real API calls later
    setTimeout(() => {
      setAdminUsers([
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@gvgmarketplace.com',
          role: 'SUPER_ADMIN',
          status: 'active',
          created_at: '2024-01-01',
          last_login: '2024-10-25',
          permissions: ['all'],
        },
        {
          id: '2',
          name: 'John Smith',
          email: 'john.smith@gvgmarketplace.com',
          role: 'ADMIN',
          status: 'active',
          created_at: '2024-02-15',
          last_login: '2024-10-24',
          permissions: ['products', 'customers', 'producers'],
        },
        {
          id: '3',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@gvgmarketplace.com',
          role: 'MODERATOR',
          status: 'active',
          created_at: '2024-03-20',
          last_login: '2024-10-23',
          permissions: ['products', 'customers'],
        },
        {
          id: '4',
          name: 'Mike Wilson',
          email: 'mike.wilson@gvgmarketplace.com',
          role: 'ADMIN',
          status: 'inactive',
          created_at: '2024-04-10',
          last_login: '2024-09-15',
          permissions: ['products', 'producers'],
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteUser = (user: AdminUser) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      setAdminUsers(adminUsers.filter(u => u.id !== selectedUser.id));
      setIsDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  const handleFormSubmit = (userData: Partial<AdminUser>) => {
    if (selectedUser) {
      // Update existing user
      setAdminUsers(adminUsers.map(u =>
        u.id === selectedUser.id
          ? { ...u, ...userData }
          : u
      ));
    } else {
      // Add new user
      const newUser: AdminUser = {
        id: `admin-${Date.now()}`,
        created_at: new Date().toISOString().split('T')[0],
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'ADMIN',
        status: userData.status || 'active',
        permissions: userData.permissions || [],
      };
      setAdminUsers([...adminUsers, newUser]);
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = adminUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'destructive';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return <Shield className="w-4 h-4" />;
      case 'ADMIN': return <UserCircle className="w-4 h-4" />;
      case 'MODERATOR': return <UserCircle className="w-4 h-4" />;
      default: return <UserCircle className="w-4 h-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Users Management</h1>
            <p className="text-slate-600">Manage your admin users and permissions</p>
          </div>
          <Button onClick={handleAddUser} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Admin User
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search admin users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-slate-600">Loading admin users...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {user.name}
                        </h3>
                        <p className="text-sm text-slate-600">{user.role}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(user.status) as "success" | "destructive" | "warning" | "default"}>
                      {user.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="h-4 w-4 mr-2 text-slate-400" />
                      {user.email}
                    </div>
                    <div className="text-sm text-slate-500">
                      Created: {user.created_at}
                    </div>
                    {user.last_login && (
                      <div className="text-sm text-slate-500">
                        Last login: {user.last_login}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditUser(user)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AdminUserFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          user={selectedUser}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Admin User"
          message={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}