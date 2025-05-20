import styles from '@/components/skeletons/skl.module.css';
import { BackNavSkeleton, UserWithBioSkeleton } from "./CardSkeletons";

export default function FollowPgSkltn({ count=4 }) {
  const lineStyle = {
    borderBottom: '1px solid darkgray',
    width: '100%',
    margin: '0 auto',
  }
  
  return (
    <div className={styles.mainSkl}>
      <BackNavSkeleton />
      <div style={lineStyle}></div>
      {Array(count).fill(null).map((item, index) => {
          return <UserWithBioSkeleton key={index} />
      })}
    </div>
  )
}
