import styles from '@/components/skeletons/skl.module.css';
import {
  InputSkeleton,
  PostThumbnailImageSkeleton,
  PostThumbnailTextSkeleton
} from "./CardSkeletons";

export default function HomePgSkltn() {
  const lineStyle = {
    borderBottom: '0.5px solid darkgray',
    width: '96%',
    margin: '0 auto',
  }
  return (
    <div className={styles.mainSkl}>
      <InputSkeleton />
      <div style={{...lineStyle, width:'100%'}}></div>
      <PostThumbnailTextSkeleton />
      <div style={{...lineStyle, width:'100%'}}></div>
      <PostThumbnailImageSkeleton />
    </div>
  )
}
