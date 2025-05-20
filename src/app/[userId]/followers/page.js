import ProtectRoutes from '@/components/auth/ProtectRoutes';
import FollowersPage from '@/components/pages/FollowersPage';

export default async function page({ params }) {
  const { userId } = await params;
  return (
    <ProtectRoutes>
      <FollowersPage userId={userId}/>
    </ProtectRoutes>
  )
}
