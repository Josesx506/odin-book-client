'use client'

import { useRouter } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";
import styles from '@/styles/cards/usrpgnav.module.css';


export default function UserPageNavCard({ title, subtitle }) {
  const router = useRouter();
  return (
    <div className={styles.profileNav}>
      <IoArrowBack className={styles.backBtn} onClick={() => router.back()} />
      <div className={styles.navBody}>
        <h3>{title}</h3>
        <div>{subtitle}</div>
      </div>
    </div>
  )
}
