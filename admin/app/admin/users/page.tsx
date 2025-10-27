"use client";

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, UserCircle, Mail, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AdminUserFormDialog } from '@/components/admin/AdminUserFormDialog';
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';

type AdminUser = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
  created_at: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const handleEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDelete = (user: AdminUser) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('id', selectedUser.id);

    if (!error) {
      loadUsers();
      setIsDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  const handleFormSuccess = () => {
    loadUsers();
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'moderator':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Users</h1>
            <p className="text-slate-600">Manage admin user accounts and permissions</p>
          </div>
          <Button
            onClick={() => {
              setSelectedUser(null);
              setIsFormOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Admin User
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search admin users by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
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
        ) : filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <UserCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No admin users found</h3>
              <p className="text-slate-600 mb-6">Get started by adding your first admin user</p>
              <Button
                onClick={() => {
                  setSelectedUser(null);
                  setIsFormOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Admin User
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <UserCircle className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {user.full_name}
                        </h3>
                        <p className={`text-xs font-medium ${getRoleColor(user.role)} px-2 py-1 rounded-full inline-block mt-1`}>
                          {user.role.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-slate-400" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-slate-400" />
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500">
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AdminUserFormDialog
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedUser(null);
          }}
          onSuccess={handleFormSuccess}
          user={selectedUser}
        />

        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedUser(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Admin User"
          description={`Are you sure you want to delete "${selectedUser?.full_name}"? This action cannot be undone.`}
        />
      </div>
    </AdminLayout>
  );
}
