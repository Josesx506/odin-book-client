import styles from '@/styles/buttons/cmtbtn.module.css';
import { GiHistogram } from "react-icons/gi";

export default function ViewsButton({ views }) {
  return (
    <div className={styles.cmpStyle} >
      <GiHistogram /> <span>{views}</span>
    </div>
  )
}
