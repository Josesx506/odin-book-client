import styles from '@/styles/forms/modal.module.css';
import { IoClose } from "react-icons/io5";

export default function ModalCntr({ children, onClose, open = false }) {

  return (
    <dialog className={styles.modal} open={open}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader} >
          <IoClose onClick={() => {onClose()}} color='red' />
        </div>
        {children}
      </div>
    </dialog>
  )
}