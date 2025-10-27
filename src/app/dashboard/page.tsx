'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');

    if (isAuthenticated === 'true' && userRole) {
      // Redirect based on user role
      switch (userRole) {
        case 'PRODUCER':
          router.push('/dashboard/producer');
          break;
        case 'ADMIN':
          router.push('/dashboard/admin');
          break;
        default:
          router.push('/dashboard/buyer');
      }
    } else {
      // Redirect to sign-in if not authenticated
      router.push('/auth/signin');
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return null;
}

