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
  last_login: string;
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
          email: 'admin@example.com',
          role: 'SUPER_ADMIN',
          status: 'active',
          created_at: '2024-08-01',
          last_login: '2024-10-27',
          permissions: ['all'],
        },
        {
          id: '2',
          name: 'John Smith',
          email: 'john.smith@company.com',
          role: 'ADMIN',
          status: 'active',
          created_at: '2024-09-15',
          last_login: '2024-10-26',
          permissions: ['products', 'customers', 'producers'],
        },
        {
          id: '3',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          role: 'MODERATOR',
          status: 'active',
          created_at: '2024-09-20',
          last_login: '2024-10-25',
          permissions: ['products', 'customers'],
        },
        {
          id: '4',
          name: 'Mike Wilson',
          email: 'mike.wilson@company.com',
          role: 'ADMIN',
          status: 'inactive',
          created_at: '2024-08-30',
          last_login: '2024-10-15',
          permissions: ['products', 'producers'],
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteUser = (user: AdminUser) => {
    if (user.role === 'SUPER_ADMIN') {
      alert('Cannot delete Super Admin!');
      return;
    }
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

  const handleFormSubmit = (userData: any) => {
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
        ...userData,
        id: `admin-${Date.now()}`,
        created_at: new Date().toISOString().split('T')[0],
        last_login: 'Never',
        permissions: userData.role === 'SUPER_ADMIN' ? ['all'] : ['read', 'write'],
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'destructive';
      case 'ADMIN': return 'warning';
      case 'MODERATOR': return 'info';
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
          <div className="grid gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        {getRoleIcon(user.role)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {user.name}
                          </h3>
                          <Badge variant={getStatusColor(user.status) as any}>
                            {user.status}
                          </Badge>
                          <Badge variant={getRoleColor(user.role) as any}>
                            {user.role}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-slate-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-slate-500">Permissions:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {user.permissions.map((permission) => (
                                <Badge key={permission} variant="outline" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm">
                            <div>
                              <span className="text-slate-500">Created:</span>
                              <span className="ml-1 font-medium">{user.created_at}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Last Login:</span>
                              <span className="ml-1 font-medium">{user.last_login}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-700"
                        disabled={user.role === 'SUPER_ADMIN'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <UserCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No admin users found</h3>
              <p className="text-slate-600">
                {searchQuery ? 'Try adjusting your search criteria' : 'No admin users registered yet'}
              </p>
            </CardContent>
          </Card>
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
