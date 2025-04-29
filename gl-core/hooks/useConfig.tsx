import { useMemo } from 'react';
import config from '../config.json';

export function useConfig() {
  const value = useMemo(() => config, []);
  return value;
}
