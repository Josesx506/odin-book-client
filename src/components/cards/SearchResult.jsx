import React from 'react';
import styles from '@/styles/cards/searchresult.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchResult({ data }) {
  return (
    data?.type === 'post' ?
      <div className={`${styles.result} ${styles.post}`}>
        <Link href={`/feed/${data.id}`}>
          <span># Post</span>
          <div>{data.body}</div>
        </Link>
      </div> :
      <div className={`${styles.result} ${styles.user}`}>
        <Link href={`/${data.id}`}>
        <div className={styles.userAvatar}>
          <Image src={data.gravatar} width={40} height={40} alt={`user ${data.id} ${data.fullname} avatar`} />
        </div>
        <div className={styles.userBody}>
          <div className={styles.fullname}>{data.fullname}</div>
          <div>@{data.username}</div>
        </div>
        </Link>
      </div>
  )
}
