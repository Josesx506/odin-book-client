import ProtectRoutes from '@/components/auth/ProtectRoutes';
import PostDetailsPage from '@/components/pages/PostDetailsPage';

export default async function page({ params }) {
  const { postId } = await params;
  return (
    <ProtectRoutes>
      <PostDetailsPage postId={postId} />
    </ProtectRoutes>
  )
}
