'use client';

import styles from '@/styles/pagelayout.module.css';
import NavBar from '../NavBar';
import RightAside from '../RightAside';
import FollowingScroller from '@/components/scrollers/FollowingScroller';

export default function FollowingPage({ userId }) {

  return (
    <div className={styles.main}>
      <NavBar />
      <FollowingScroller userId={userId} />
      <RightAside />
    </div>
  )
}