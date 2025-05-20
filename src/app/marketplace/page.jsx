import ProtectRoutes from '@/components/auth/ProtectRoutes';
import MarketPage from '@/components/pages/MarketPage';

export default async function page() {
  
  return (
    <ProtectRoutes>
      <MarketPage />
    </ProtectRoutes>
  )
}