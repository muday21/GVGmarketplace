'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to producer dashboard by default
    router.push('/dashboard/producer');
  }, [router]);

  return null;
}

