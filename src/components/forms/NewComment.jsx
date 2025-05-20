import TextArea from '@/components/forms/TextArea';
import useAuth from '@/hooks/useAuth';
import styles from '@/styles/forms/newpost.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function NewComment({ postId, onCommentUpload, maxLength = 200 }) {
  const { userDetails } = useAuth();

  return (
    <div style={{paddingTop:'0.75em'}} className={styles.postCntr}>
      <Link href={`/${userDetails.id}`} className={styles.avatarCntr}>
        <Image src={userDetails.gravatar || `https://robohash.org/${userDetails.id}.png`}
          width={40} height={40} alt={`${userDetails.username} profile photo`} priority />
      </Link>
      <TextArea name='newcomment' placeholder="Post your reply" minRows={2} maxRows={4} handleInsert={onCommentUpload}
        maxLength={maxLength} btnText={'Reply'} submitTo={`/v1/social/posts/${postId}/new`} />
    </div>
  )
}
