'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import { Icon, useDispatch, toggleFeedback } from '../../../../gl-core';

type BearbeitbarTextProps = {
  value: string;
  onSave: (newValue: string) => void;
  label?: string;
};

export default function BearbeitbarText({
  value,
  onSave,
  label,
}: BearbeitbarTextProps) {
  const [editing, setEditing] = React.useState(false);
  const [current, setCurrent] = React.useState(value);
  const [changed, setChanged] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditing(true);
    setCurrent(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.target.value);
    setChanged(e.target.value !== value);
  };

  const handleCancel = () => {
    setCurrent(value);
    setChanged(false);
    setEditing(false);
  };

  const handleSave = () => {
    if (changed) {
      onSave(current.trim());
      dispatch(
      toggleFeedback({
        severity: 'success',
        title: `${label} saved`,
      }),
    );
    }
    setEditing(false);
    setChanged(false);
    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && changed) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  // Close edit mode on outside click (only if not changed)
  React.useEffect(() => {
    if (!editing) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (!changed) {
          setEditing(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [editing, changed]);

  return (
    <Box ref={containerRef} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {editing ? (
        <TextField
          fullWidth
          variant="filled"
          value={current}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          // autoFocus
          // label={label}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Speichern">
                  <span>
                    <IconButton
                      onClick={handleSave}
                      disabled={!changed}
                      color="primary"
                      size="small"
                    >
                      <Icon icon="save" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Abbrechen">
                  <IconButton
                    onClick={handleCancel}
                    color="inherit"
                    size="small"
                  >
                    <Icon icon="close" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={handleEdit}
        >
          {value}
        </Typography>
      )}
    </Box>
  );
}
