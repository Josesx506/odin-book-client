import { FollowUserSkeleton } from "./CardSkeletons";

export default function WhoToFllwCrdSkltn({ count=5 }) {
  
  return (
    <div>
      {Array(count).fill(null).map((item, index) => {
          return <FollowUserSkeleton key={index} />
      })}
    </div>
  )
}
