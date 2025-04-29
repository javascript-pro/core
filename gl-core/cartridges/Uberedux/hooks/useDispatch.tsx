'use client';

import { useDispatch as useReduxDispatch } from 'react-redux';
import type { TUbereduxDispatch } from '../';

export const useDispatch: () => TUbereduxDispatch = useReduxDispatch;
