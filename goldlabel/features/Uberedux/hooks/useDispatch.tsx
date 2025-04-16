'use client';

import { useDispatch as useReduxDispatch } from 'react-redux';
import type { UbereduxDispatch } from '../';

export const useDispatch: () => UbereduxDispatch = useReduxDispatch;
