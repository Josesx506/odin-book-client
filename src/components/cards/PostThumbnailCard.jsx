'use client';

import { PostThumbnailInteraction } from '@/components/cards/Interactions';
import styles from '@/styles/cards/psthbnl.module.css'
import { formatDate } from '@/utils/common';
import Image from 'next/image';
import Link from 'next/link';
import { BsDot } from "react-icons/bs";
import { useEffect, useState, useRef } from 'react';

export default function PostThumbnailCard({ post }) {
  const [showToggle, setShowToggle] = useState(false);
  const postBodyRef = useRef(null);

  function onClick(e) {
    // Preventy the link from triggering
    e.stopPropagation();
  }

  useEffect(() => {
    if (!postBodyRef.current) return;
    const el = postBodyRef.current;
    const shouldShowToggle = el.scrollHeight > el.clientHeight;
    setShowToggle(shouldShowToggle);
  }, [post.body]);

  return (
    <div className={styles.mainCntr}>
      <div className={styles.thmbnlCntr}>
        <Link href={`/${post.authorId}`} className={styles.authorAvatar}>
          <Image src={post.author.gravatar || `https://robohash.org/${post.authorId}.png`}
            width={40} height={40} alt={`${post.author.username} profile photo`} />
        </Link>
        <div className={styles.postBody}>
          <div className={styles.thmbnlTitle}>
            <Link href={`/${post.authorId}`} className={styles.fullname}>{post.author.fullname}</Link>
            <Link href={`/${post.authorId}`} className={styles.username}>@{post.author.username.toLowerCase()}</Link>
            <div className={styles.postedAt}><BsDot /><span>{formatDate(post.updatedAt)}</span></div>
          </div>
          <Link href={`/feed/${post.id}`}>
            <div ref={postBodyRef} className={styles.postBodyText}>{post.body}</div>
            {(post.body && showToggle) && <input onClick={onClick} className={styles.expandText} type='checkbox' />}
            {post.postimg &&
              <div className={styles.thmbnlPostImage}>
                <img src={post.postimg}></img>
              </div>}
          </Link>
          <PostThumbnailInteraction postId={post.id} likes={post.likes}
            comments={post.comments} views={post.views} />
        </div>
      </div>
    </div>
  )
}
