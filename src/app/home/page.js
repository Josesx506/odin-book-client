
import ProtectRoutes from '@/components/auth/ProtectRoutes';
import HomePage from '@/components/pages/HomePage';

export default async function page() {

  return (
    <ProtectRoutes>
      <HomePage />
    </ProtectRoutes>
  )
}
