'use client';

import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Better Auth doesn't require a Provider wrapper
  // The authClient is already configured globally
  return <>{children}</>;
}

