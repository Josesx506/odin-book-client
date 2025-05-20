'use client';

import CommentThumbnailCard from '@/components/cards/CommentThumbnailCard';
import PostDetailCard from '@/components/cards/PostDetailCard';
import UserPageNavCard from "@/components/cards/UserPageNavCard";
import NewComment from '@/components/forms/NewComment';
import { axiosApi } from '@/config/axios';
import { usePostStore } from '@/store/usePostStore';
import styles from '@/styles/genericscroller.module.css';
import { useEffect, useState, useRef } from "react";
import toast from 'react-hot-toast';
import PostDetailsSkltn from '../skeletons/PostDetailsSkltn';

export default function PostProvider({ postId }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [postAuthor, setPostAuthor] = useState(null);
  const [comments, setComments] = useState(null);
  const { updatePost } = usePostStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController;
    async function getPostDetails(postId, signal) {
      try {
        const res = await axiosApi.get(`/v1/social/posts/${postId}`, { signal });
        setPostAuthor(res.data.author);
        setPost(res.data.post);
        setComments(res.data.comments);
        const views = res.data.post.postViews;
        updatePost(Number(postId), (post) => ({
          ...post, views: views
        }));
      } catch (err) {
        if (err?.code !== "ERR_CANCELED") {
          toast.error(err.message);
        }
      } finally {
        setLoading(false)
      }
    }

    getPostDetails(postId, controller.signal)
    return () => { controller.abort() }
  }, [postId])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  if (loading) {
    return <PostDetailsSkltn />
  }

  function handleCommentUpload(newComment) {
    setComments(prevComments => [...prevComments, newComment]);
    setPost(prevPost => ({ ...prevPost, numComments: prevPost.numComments+1 }))
    updatePost(Number(postId), (post) => ({
      ...post, comments: post.comments+1
    }));
  }

  const emptyComments = <div style={{ textAlign: 'center' }}>No Comments Found. Reply this post.</div>

  return (
    <div className={styles.doubleScroller}>
      <div>
        <UserPageNavCard title={'Post'} />
        <PostDetailCard post={post} postAuthor={postAuthor} />
        <NewComment postId={postId} onCommentUpload={handleCommentUpload} />
      </div>
      <div className={styles.innerScroller}>
        {comments && comments.length > 0 ?
          comments.map((comment) => (
            <CommentThumbnailCard key={comment.id} comment={comment} />
          )) :
          emptyComments}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
