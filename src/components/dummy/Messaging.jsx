import useAuth from '@/hooks/useAuth';
import styles from '@/styles/genericscroller.module.css';
import { useRouter } from 'next/navigation';
import { IoWarningOutline } from "react-icons/io5";
import { Button } from '../Buttons';

export default function Messaging() {
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
    router.push('https://odin-msg-client.vercel.app/')
  }

  return (
    <div className={styles.scrollbarMain}>
      <div style={innerStyle}>
        <div>
          <img src='https://i.pinimg.com/originals/e3/1b/75/e31b752875679b64fce009922f9f0dda.gif' 
          alt='messaging animation' style={{objectFit:'contain', maxWidth:'100%'}} />
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'0.5em'}}>
          <IoWarningOutline color='red' /> 
          <span style={{textAlign:'center'}}>This link will take you to an external site and log you out</span>
        </div>
        <Button onClick={onClick} >Messaging App</Button>
      </div>
    </div>
  )
}
