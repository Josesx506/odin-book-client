import LandingPage from "@/components/LandingPage";
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading landing page...</div>}>
      <LandingPage />
    </Suspense>
  );
}
