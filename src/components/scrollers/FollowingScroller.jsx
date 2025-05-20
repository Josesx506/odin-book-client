'use client';

import ExtUserCard from '@/components/cards/ExtUserCard';
import UserPageNavCard from '@/components/cards/UserPageNavCard';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/genericscroller.module.css';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import FollowPgSkltn from '../skeletons/FollowPgSkltn';

const TAKE = 30;

export default function FollowingScroller({ userId }) {
  const [following, setFollowing] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { ref, inView } = useInView({ rootMargin: '500px', threshold: 0.1 });

  const getFollowingData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axiosApi.get(`/v1/social/users/${userId}/following`, {
        params: { skip: following.length, take: TAKE },
      });
      const newFollowing = res.data.following;
      if (following.length === 0) { setUser(res.data.user); }
      if (Array.isArray(newFollowing)) {
        setFollowing(prevFollowing => [...prevFollowing, ...newFollowing]);
        if (newFollowing.length < TAKE) { setHasMore(false) };
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
  }, [loading, hasMore, following.length])

  useEffect(() => {
    if (following.length === 0 && !hasMore) {
      setHasMore(true);
      getFollowingData();
    }
  }, [userId])

  useEffect(() => {
    if (inView && !loading && hasMore) {
      getFollowingData();
    };
  }, [inView, getFollowingData, loading, hasMore]);

  if (loading && following.length === 0) {
    return <FollowPgSkltn />
  }

  const emptyFollowing =
    <div style={{ textAlign: 'center', marginTop: '1em' }}>No Interactions Found. Visit the explore page.</div>

  return (
    <div className={styles.scrollbarMain}>
      {user && <UserPageNavCard title={user.fullname} subtitle={`@${user.username.toLowerCase()}`} />}
      <div style={{ borderBottom: '1px solid darkgray' }}></div>
      {following.length !== 0 ? following.map((following) => (
        <ExtUserCard key={following.id} {...following} />
      )) :
        emptyFollowing}
      {hasMore && (
        <div className={styles.spinCntr}>
          <div className={styles.spinner} ref={ref} />
        </div>
      )}
    </div>
  )
}
