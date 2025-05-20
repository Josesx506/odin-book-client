import useAuth from '@/hooks/useAuth';
import styles from '@/styles/genericscroller.module.css';
import { useRouter } from 'next/navigation';
import { IoWarningOutline } from "react-icons/io5";
import { Button } from '../Buttons';

export default function Marketplace() {
  const { logout } = useAuth();
  const router = useRouter();

  const innerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: '1em',
    padding: '1em'
  }

  async function onClick() {
    await logout();
    router.push('https://odin-shopping-cart-xi.vercel.app/')
  }

  return (
    <div className={styles.scrollbarMain}>
      <div style={innerStyle}>
        <div>
          <img src='https://cdn.dribbble.com/userupload/22529430/file/original-98ddcecad6362f1569e84e5d8f232f79.gif' 
          alt='marketplace animation' style={{objectFit:'contain', maxWidth:'100%'}} />
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'0.5em'}}>
          <IoWarningOutline color='red' /> 
          <span style={{textAlign:'center'}}>This link will take you to an external site and log you out</span>
        </div>
        <Button onClick={onClick} >Marketplace App</Button>
      </div>
    </div>
  )
}
