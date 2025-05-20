'use client';

import { axiosApi } from "@/config/axios";
import { uploadFileToSupabase } from "@/config/supabase";
import styles from '@/styles/forms/textarea.module.css';
import DOMPurify from 'dompurify';
import Form from 'next/form';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ImSpinner3 } from "react-icons/im";
import { IoIosSend } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import TextareaAutosize from 'react-textarea-autosize';

export default function TextArea({
  name = "",
  btnText = "Post",
  maxLength = 300,
  minRows = 3, maxRows = 6,
  submitTo = "",
  placeholder = "Type something...",
  handleInsert = ()=>{},
}) {
  const textInputRef = useRef();
  const fileInputRef = useRef(null);
  const submitFormRef = useRef(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);

  function handleIconClick() {
    fileInputRef.current.click();
  };

  function handleSubmitClick() {
    submitFormRef.current.click();
  };

  function handleFileChange(e) {
    setFile(e.target.files[0])
  }

  function handleTextChange(e) {
    e.stopPropagation();
    setText(e.target.value);
  }

  function characterCountClassName() {
    if (text.length >= maxLength) {
      return `${styles.characterCount} ${styles.error}`;
    } else if (text.length >= maxLength * 0.8) {
      return `${styles.characterCount} ${styles.warning}`;
    } else {
      return styles.characterCount;
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setProcessing(true);

    try {
      let message = textInputRef.current.value;
      message = DOMPurify.sanitize(message.trim());   // Sanitize inputs
      if ((message === '' || !message) && !file) {
        toast.error('Message or image required');
        return
      }

      let uploadurl;  // Define empty value for uploads
      if (file) {     //  Upload the file to supabase if a file is included
        const fileExt = file.name.split(".").pop();
        const cleanName = file.name.split(" ")[0].replace(`.${fileExt}`, '');
        const filePath = `${cleanName}-${crypto.randomUUID()}.${fileExt}`;

        uploadurl = await uploadFileToSupabase(filePath, file);
      }
      const newEntry = await axiosApi.post(submitTo,
        JSON.stringify({ message, uploadurl }),
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true, }
      )
      handleInsert(newEntry.data);
    } catch (err) {
      toast.error(err.message)
    } finally {
      setFile(null);
      setProcessing(false);
      textInputRef.current.value = '';
      textInputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }


return (
  <Form onSubmit={onSubmit} className={styles.postForm} >
    <div className={styles.textCounter}>

      <TextareaAutosize className={styles.postInput} name={name} onChange={handleTextChange}
        placeholder={placeholder} ref={textInputRef} minRows={minRows} maxRows={maxRows}
        maxLength={maxLength} wrap="soft" />

      <div className={characterCountClassName()}>
        {text.length}/{maxLength}
      </div>

    </div>

    <div className={styles.actionBtns}>
      <div className={styles.attachments}>
        <div className={styles.newIcons} >
          <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
          <MdAddPhotoAlternate onClick={handleIconClick} />
        </div>
      </div>
      <div className={styles.submitBtn} disabled={processing} onClick={!processing ? handleSubmitClick : undefined} >
        <input type='submit' style={{ display: 'none' }} ref={submitFormRef} /> {btnText}
        {processing ? <ImSpinner3 className={styles.spinner} /> : <IoIosSend />}
      </div>
    </div>
  </Form>
)}
