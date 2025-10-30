'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { signUp } from '../../../lib/auth';

export default function SignUp() {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'BUYER',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      
      if (error) {
        alert("Signup failed. Please try again.");
        return;
      }
      
      if (data) {
        // Persist the selected role since Better Auth defaults to BUYER
        await fetch('/api/users/update-role', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            role: formData.role,
          })
        });

        // Show success message and redirect to verification page
        alert("Account created successfully! Please check your email to verify your account before signing in.");
        router.push('/auth/verify-email?email=' + encodeURIComponent(formData.email));
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-slate-900">{t('auth.signup')}</h2>
          <p className="text-slate-600 mt-1">Create your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">{t('auth.name')}</label>
              <UserIcon className="absolute left-3 top-9 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
              <Mail className="absolute left-3 top-9 w-5 h-5 text-slate-400" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
            <Select
              label={t('auth.role')}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { value: 'BUYER', label: t('auth.buyer') },
                { value: 'PRODUCER', label: t('auth.producer') },
                { value: 'ADMIN', label: 'Administrator' },
              ]}
              required
            />
            <div className="relative">
              <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
              <Lock className="absolute left-3 top-9 w-5 h-5 text-slate-400" />
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2">{t('auth.confirmPassword')}</label>
              <Lock className="absolute left-3 top-9 w-5 h-5 text-slate-400" />
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-10"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              {t('auth.signup')}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            {t('auth.hasAccount')}{' '}
            <Link href="/auth/signin" className="text-emerald-600 hover:text-emerald-700 font-medium">
              {t('auth.signin')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

