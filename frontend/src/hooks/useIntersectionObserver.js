import { useEffect, useRef } from 'react';

const useIntersectionObserver = (target, callback, options = { threshold: 0.95 }) => {

  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      callbackRef.current(entries, observer);
    }, options);

    const currentTarget = target.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [target]);
};

//   useEffect(() => {
//     const observer = new IntersectionObserver(callback, options);
//     console.log('test')
//     if (target.current) {
//       observer.observe(target.current);
//     }

//     return () => {
//       if (target.current) {
//         observer.unobserve(target.current);
//       }
//     };
//   }, [target.current]);
// };

export default useIntersectionObserver;
