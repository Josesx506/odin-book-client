import LogoutButton from '@/components/buttons/LogoutButton';
import ModalCntr from "@/components/forms/ModalCntr";
import NewPost from '@/components/forms/NewPost';
import useAuth from '@/hooks/useAuth';
import useBreakpoint from "@/hooks/useBreakpoint";
import { usePostStore } from '@/store/usePostStore';
import styles from '@/styles/navbar.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdHomeFilled, MdLogout, MdOutlineEmail, MdOutlinePerson, MdOutlineSearch } from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa6";
import { Button } from './Buttons';
import Logo from './Logo';

export default function NavBar() {
  const [openModal, setOpenModal] = useState(false);
  const { userDetails, logout } = useAuth();
  const { posts, setPosts, setScrollY } = usePostStore();
  const router = useRouter();

  const isTablet = useBreakpoint('md');
  const pathname = usePathname();

  const profileRoute = `/${userDetails.id}`;

  const onSignout = async () => {
    await logout();
  }

  function toggleModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpenModal(!openModal);
  }

  function handlePostUpload(newPost) {
    setPosts([newPost, ...posts]);
    setOpenModal(false);
    setScrollY(0);
    router.push('/home#newpost')
  }

  return (
    <>
      {isTablet ?
        <div className={styles.navbar}>
          <Logo />
          <div className={styles.linkCntr}>
            <Link className={`${styles.navLink} ${pathname === '/home' ? styles.active : ''}`} href={'/home'}>
              <MdHomeFilled /> <span>Home</span>
            </Link>
            <Link className={`${styles.navLink} ${pathname === '/explore' ? styles.active : ''}`} href={'/explore'}>
              <MdOutlineSearch /> <span>Explore</span>
            </Link>
            <Link className={`${styles.navLink} ${pathname === profileRoute ? styles.active : ''}`} href={profileRoute}>
              <MdOutlinePerson /> <span>Profile</span></Link>
            <Link className={`${styles.navLink} ${pathname === '/messages' ? styles.active : ''}`} href={'/messages'}>
              <MdOutlineEmail /> <span>Messages</span>
            </Link>
            <Link className={`${styles.navLink} ${pathname === '/marketplace' ? styles.active : ''}`} href={'/marketplace'}>
              <FaPeopleArrows /> <span>Marketplace</span>
            </Link>
            <Button onClick={toggleModal} style={{ fontWeight: 'bold', borderRadius: '2em', padding: '0.5em 3em' }}>Post</Button>
            <ModalCntr onClose={toggleModal} open={openModal} >
              <div style={{width: 'min(85vw, 600px)'}}>
                <NewPost onPostUpload={handlePostUpload} />
              </div>
            </ModalCntr>
          </div>
          <LogoutButton />
        </div> :
        <div className={styles.mobileNav}>
          <Link className={`${styles.mobNavLink} ${pathname === '/home' ? styles.active : ''}`} href={'/home'}>
            <MdHomeFilled />
          </Link>
          <Link className={`${styles.mobNavLink} ${pathname === '/explore' ? styles.active : ''}`} href={'/explore'}>
            <MdOutlineSearch />
          </Link>
          <Link className={`${styles.mobNavLink} ${pathname === profileRoute ? styles.active : ''}`} href={profileRoute}>
            <MdOutlinePerson />
          </Link>
          <Link className={`${styles.mobNavLink} ${pathname === '/messages' ? styles.active : ''}`} href={'#'}>
            <MdOutlineEmail />
          </Link>
          <Link className={styles.mobNavLink} href={'#'} onClick={onSignout}>
            <MdLogout />
          </Link>
        </div>
      }
    </>
  )
}
