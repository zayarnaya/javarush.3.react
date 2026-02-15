import { useEffect, useRef } from 'react';

export const useDebounce = (func: Function, delay = 500) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const argsRef = useRef<Record<string, any>[]>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function debounced(...args: any) {
    timerRef.current = setTimeout(onTime, delay);
    argsRef.current = args;

    function onTime() {
      return func.apply(null, argsRef.current);
    }
  }

  return debounced;
};
