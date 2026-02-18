import { useEffect, useState } from 'react';

export const useDebounce = (func: Function, delay = 500) => {
  const [args, setArgs] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(func, delay, ...args);
    return () => {
      clearTimeout(timer);
    };
  }, [args]);

  function debounced(...args: any) {
    setArgs(args);
  }
  return debounced;
};
