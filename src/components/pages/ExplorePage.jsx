'use client';

import styles from '@/styles/pagelayout.module.css';
import NavBar from '../NavBar';
import RightAside from '../RightAside';
import ExtUserThumbnailScroller from '../scrollers/ExtUserThumbnailScroller';

export default function ExplorePage({ filter }) {

  return (
    <div className={styles.main}>
      <NavBar />
      <ExtUserThumbnailScroller key={filter||'mixed'} filter={filter} />
      <RightAside />
    </div>
  )
}