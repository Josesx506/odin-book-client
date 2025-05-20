import ProtectRoutes from '@/components/auth/ProtectRoutes';
import FollowingPage from '@/components/pages/FollowingPage';

export default async function page({ params }) {
  const { userId } = await params;
  return (
    <ProtectRoutes>
      <FollowingPage userId={userId}/>
    </ProtectRoutes>
  )
}
