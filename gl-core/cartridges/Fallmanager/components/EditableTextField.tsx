'use client';
import * as React from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import { Icon } from '../../Fallmanager';

export type TEditableTextField = {
  id?: string;
  label?: string;
  value?: string;
  sx?: any;
  variant?: 'filled' | 'outlined' | 'standard';
  autoFocus?: boolean;
  error?: boolean | null;
  helperText?: string | null;
  onSave?: (newValue: string) => void;
};

export default function EditableTextField({
  id = 'editable-text',
  label = 'Editable Text Field',
  value = '',
  sx = null,
  variant = 'filled',
  autoFocus = false,
  error = null,
  helperText = null,
  onSave = () => {},
}: TEditableTextField) {
  const [editMode, setEditMode] = React.useState(false);
  const [draftValue, setDraftValue] = React.useState(value);

  const handleEdit = () => {
    setDraftValue(value || '');
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setDraftValue(value || '');
  };

  const handleSave = () => {
    if (draftValue.trim() !== value?.trim()) {
      onSave(draftValue.trim());
    }
    setEditMode(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ...sx }}>
      {editMode ? (
        <TextField
          fullWidth
          variant={variant}
          id={id}
          label={label}
          value={draftValue}
          autoFocus={autoFocus}
          error={Boolean(error)}
          helperText={helperText}
          onChange={(e) => setDraftValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  onClick={handleSave}
                  disabled={draftValue.trim().length === 0}
                >
                  <Icon icon="check" />
                </IconButton>
                <IconButton onClick={handleCancel}>
                  <Icon icon="close" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleEdit}>
            <Icon icon="edit" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 500 }}>
              {label}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {value || '—'}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
