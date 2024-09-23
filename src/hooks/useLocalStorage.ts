import { useEffect } from 'react';
import { useImmer } from 'use-immer';

export default function useLocalStorage(key: string, initial: any) {
  const getValue = () => {
    const storage: string | null = localStorage.getItem(key);

    return storage ? JSON.parse(storage) : initial;
  };

  const [value, setValue] = useImmer(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
// eslint-disable-next-line
  }, [value]);

  return [value, setValue];
}
