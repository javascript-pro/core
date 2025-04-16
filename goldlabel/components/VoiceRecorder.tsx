'use client';

import * as React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';
import { Icon } from '../';

type VoiceRecorderProps = {
  product: 'speakwrite' | 'goodfit';
};

export default function VoiceRecorder({ product }: VoiceRecorderProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [position, setPosition] = React.useState(0); // in seconds
  const duration = 59;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      setPosition(value);
    }
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <Alert
      severity="success"
      icon={<Icon icon="speak-write" color="primary" />}
      sx={{ alignItems: 'flex-start' }}
    >
      <AlertTitle>Voice Recorder</AlertTitle>
      <Box display="flex" flexDirection="column" gap={2} mt={1}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={togglePlay}>
            <Icon icon={'right'} />
          </IconButton>
          <Typography variant="body2" sx={{ minWidth: 48 }}>
            {formatTime(position)}
          </Typography>
        </Box>
        <Slider
          value={position}
          onChange={handleSliderChange}
          min={0}
          max={duration}
          step={1}
          aria-label="Playback Position"
        />
        <Typography variant="caption" color="text.secondary">
          Total duration: {formatTime(duration)}
        </Typography>
      </Box>
    </Alert>
  );
}
