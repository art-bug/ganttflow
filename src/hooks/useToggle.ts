import { useState } from 'react';

export default function useToggle(initial: boolean) {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = () => setValue(!value);

  return [value, toggle] as const;
};
