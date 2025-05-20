'use client';

import ExtUserCard from '@/components/cards/ExtUserCard';
import UserPageNavCard from '@/components/cards/UserPageNavCard';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/genericscroller.module.css';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import FollowPgSkltn from '../skeletons/FollowPgSkltn';

const TAKE = 30;

export default function FollowersScroller({ userId }) {
  const [followers, setFollowers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { ref, inView } = useInView({ rootMargin: '500px', threshold: 0.1 });

  const getFollowerData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axiosApi.get(`/v1/social/users/${userId}/followers`, {
        params: { skip: followers.length, take: TAKE },
      });
      const newFollowers = res.data.followers;
      if (followers.length === 0) { setUser(res.data.user); }
      if (Array.isArray(newFollowers)) {
        setFollowers(prevFollowers => [...prevFollowers, ...newFollowers]);
        if (newFollowers.length < TAKE) { setHasMore(false) };
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
  }, [loading, hasMore, followers.length])

  useEffect(() => {
    if (followers.length === 0 && !hasMore) {
      setHasMore(true);
      getFollowerData();
    }
  }, [userId])

  useEffect(() => {
    if (inView && !loading && hasMore) {
      getFollowerData();
    };
  }, [inView, getFollowerData, loading, hasMore]);

  if (loading && followers.length === 0) {
    return <FollowPgSkltn />
  }

  const emptyFollowers =
    <div style={{ textAlign: 'center', marginTop: '1em' }}>No Interactions Found. Visit the explore page.</div>

  return (
    <div className={styles.scrollbarMain}>
      {user && <UserPageNavCard title={user.fullname} subtitle={`@${user.username.toLowerCase()}`} />}
      <div style={{ borderBottom: '1px solid darkgray' }}></div>
      {followers.length !== 0 ?
        followers.map((follower) => (
          <ExtUserCard key={follower.id} {...follower} />
        )) :
        emptyFollowers
      }
      {hasMore && (
        <div className={styles.spinCntr}>
          <div className={styles.spinner} ref={ref} />
        </div>
      )}
    </div>
  )
}
