import ProtectRoutes from '@/components/auth/ProtectRoutes';
import ExplorePage from '@/components/pages/ExplorePage';

export default async function page({ searchParams }) {
  const search = await searchParams;
  const filter = search?.filter;
  return (
    <ProtectRoutes>
      <ExplorePage filter={filter} />
    </ProtectRoutes>
  )
}
