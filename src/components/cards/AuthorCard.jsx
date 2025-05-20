import Image from 'next/image';
import styles from '@/styles/cards/authorcard.module.css';
import Link from 'next/link';

export default function AuthorCard({id, fullname, username, gravatar}) {
  return (
    <div className={styles.acdtlsCntr}>
      <Link href={`/${id}`} className={styles.acdtlsImgCntr}>
        <Image src={gravatar || `https://robohash.org/${id}.png`} 
            width={40} height={40} alt={`${username} profile photo`} />
      </Link>
      <div className={styles.acdtlsNameCntr}>
        <Link href={`/${id}`}  className={styles.fullname}>{fullname}</Link>
        <div className={styles.username}>@{username}</div>
      </div>
    </div>
  )
}
