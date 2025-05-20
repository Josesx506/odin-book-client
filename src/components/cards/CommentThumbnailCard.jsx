import styles from '@/styles/cards/psthbnl.module.css';
import { formatDate } from '@/utils/common';
import Image from 'next/image';
import Link from 'next/link';
import { BsDot } from "react-icons/bs";
import LikeButton from '../buttons/LikeButton';

export default function CommentThumbnailCard({ comment }) {
  return (
    <div className={styles.mainCntr}>
      <div className={styles.thmbnlCntr}>
        <Link href={`/${comment.author.id}`} className={styles.authorAvatar}>
          <Image src={comment.author.gravatar || `https://robohash.org/${comment.author.id}.png`}
            width={40} height={40} alt={`${comment.author.username} profile photo`} />
        </Link>
        <div className={styles.postBody}>
          <div className={styles.thmbnlTitle}>
            <LikeButton postId={comment.postId} commentId={comment.id} value={comment.likes} />
            <Link href={`/${comment.author.id}`} className={styles.fullname}>{comment.author.fullname}</Link>
            <Link href={`/${comment.author.id}`} className={styles.username}>@{comment.author.username.toLowerCase()}</Link>
            <div className={styles.postedAt}><BsDot /><span>{formatDate(comment.createdAt)}</span></div>
          </div>
          <div>{comment.body}</div>
          {comment.commentimg &&
            <div className={styles.thmbnlPostImage}>
              <img src={comment.commentimg}></img>
            </div>}
        </div>
      </div>
    </div>
  )
}
