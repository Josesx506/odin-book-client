import ProtectRoutes from '@/components/auth/ProtectRoutes';
import MessagesPage from '@/components/pages/MessagesPage';

export default async function page() {
  
  return (
    <ProtectRoutes>
      <MessagesPage />
    </ProtectRoutes>
  )
}