'use client';

import ExtUserCard from '@/components/cards/ExtUserCard';
import { axiosApi } from '@/config/axios';
import styles from '@/styles/genericscroller.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import ExplorePgSkltn from '../skeletons/ExplorePgSkltn';

const TAKE = 10;

export default function ExtUserThumbnailScroller({ filter }) {
  const usersRef = useRef([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { ref, inView } = useInView({ rootMargin: '500px', threshold: 0.1 });// Load new users 

  const getUserData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const options = filter || 'mixed';
    try {
      const res = await axiosApi.get(`/v1/social/users/${options}`, {
        params: { skip: users.length, take: TAKE },
      });
      const newUsers = res.data;
      if (Array.isArray(newUsers)) {
        usersRef.current = [...usersRef.current, ...newUsers];
        setUsers(usersRef.current);
        if (newUsers.length < TAKE) { setHasMore(false) };
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
  }, [loading, hasMore, filter, users.length])

  useEffect(() => { // On Mount Effect
    if (users.length === 0 && !hasMore) {
      setHasMore(true);
      getUserData();
    }
  }, [filter])

  useEffect(() => { // In view scroll effect
    if (inView && !loading && hasMore) {
      getUserData();
    };
  }, [inView, getUserData, loading, hasMore]);


  if (loading && users.length === 0) {
    return <ExplorePgSkltn />
  }

  return (
    <div className={styles.scrollbarMain}>
      {users.map((user) => (
        <ExtUserCard key={user.id} {...user} />
      ))}
      {hasMore && (
        <div className={styles.spinCntr}>
          <div className={styles.spinner} ref={ref} />
        </div>
      )}
    </div>
  )
}
