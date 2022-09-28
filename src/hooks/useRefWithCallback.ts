import { MutableRefObject, useCallback, useRef } from 'react';

interface ReturnType<T> {
  ref: MutableRefObject<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRef: (node: any) => void;
}

export const useRefWithCallback = <RefType>(): ReturnType<RefType> => {
  const ref = useRef<RefType>(null);
  const setRef = useCallback((node) => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
    }

    // Save a reference to the node
    ref.current = node;
  }, []);

  return { ref, setRef };
};
