'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Mail, Lock } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { demoAuth } from '../../../lib/demo-auth';

export default function SignIn() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await demoAuth.signIn(email, password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        alert(result.error);
      }
    } catch (_error) {
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Demo Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">🎯 Demo Login Info</h3>
            <p className="text-sm text-blue-800 mb-2">Use any email with these keywords to test different roles:</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>producer@example.com</strong> → Producer Dashboard</li>
              <li>• <strong>admin@example.com</strong> → Admin Dashboard</li>
              <li>• <strong>buyer@example.com</strong> → Buyer Dashboard</li>
            </ul>
            <p className="text-xs text-blue-600 mt-2">Password: Any password works (demo mode)</p>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <h2 className="text-2xl font-bold text-slate-900">{t('auth.signin')}</h2>
            <p className="text-slate-600 mt-1">Welcome back to {t('app.name')}</p>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
              <Mail className="absolute left-3 top-9 w-5 h-5 text-slate-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
              <Lock className="absolute left-3 top-9 w-5 h-5 text-slate-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
                {t('auth.forgotPassword')}
              </Link>
            </div>
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              {t('auth.signin')}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            {t('auth.noAccount')}{' '}
            <Link href="/auth/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
              {t('auth.signup')}
            </Link>
          </p>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}

