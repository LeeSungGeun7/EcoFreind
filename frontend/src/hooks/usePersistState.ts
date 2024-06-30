import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(storageKey: string, initialState: T): [T, (value: T | ((val: T) => T)) => void] {
  // 초기 상태를 설정할 때 localStorage에서 값을 가져옵니다.
  const [state, setInternalState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialState;
    }
  });

  // state가 변경될 때마다 localStorage를 업데이트합니다.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [storageKey, state]);

  // setState 함수를 래핑하여 localStorage 업데이트를 자동화합니다.
  const setState = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setInternalState(valueToStore);
    } catch (error) {
      console.error('Error setting state:', error);
    }
  };

  return [state, setState];
}