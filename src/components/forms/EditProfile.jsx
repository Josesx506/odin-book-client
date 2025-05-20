'use client';

import { ContainedButton } from '@/components/Buttons';
import { axiosApi } from '@/config/axios';
import { uploadFileToSupabase } from "@/config/supabase";
import useAuth from '@/hooks/useAuth';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import { usePostStore } from "@/store/usePostStore";
import styles from '@/styles/forms/profile.module.css';
import Form from 'next/form';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillCloudUploadFill } from "react-icons/bs";
import EditProfileSkltn from '../skeletons/EditProfileSkltn';
import { FormField } from './FormField';

export default function EditProfile({ userId, onClose }) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState({});
  const fileInputRef = useRef(null);
  const { userDetails } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useFormValidation();

  useEffect(() => {
    const controller = new AbortController();
    async function getProfile(signal) {
      setLoading(true);
      try {
        const req = await axiosApi.get(`/v1/social/users/profile`, { signal });
        setUserData(req.data)
        reset(req.data)
      } catch (err) {
        if (err?.code !== "ERR_CANCELED") {
          toast.error(err.message);
        }
      } finally {
        setLoading(false)
      }
    }
    getProfile(controller.signal);
    return () => { controller.abort() }
  }, [userId])

  async function onSubmit(data) {
    // Validation
    if (file && data.gravatar !== '') {
      toast.error("Please provide only one image source.");
      return;
    }
    if (data.fullname === userData.fullname && data.username === userData.username
      && data.gravatar === userData.gravatar && data.bio === userData.bio && !file
    ) {
      toast.error('No edits detected');
      return;
    }
    setLoading(true);
    // Add the user id to the form data for backend validation
    data.id = userId;

    if (file && data.gravatar === '') {
      const fileExt = file.name.split(".").pop();
      const cleanName = file.name.split(" ")[0].replace(`.${fileExt}`, '');
      const filePath = `${cleanName}-${crypto.randomUUID()}.${fileExt}`;

      data.gravatar = await uploadFileToSupabase(filePath, file);
    }

    try {
      const resp = await axiosApi.post("/v1/social/users/profile", data)
      toast.success(resp.data.message);
      // Close the modal and clear the cache so the
      // new profile changes can be reflected from the api
      onClose();
      usePostStore.getState().clearCache();
      window.location.reload();
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleFileChange(e) {
    const fileSize = e.target?.files[0]?.size;
    if (!fileSize) return;

    // Max file size in kb
    const maxSizeKB = 200;
    const maxSizeBytes = maxSizeKB * 1024;

    if (fileSize > maxSizeBytes) {
      toast.error(`File size exceeds ${maxSizeKB}KB`);
      setFile(null);
      e.target.value = '';
      return;
    } else { setFile(e.target.files[0]) }
  }

  function handleIconClick() {
    fileInputRef.current.click();
  };

  if (userDetails.id !== Number(userId)) {
    return <div style={{ textAlign: 'center' }}>You don't have permission to edit this profile</div>
  }

  if (loading) {
    return <EditProfileSkltn />
  }


  return (
    <div className={styles.profileCntr}>
      <div className={styles.profileImg}>
        <Image
          src={userData.gravatar || `https://robohash.org/${userId}.png`}
          width={120} height={120} alt={`${userData.fullname} avatar`} />
      </div>
      <div className={styles.uploadImgIcon}>
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
        <BsFillCloudUploadFill onClick={handleIconClick} />
      </div>
      <em style={{ textAlign: 'center' }}>You can either upload an image or enter a url but not both</em>
      <Form className={styles.profileForm} onSubmit={handleSubmit(onSubmit)}>

        <FormField name={'fullname'} label={'Full name'} placeholder={'First and Last name'}
          register={register} rules={validationRules.name} errors={errors} defaultValue={userData.fullname} />
        <FormField name={'username'} label={'Username'} placeholder={'Enter username'}
          register={register} rules={validationRules.username} errors={errors} defaultValue={userData.username} />
        <FormField type={'url'} name={'gravatar'} label={'Profile Image url'} placeholder={'https://example.com'}
          register={register} rules={validationRules.url} errors={errors} defaultValue={userData.gravatar} />
        <FormField type={'textarea'} name={'bio'} label={'Bio'} placeholder={'I like to ....'} rows={3}
          register={register} rules={validationRules.bio} errors={errors} defaultValue={userData.bio} />

        <div className={styles.updateProfile}>
          <ContainedButton disabled={loading}>Update Profile</ContainedButton>
        </div>
      </Form>
    </div>
  )
}
