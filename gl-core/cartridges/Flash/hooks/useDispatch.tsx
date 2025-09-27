// /Users/goldlabel/GitHub/flash/app/src/Uberedux/hooks/useDispatch.tsx
'use client';

import { useDispatch as useReduxDispatch } from 'react-redux';
import type { TUbereduxDispatch } from '../types';

export const useDispatch: () => TUbereduxDispatch = useReduxDispatch;
