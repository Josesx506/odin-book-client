import { create } from 'zustand';
import { axiosApi } from '@/config/axios';

const useFollowingStore = create((set, get) => ({
  followingStates: {},

  updateFollowingState: (targetId, value) =>
    set((state) => ({
      followingStates: {
        ...state.followingStates,
        [targetId]: value,
      },
    })),

  followUser: async (targetId) => {
    await axiosApi.get(`/v1/social/users/follow?targetId=${targetId}`);
    const res = await axiosApi.get(`/v1/social/users/check-following?targetId=${targetId}`);
    get().updateFollowingState(targetId, res.data?.isFollowing || false);
    return true;
  },

  unfollowUser: async (targetId) => {
    await axiosApi.get(`/v1/social/users/unfollow?targetId=${targetId}`);
    const res = await axiosApi.get(`/v1/social/users/check-following?targetId=${targetId}`);
    get().updateFollowingState(targetId, res.data?.isFollowing || false);
    return true;
  },

  checkFollowStatus: async (targetId, updateLoader, signal) => {
    if (!targetId) {
      get().updateFollowingState(targetId, false);
      updateLoader(false);
      return;
    }

    if (get().followingStates[targetId] !== undefined) {
      updateLoader(false);
      return get().followingStates[targetId];
    }

    try {
      const res = await axiosApi.get(`/v1/social/users/check-following?targetId=${targetId}`,signal);
      get().updateFollowingState(targetId, res.data?.isFollowing || false);
    } catch (err) {
      if (err?.code !== 'ERR_CANCELED') console.error(err);
      throw err;
    } finally {
      updateLoader(false);
    }
  },
}));

export default useFollowingStore;
