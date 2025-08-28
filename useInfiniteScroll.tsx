import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isLoading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = (
  fetchNextPage: () => void,
  options: UseInfiniteScrollOptions
) => {
  const { hasNextPage, isLoading, threshold = 100 } = options;
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage && !isLoading && !isFetching) {
      setIsFetching(true);
      fetchNextPage();
    }
  }, [hasNextPage, isLoading, isFetching, fetchNextPage]);

  useEffect(() => {
    if (loadingRef.current) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        threshold: 0.1,
        rootMargin: `${threshold}px`
      });
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold]);

  useEffect(() => {
    setIsFetching(false);
  }, [isLoading]);

  return { loadingRef, isFetching };
};