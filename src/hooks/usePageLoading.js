import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true for initial load
  const location = useLocation();

  useEffect(() => {
    // Start loading when route changes
    setIsLoading(true);
    
    // Simulate loading time (minimum 500ms for better UX)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle initial page load
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return isLoading;
};
