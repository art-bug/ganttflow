import { MutableRefObject, useEffect, useRef } from 'react';

type RefStateValue = any;
type Deps = Array<any>;

export default function useLatest<StateValue = RefStateValue>(state: StateValue, ...deps: Deps) {
  const stateRef: MutableRefObject<StateValue> = useRef<StateValue>(state);

  useEffect(() => {
    stateRef.current = state instanceof Object ? {...stateRef.current, ...state} : state;
  }, [state, ...deps]);

  return stateRef;
}
