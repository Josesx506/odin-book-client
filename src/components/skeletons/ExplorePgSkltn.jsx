import styles from '@/components/skeletons/skl.module.css';
import { UserWithBioSkeleton } from "./CardSkeletons";

export default function ExplorePgSkltn({ count=4 }) {
  
  return (
    <div className={styles.mainSkl}>
      {Array(count).fill(null).map((item, index) => {
          return <UserWithBioSkeleton key={index} />
      })}
    </div>
  )
}
