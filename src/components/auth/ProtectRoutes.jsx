'use client'

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GridLoader } from 'react-spinners';

export default function ProtectRoutes({ children, loader }) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !accessToken) {
      router.push('/signin');
    }
  }, [accessToken, loading]);

  const loaderStyle = {
    display: 'flex', 
    justifyContent:'center', 
    alignItems:'center',
    height: '100vh',
    width: '100%'
  }

  if (loading) {
    return loader || <div style={loaderStyle}><GridLoader /></div>;
  }

  if (!accessToken) {
    return null;
  }


  return children
}