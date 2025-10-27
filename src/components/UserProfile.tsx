'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { demoAuth } from '@/lib/demo-auth';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';

export function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');

    if (isAuthenticated === 'true' && userName && userEmail && userRole) {
      setUser({
        name: userName,
        email: userEmail,
        role: userRole,
      });
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-4">
          <p>Please sign in to view your profile.</p>
        </CardContent>
      </Card>
    );
  }

  const handleSignOut = () => {
    demoAuth.signOut();
    router.push('/');
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">User Profile</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        <Button 
          onClick={handleSignOut}
          variant="outline"
          className="w-full"
        >
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}

