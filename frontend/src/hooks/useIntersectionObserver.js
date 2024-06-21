import { useEffect } from 'react';

const useIntersectionObserver = (target, callback, options = { threshold: 0.95 }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    console.log('test')
    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target.current]);
};

export default useIntersectionObserver;
