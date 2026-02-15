import { useEffect, useRef } from 'react';

export const useDebounce = (func: Function, delay = 500) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function debounced(...args: any) {
    timerRef.current = setTimeout(onTime, delay, args);

    function onTime(...args: any) {
      return func.apply(null, args);
    }
  }

  return debounced;
};
