import TextArea from '@/components/forms/TextArea';
import useAuth from '@/hooks/useAuth';
import styles from '@/styles/forms/newpost.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function NewPost({ onPostUpload, maxLength = 400 }) {
  const { userDetails } = useAuth();

  return (
    <div className={styles.postCntr}>
      <Link href={`/${userDetails.id}`} className={styles.avatarCntr}>
        <Image src={userDetails.gravatar || `https://robohash.org/${userDetails.id}.png`}
          width={40} height={40} alt={`${userDetails.username} profile photo`} priority />
      </Link>
      <TextArea name='newpost' placeholder="What's happening?" handleInsert={onPostUpload}
        maxLength={maxLength} btnText={'Post'} submitTo='/v1/social/posts/new' />
    </div>
  )
}
