'use client';

import styles from '@/styles/pagelayout.module.css';
import NavBar from '../NavBar';
import RightAside from '../RightAside';
import Marketplace from '../dummy/Marketplace';

export default function MarketPage() {

  return (
    <div className={styles.main}>
      <NavBar />
      <Marketplace />
      <RightAside />
    </div>
  )
}