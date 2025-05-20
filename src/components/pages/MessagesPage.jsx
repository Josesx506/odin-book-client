'use client';

import styles from '@/styles/pagelayout.module.css';
import NavBar from '../NavBar';
import RightAside from '../RightAside';
import Messaging from '../dummy/Messaging';

export default function MessagesPage() {

  return (
    <div className={styles.main}>
      <NavBar />
      <Messaging />
      <RightAside />
    </div>
  )
}