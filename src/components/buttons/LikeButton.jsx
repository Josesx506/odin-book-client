'use client';

import { axiosApi } from '@/config/axios';
import { usePostStore } from '@/store/usePostStore';
import styles from '@/styles/buttons/likebtn.module.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useInView } from 'react-intersection-observer';

export default function LikeButton({ postId, commentId, value }) {
  const [likes, setLikes] = useState(value);
  const [isLiked, setIsLiked] = useState(false);
  const [checked, setChecked] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { updatePost } = usePostStore();

  useEffect(() => {
    if (!inView || checked) return;

    const url = commentId ?
      `/v1/social/posts/${postId}/comment/${commentId}/check-like` :
      `/v1/social/posts/${postId}/check-like`
    const controller = new AbortController()
    async function checkLike() {
      try {
        const res = await axiosApi.get(url, { signal: controller.signal });
        setIsLiked(res.data);
        setChecked(true)
      } catch (err) {
        if (err?.code !== "ERR_CANCELED") { toast.error(err.message) }
      }
    }
    checkLike();
    return () => { controller.abort() }
  }, [inView, postId, commentId])

  async function updateLike(e) {
    e.preventDefault();
    e.stopPropagation();
    const url = commentId ?
      `/v1/social/posts/${postId}/comment/${commentId}/like` :
      `/v1/social/posts/${postId}/like`
    try {
      const res = await axiosApi.get(url);
      const newLikes = res.data;
      setLikes(newLikes);
      updatePost(postId, (post) => ({
        ...post, likes: newLikes
      }));
      setIsLiked(!isLiked);
    } catch (err) {
      if (err?.code !== "ERR_CANCELED") { toast.error(err.message) }
    }
  }

  return (
    <div ref={ref} className={styles.cmpStyle} onClick={updateLike}>
      {isLiked ?  <FaHeart className={styles.iconLike} /> : <FaRegHeart />}
      <span className={isLiked ? styles.textLike : ''}>{likes}</span>
    </div>
  )
}
