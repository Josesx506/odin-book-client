'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

export default function ProtectRoutes({ children, loader }) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !accessToken) {
      router.push('/signin');
    }
  }, [accessToken, loading]);

  if (loading) {
    return loader || <div>Loading...</div>;
  }

  if (!accessToken) {
    return null;
  }


  return children
}