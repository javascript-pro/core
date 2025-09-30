// /Users/goldlabel/GitHub/flash/app/src/Flash/movieclips/Controls.tsx
import React from 'react';
import { Box, IconButton, Button } from '@mui/material';
import {
  Icon,
  useDispatch,
  useSystem,
  setSystemKey,
  setFlashKey,
} from '../../Flash';

export default function Controls({ id }: any) {
  const dispatch = useDispatch();
  const s = useSystem();
  const { themeMode } = s;

  const toggleTheme = () => {
    dispatch(
      setSystemKey('themeMode', themeMode === 'light' ? 'dark' : 'light'),
    );
  };

  return (
    <Box
      id={id}
      sx={{
        display: 'flex',
      }}
    >
      <Box sx={{ flexGrow: 1 }} />

      <Button
        sx={{ mr: 2 }}
        color="primary"
        startIcon={<Icon icon="reset" />}
        onClick={() => {
          // dispatch(setFlashKey("resetRequested", true));
        }}
        variant="contained"
      >
        Replay
      </Button>

      <IconButton color="primary" onClick={toggleTheme}>
        <Icon icon={themeMode === 'light' ? 'darkmode' : 'lightmode'} />
      </IconButton>

      {/* <Box sx={{ flexGrow: 1 }} /> */}
    </Box>
  );
}
