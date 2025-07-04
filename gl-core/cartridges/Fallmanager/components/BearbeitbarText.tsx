'use client';

import * as React from 'react';
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import { useLingua } from '../../Fallmanager';
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
  const t = useLingua();
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

  const handleClear = () => {
    setCurrent('');
    setChanged(true);
  };

  const handleSave = () => {
    if (changed) {
      onSave(current.trim());
      dispatch(
        toggleFeedback({
          severity: 'success',
          title: `${label} ${t('SAVED')}`,
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
      handleClear(); // Also clears on Escape
    }
  };

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editing, changed]);

  return (
    <Box
      ref={containerRef}
      sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0 }}
    >
      <TextField
        fullWidth
        variant={editing ? 'filled' : 'standard'}
        value={editing ? current : value}
        label={label}
        onClick={!editing ? handleEdit : undefined}
        onChange={editing ? handleChange : undefined}
        onKeyDown={editing ? handleKeyDown : undefined}
        InputProps={
          editing
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Save">
                      <span>
                        <IconButton
                          onClick={handleSave}
                          disabled={!changed}
                          color="secondary"
                          size="small"
                        >
                          <Icon icon="save" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Clear">
                      <IconButton
                        onClick={handleClear}
                        color="secondary"
                        size="small"
                      >
                        <Icon icon="close" />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }
            : {
                readOnly: true,
              }
        }
      />
    </Box>
  );
}
