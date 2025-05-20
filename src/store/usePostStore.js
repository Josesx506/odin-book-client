// postStore.js
import { create } from 'zustand';

export const usePostStore = create(set => ({
  hasMore: false,
  setHasMore: (value) => set({ hasMore: value }),
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
  posts: [],
  setPosts: (posts) => set({ posts }),
  appendPosts: (newPosts) => set(state => ({ posts: [...state.posts, ...newPosts] })),
  updatePost: (postId, updater) =>
    set(state => ({
      posts: state.posts.map(post =>
        post.id === postId ? { ...post, ...updater(post) } : post
      )
    })),
  clearCache: () => set({ posts: [], scrollY: 0 })
}));
