import styles from '@/components/skeletons/skl.module.css';
import useBreakpoint from "@/hooks/useBreakpoint";
import {
  PostThumbnailImageSkeleton,
  PostThumbnailTextSkeleton,
  ProfileDetailsSkeleton
} from "./CardSkeletons";

export default function ProfilePgSkltn() {
  const lineStyle = {
    borderBottom: '0.5px solid darkgray',
    width: '96%',
    margin: '0 auto',
  }
  const isTablet = useBreakpoint('md');

  return (
    <div className={styles.mainSkl}>
      <ProfileDetailsSkeleton />
      <div style={{ ...lineStyle, width: '100%' }}></div>
      <PostThumbnailTextSkeleton />
      {isTablet && <>
        <div style={{ ...lineStyle, width: '100%' }}></div>
        <PostThumbnailImageSkeleton />
      </>}
    </div>
  )
}
