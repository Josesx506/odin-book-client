import AuthorCard from '@/components/cards/AuthorCard';
import { PostThumbnailInteraction } from '@/components/cards/Interactions';
import { formatDateTime } from '@/utils/common';
import styles from '@/styles/cards/pstdtls.module.css';

export default function PostDetailCard({ postAuthor, post }) {
  if (!post || !postAuthor) {
    return null;
  }

  return (
    <div className={styles.postCntr}>
      <AuthorCard {...postAuthor} />

      <div className={styles.postbody}>{post.body}</div>

      {post.postimg &&
        <div className={styles.postimage}>
          <img src={post.postimg} alt={`post ${post.id} image`} />
        </div>
      }

      <div className={styles.postFooter}>
        {formatDateTime(post.createdAt)} · <span>{post.postViews}</span> Views
      </div>

      <div className={styles.line}></div>
      <PostThumbnailInteraction postId={post.id} likes={post.postLikes}
        comments={post.numComments} views={post.postViews} />
      <div className={styles.line}></div>
    </div>
  )
}
