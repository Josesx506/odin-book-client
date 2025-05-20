'use client';

import { useState, useEffect } from 'react';

export default function useScreenVisibility(query = '(min-width: 768px)') {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = () => setIsVisible(media.matches);

    handleChange(); // Initial check
    media.addEventListener('change', handleChange); // Reacts to screen resize

    return () => media.removeEventListener('change', handleChange);
  }, [query]);

  return isVisible;
}
