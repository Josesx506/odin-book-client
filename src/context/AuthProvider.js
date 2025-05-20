'use client';

import { axiosApi, setInterceptors } from "@/config/axios";
import { usePostStore } from "@/store/usePostStore";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from 'react-hot-toast';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const interceptorsRef = useRef({ request: null, response: null });

  // Try to get a new access token on page load
  useEffect(() => {
    async function initAuth() {
      try {
        const res = await axiosApi.get('/v1/auth/refresh');
        setAccessToken(res.data.accessToken);
        setUserDetails(res.data.userDetails);
      } catch (err) {

      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  async function login(credentials) {
    const res = await axiosApi.post('/v1/auth/signin', credentials)
    setAccessToken(res.data.accessToken);
    setUserDetails(res.data.userDetails);
  }

  async function exchangeOTPForToken(otp) {
    const res = await axiosApi.get(`/v1/auth/github/exchange-otp-for-token?otp=${otp}`)
    setAccessToken(res.data.accessToken);
    setUserDetails(res.data.userDetails);
  }

  async function logout() {
    await axiosApi.get('/v1/auth/signout')
    setAccessToken(null)
    setUserDetails(null)
    usePostStore.getState().clearCache();
    toast.success('Logged Out! Redirecting...')
    router.push('/')
  }

  async function refresh() {
    try {
      const res = await axiosApi.get('v1/auth/refresh')
      setAccessToken(res.data.accessToken);
      setUserDetails(res.data.userDetails);
      return res.data.accessToken
    } catch (err) {
      setAccessToken(null)
      setUserDetails(null)
      return null
    }
  }

  useLayoutEffect(() => {
    // Remove old interceptors for cleanup
    if (interceptorsRef.current.request !== null) {
      axiosApi.interceptors.request.eject(interceptorsRef.current.request);
    }
    if (interceptorsRef.current.response !== null) {
      axiosApi.interceptors.response.eject(interceptorsRef.current.response);
    }

    const { reqId, resId } = setInterceptors(() => accessToken, refresh)
    interceptorsRef.current.request = reqId;
    interceptorsRef.current.response = resId;

  }, [accessToken])

  return (
    <AuthContext.Provider
      value={{ accessToken, userDetails, loading , login, exchangeOTPForToken, logout, refresh}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;