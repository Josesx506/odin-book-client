import ProtectRoutes from '@/components/auth/ProtectRoutes';
import UserPage from '@/components/pages/UserPage';

export default async function page({ params }) {
  const { userId } = await params;
  return (
    <ProtectRoutes>
      <UserPage userId={userId}/>
    </ProtectRoutes>
  )
}
