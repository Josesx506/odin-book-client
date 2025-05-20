'use client';

import styles from '@/styles/pagelayout.module.css';
import NavBar from '../NavBar';
import RightAside from '../RightAside';
import PostThumbnailScroller from '../scrollers/PostThumbnailScroller';

export default function HomePage() {

  return (
    <div className={styles.main}>
      <NavBar />
      <PostThumbnailScroller />
      <RightAside />
    </div>
  )
}
