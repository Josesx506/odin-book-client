'use client';

import useAuth from "@/hooks/useAuth";
import styles from "@/styles/buttons/logout.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import { PiDotsThreeBold } from "react-icons/pi";

export default function LogoutButton() {
  const { userDetails, logout } = useAuth();
  const [visiblePopout, setVisiblePopout] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  const toggleLogoutPopup = () => {
    setVisiblePopout(!visiblePopout);
  };

  const handleLogout = () => {
    logout();
    setVisiblePopout(false); // Close the popup after logout
  };

  // Close the popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target) &&
        popupRef.current && !popupRef.current.contains(event.target)) {
        setVisiblePopout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef, popupRef]);

  return (
    <div className={styles.logoutMainCntr} ref={buttonRef}>
      <div className={styles.logoutCntr} onClick={toggleLogoutPopup}>
        <div className={styles.userAvatar}>
          <Image src={userDetails.gravatar || `https://robohash.org/${userDetails.id}.png`}
            width={40} height={40} alt={`${userDetails.username} profile photo`} priority />
        </div>
        <div className={styles.nameCntr}>
          <div className={styles.fullname}>{userDetails.fullname}</div>
          <div className={styles.username}>@{userDetails.username}</div>
        </div>
        <PiDotsThreeBold />
      </div>
      {visiblePopout && (
        <div className={styles.logoutPopup} ref={popupRef}>
          <div className={styles.logoutButton} onClick={handleLogout}>
            Log out @{userDetails?.username}
          </div>
        </div>
      )}
    </div>
  )
}
