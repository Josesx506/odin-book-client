import { Button } from "@/components/Buttons";
import UserPageNavCard from "@/components/cards/UserPageNavCard";
import useAuth from "@/hooks/useAuth";
import styles from '@/styles/cards/usrpgdtls.module.css';
import { formatDate } from "@/utils/common";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import ModalCntr from "@/components/forms/ModalCntr";
import EditProfile from "@/components/forms/EditProfile";

export default function UserPageDetailsCard({
  id, fullname, username, gravatar, bio, createdAt, numFollowers, numFollowing, numPosts
}) {
  const [openModal, setOpenModal] = useState(false);
  const { userDetails } = useAuth();
  const canEdit = userDetails.id == id;

  const title = fullname;
  const subtitle = `${numPosts} post${numPosts===1 ? '' : 's'}`
  const btnStyle = { padding: '0.25em 0.7em', borderRadius: '1em', marginLeft: 'auto' };

  function toggleModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setOpenModal(!openModal);
  }

  return (
    <div className={styles.prfDtlsCntr}>
      <UserPageNavCard title={title} subtitle={subtitle} />
      <div className={styles.bkgrdImg}></div>
      <div>
        <div className={styles.prfImgHldr}>
          <div className={styles.prfImgCntr}>
            <Image src={gravatar || `https://robohash.org/${id}.png`}
              width={120} height={120} alt={`${username} profile photo`} />
          </div>
        </div>
        <div className={styles.prfSummary}>
          <div className={styles.prfEditbtn}>
            {canEdit && <Button onClick={toggleModal} style={btnStyle} variant={'outline'}>Edit Profile</Button>}
          </div>
          <div className={styles.names}>
            <h3>{fullname}</h3>
            <div>@{username}</div>
          </div>
          <div>{bio || "This user hasn't set a bio yet!!!"}</div>
          <div className={styles.locationTimeline}>
            <div><IoLocationOutline /> OdinLand</div>
            <div><FaRegCalendarAlt /> Joined {formatDate(createdAt)}</div>
          </div>
          <div className={styles.friends}>
            <Link href={`/${id}/following`}><span>{numFollowing}</span> Following</Link>
            <Link href={`/${id}/followers`}><span>{numFollowers}</span> Followers</Link>
          </div>
        </div>
      </div>
      <ModalCntr onClose={toggleModal} open={openModal} >
        <EditProfile userId={id} onClose={toggleModal} />
      </ModalCntr>
    </div>
  )
}
