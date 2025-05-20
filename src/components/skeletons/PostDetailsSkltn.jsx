import styles from '@/components/skeletons/skl.module.css';
import {
  BackNavSkeleton,
  CommentSkeleton,
  InputSkeleton,
  InteractionSkeleton,
  PostDetailsSkeleton
} from "./CardSkeletons";

export default function PostDetailsSkltn() {
  const lineStyle = {
    borderBottom: '0.5px solid darkgray',
    width: '96%',
    margin: '0 auto',
  }
  return (
    <div className={styles.mainSkl}>
      <BackNavSkeleton />
      <PostDetailsSkeleton />
      <div style={lineStyle}></div>
      <InteractionSkeleton />
      <div style={lineStyle}></div>
      <InputSkeleton />
      <div style={{...lineStyle, width:'100%'}}></div>
      <CommentSkeleton />
    </div>
  )
}
