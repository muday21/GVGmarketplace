'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, AlertCircle, Mail, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import Link from 'next/link';

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const email = searchParams.get('email');
      const statusParam = searchParams.get('status');
      const reasonParam = searchParams.get('reason');

      setUserEmail(email || '');

      if (statusParam) {
        if (statusParam === 'success') {
          setVerificationStatus('success');
          setMessage('Your email has been successfully verified! You can now sign in to your account.');
        } else {
          setVerificationStatus('error');

          if (reasonParam === 'missing-token') {
            setMessage('Email verification failed because the verification link was missing required information. Please request a new verification email.');
          } else if (reasonParam === 'invalid-token') {
            setMessage('Email verification failed. The link may be invalid or expired. Please request a new verification email.');
          } else if (reasonParam === 'server-error') {
            setMessage('We encountered a server issue while verifying your email. Please try again.');
          } else {
            setMessage('Email verification failed. Please try again.');
          }
        }
        return;
      }

      // Better Auth handles verification automatically when the user clicks the email link
      // If we're on this page without a status parameter, attempt to determine verification from the session
      try {
        const response = await fetch('/api/auth/get-session');
        const sessionData = await response.json();

        if (sessionData && sessionData.user && sessionData.user.emailVerified) {
          setVerificationStatus('success');
          setMessage('Your email has been successfully verified! You can now sign in to your account.');

          // Persist session role for pages/components that still read from localStorage
          try {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userRole', sessionData.user.role || 'BUYER');
            if (sessionData.user.email) {
              localStorage.setItem('userEmail', sessionData.user.email);
            }
          } catch (storageError) {
            console.warn('Failed to store verification session details.', storageError);
          }

          // Redirect to appropriate dashboard based on user role
          setTimeout(() => {
            const userRole = sessionData.user.role;
            if (userRole === 'ADMIN') {
              router.push('/dashboard/admin');
            } else if (userRole === 'PRODUCER') {
              router.push('/dashboard/producer');
            } else {
              router.push('/dashboard/buyer');
            }
          }, 3000);
        } else {
          // If not verified, show error
          setVerificationStatus('error');
          setMessage('Email verification failed. The link may be invalid or expired.');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage('An error occurred while checking verification status. Please try again.');
        console.error('Verification check error:', error);
      }
    };

    checkVerificationStatus();
  }, [searchParams, router]);

  const resendVerificationEmail = async () => {
    if (!userEmail) return;

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        alert('Verification email has been resent. Please check your inbox.');
      } else {
        alert('Failed to resend verification email. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('Resend error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="text-center">
          <Mail className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Email Verification</h1>
          <p className="text-slate-600">Please verify your email address</p>
        </div>

        <Card className="w-full">
          <CardContent className="p-6">
            {verificationStatus === 'loading' && (
              <div className="text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 text-emerald-600 animate-spin" />
                <h2 className="text-xl font-semibold text-slate-900 mb-2">Verifying Your Email</h2>
                <p className="text-slate-600">Please wait while we verify your email address...</p>
              </div>
            )}

            {verificationStatus === 'success' && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                <h2 className="text-2xl font-bold text-green-900 mb-2">Email Verified!</h2>
                <p className="text-green-700 mb-4">{message}</p>
                <p className="text-sm text-slate-600">You will be redirected to the sign-in page in a few seconds...</p>
                <div className="mt-4 space-y-2">
                  <Link href="/auth/signin">
                    <Button className="w-full">Go to Sign In</Button>
                  </Link>
                </div>
              </div>
            )}

            {verificationStatus === 'error' && (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
                <h2 className="text-2xl font-bold text-red-900 mb-2">Verification Failed</h2>
                <p className="text-red-700 mb-4">{message}</p>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resendVerificationEmail}
                    disabled={!userEmail}
                  >
                    Resend Verification Email
                  </Button>
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full">Back to Sign Up</Button>
                  </Link>
                </div>
              </div>
            )}

            {verificationStatus === 'expired' && (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-orange-600" />
                <h2 className="text-2xl font-bold text-orange-900 mb-2">Link Expired</h2>
                <p className="text-orange-700 mb-4">
                  The verification link has expired. Please request a new verification email.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resendVerificationEmail}
                    disabled={!userEmail}
                  >
                    Send New Verification Email
                  </Button>
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full">Back to Sign Up</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-emerald-900 mb-2">📧 Check Your Email</h3>
            <p className="text-sm text-emerald-800">
              We've sent a verification link to your email address. Click the link in the email to complete your registration.
            </p>
            <p className="text-sm text-emerald-800 mt-2">
              <strong>Note:</strong> The verification link will expire in 24 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

