'use client';

import styles from '@/styles/pagelayout.module.css';
import NavBar from '../NavBar';
import RightAside from '../RightAside';
import ProfileProvider from '../providers/ProfileProvider';

export default function UserPage({ userId }) {
    return (
    <div className={styles.main}>
      <NavBar />
      <ProfileProvider userId={userId} />
      <RightAside />
    </div>
  )
}
