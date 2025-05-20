import SearchBar from "@/components/forms/SearchBar";
import useBreakpoint from "@/hooks/useBreakpoint";
import styles from '@/styles/rightaside.module.css';
import Link from "next/link";
import WhoToFollow from "./cards/WhoToFollow";

export default function RightAside() {
  const isDesktop = useBreakpoint('lg');

  return (
    <>
      {isDesktop &&
        <div className={styles.rightAside}>
          <SearchBar />
          <WhoToFollow />
          <div className={styles.footer}>
            <div className={styles.contactDetails}>
              <div><b>Contact Me:</b></div>
              <Link target="blank" href={'https://www.linkedin.com/in/joses-williams-299484100/'}>LinkedIn</Link>
              <span>|</span>
              <Link target="blank" href={'https://github.com/Josesx506/'}>GitHub</Link>
              <span>|</span>
              <Link target="blank" href={'https://x.com/sui_generis_wj/'}>X</Link>
              <span>|</span>
            </div>
            <em>&copy; Copyright {new Date().getFullYear()} J Corp.</em>
          </div>
        </div>}
    </>
  )
}
