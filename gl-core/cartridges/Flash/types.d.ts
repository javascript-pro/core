// /Users/goldlabel/GitHub/flash/app/src/Flash/types.d.ts
import React from 'react';
import { TUbereduxDispatch, TRootState } from './lib/store';

export type TState = {
  [key: string]: any;
};

export { TUbereduxDispatch, TRootState };

export type TMovieClip = {
  id?: string;
  children?: React.ReactNode;
  style?: any;
  border?: boolean;
  width?: number | string;
  height?: number | string;
};

export type TFlashConfig = {
  movie?: string;
  width?: number | string;
  height?: number | string;
  [key: string]: any;
};

export type TStage = {
  id?: string;
  movie?: string;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
};

export type TTrace = {
  children?: React.ReactNode;
};
