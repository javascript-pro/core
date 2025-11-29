// core/gl-core/cartridges/DesignSystem/DesignSystem.tsx
'use client';
import * as React from 'react';
import { TTheme, IDesignSystem, TFeedback } from './types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  useDesignSystem,
  useMUITheme,
  setFeedback,
  setDesignSystemKey,
  SystemDialog,
  Feedback,
  PushButton,
  LoadingOverlay,
} from '../DesignSystem';
import { useDispatch } from '../Uberedux';

export default function DesignSystem({
  theme,
  children = null,
}: IDesignSystem) {
  const newtheme = useMUITheme(theme as TTheme);
  const { feedbackTested } = useDesignSystem();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!feedbackTested) {
      const feedback: TFeedback = {
        severity: 'success',
        title: 'Booting Design System',
      };
      dispatch(setFeedback(feedback));
      dispatch(setDesignSystemKey('feedbackTested', true));
    }
  }, [dispatch, feedbackTested]);

  return (
    <ThemeProvider theme={newtheme}>
      <CssBaseline />
      <LoadingOverlay />
      <Feedback />
      <SystemDialog />
      {children}
      <PushButton />
    </ThemeProvider>
  );
}
