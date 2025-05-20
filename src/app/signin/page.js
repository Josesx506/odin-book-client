import SignIn from '@/components/auth/SignIn';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<div>Loading signin page...</div>}>
      <SignIn />
    </Suspense>
  )
}
