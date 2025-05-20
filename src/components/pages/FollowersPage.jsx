'use client';

import styles from '@/styles/pagelayout.module.css';
import NavBar from '../NavBar';
import RightAside from '../RightAside';
import FollowersScroller from '@/components/scrollers/FollowersScroller';

export default function FollowersPage({ userId }) {

  return (
    <div className={styles.main}>
      <NavBar />
      <FollowersScroller userId={userId} />
      <RightAside />
    </div>
  )
}