import styles from '@/styles/buttons/cmtbtn.module.css';
import { FaRegComment } from "react-icons/fa";
import Link from 'next/link';

export default function CommentButton({ postId, comments }) {
  return (
    <Link href={`/feed/${postId}`} className={styles.cmpStyle} >
      <FaRegComment /> <span>{comments}</span>
    </Link>
  )
}
