'use client';
import PostThumbnailCard from '@/components/cards/PostThumbnailCard';
import UserPageDetailsCard from "@/components/cards/UserPageDetailsCard";
import { axiosApi } from "@/config/axios";
import styles from '@/styles/genericscroller.module.css';
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useInView } from 'react-intersection-observer';
import ProfilePgSkltn from '../skeletons/ProfilePgSkltn';

const TAKE = 30;

export default function ProfileProvider({ userId }) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const { ref, inView } = useInView({ rootMargin: '500px', threshold: 0.1 });// Load new posts 

  const getPostsData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axiosApi.get(`/v1/social/users/${userId}/posts`,
        { params: { skip: posts.length, take: TAKE } }
      )
      const newPosts = res.data?.posts;
      if (Array.isArray(newPosts)) {
        setPosts(prevPosts => [...prevPosts, ...newPosts])
        if (newPosts.length < TAKE) { setHasMore(false) };
      } else {
        setHasMore(false);
        return
      }
    } catch (err) {
      if (err?.code !== "ERR_CANCELED") {
        toast.error(err.message || 'Fetch error');
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, posts.length])

  useEffect(() => {
    const controller = new AbortController;

    async function fetchData(signal) {
      setLoading(true);
      axiosApi.get(`/v1/social/users/${userId}`, { signal })
        .then((res) => { setProfile(res.data) })
        .catch((err) => {
          if (err?.code !== "ERR_CANCELED") {
            toast.error(err.message || 'Profile data fetch failed')
          }
        })
      setLoading(false);
    }

    fetchData(controller.signal);
    if (posts.length === 0 && !hasMore) {
      setHasMore(true);
      getPostsData();
    }
    return () => { controller.abort() };
  }, [userId])

  useEffect(() => { // In view scroll effect
    if (inView && !loading && hasMore) {
      getPostsData();
    };
  }, [inView, getPostsData, loading, hasMore]);

  if (loading) {
    return <ProfilePgSkltn />
  }

  const emptyPosts = <div style={{ textAlign: 'center' }}>No Posts Found. Create  a new post.</div>


  return (
    <div className={styles.doubleScroller}>
      <UserPageDetailsCard {...profile} />
      <div className={styles.innerScroller}>
        {posts ?
          posts.map((post) => (
            <PostThumbnailCard key={post.id} post={post} />
          )) :
          emptyPosts}
        {hasMore && (
          <div className={styles.spinCntr}>
            <div className={styles.spinner} ref={ref} />
          </div>
        )}
      </div>
    </div>
  )
}
