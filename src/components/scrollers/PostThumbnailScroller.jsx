'use client';

import PostThumbnailCard from '@/components/cards/PostThumbnailCard';
import NewPost from '@/components/forms/NewPost';
import { axiosApi } from '@/config/axios';
import { usePostStore } from '@/store/usePostStore';
import styles from '@/styles/genericscroller.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import HomePgSkltn from '../skeletons/HomePgSkltn';

const TAKE = 15; // Number of posts per request.

export default function PostThumbnailScroller() {
  const newPostRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { scrollY, setScrollY, posts, setPosts, hasMore, setHasMore, appendPosts } = usePostStore();
  const [observerRoot, setObserverRoot] = useState(null);
  
  const { ref, inView } = useInView({
    rootMargin: '500px', threshold: 0.1,
    root: observerRoot // Load the posts when user is 500px away from bottom
  });

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await axiosApi.get('/v1/social/posts', {
        params: { skip: posts.length, take: TAKE },
      });
      const newPosts = res.data;
      appendPosts(newPosts);
      if (newPosts.length < TAKE) { setHasMore(false) };
    } catch (err) {
      if (err.name !== 'CanceledError') {
        toast.error(err.message || 'Fetch error');
      }
    } finally {
      setLoading(false);
    }
  }, [inView, loading, hasMore]);


  useEffect(() => { // On Mount Effect
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      setObserverRoot(scrollContainer);
    }

    if (posts.length === 0 && !hasMore) {
      setHasMore(true);
      fetchPosts();
    } else if (scrollContainer) {
      scrollContainer.scrollTo({ top: scrollY, behavior: 'auto' });
    }

    const handleScroll = () => { // Always add scroll listener regardless of post state
      if (scrollContainer) {
        setScrollY(scrollContainer.scrollTop);
      }
    };

    scrollContainer?.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleScroll); // save scroll before page unload

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleScroll);
    };
  }, []);


  useEffect(() => { // Load more when target div is in view
    if (inView && !loading && hasMore) {
      fetchPosts();
    };
  }, [inView, fetchPosts, loading, hasMore]);


  function handlePostUpload(newPost) {
    setPosts([newPost, ...posts]);
    if (newPostRef.current) {
      newPostRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (loading && posts.length === 0) {
    return <HomePgSkltn />
  }

  return (
    <div ref={scrollContainerRef} className={styles.scrollbarMain}>
      <NewPost onPostUpload={handlePostUpload} />
      <div id='newpost' ref={newPostRef} />
      {posts.map((post) => (
        <PostThumbnailCard key={post.id} post={post} />
      ))}
      {hasMore && (
        <div className={styles.spinCntr}>
          <div className={styles.spinner} ref={ref} />
        </div>
      )}
    </div>
  )
}
