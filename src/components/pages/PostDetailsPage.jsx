'use client';

import styles from '@/styles/pagelayout.module.css';
import NavBar from '../NavBar';
import RightAside from '../RightAside';
import PostProvider from '../providers/PostProvider';

export default function PostDetailsPage({ postId }) {

  return (
    <div className={styles.main}>
      <NavBar />
      <PostProvider postId={postId} />
      <RightAside />
    </div>
  )
}