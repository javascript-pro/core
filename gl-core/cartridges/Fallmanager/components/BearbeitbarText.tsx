// core/gl-core/cartridges/Fallmanager/components/BearbeitbarText.tsx
'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

type BearbeitbarTextProps = {
  value: string;
  onSave: (newValue: string) => void;
  label?: string;
};

export default function BearbeitbarText({ value, onSave, label }: BearbeitbarTextProps) {
  const [editing, setEditing] = React.useState(false);
  const [current, setCurrent] = React.useState(value);
  const [changed, setChanged] = React.useState(false);

  const handleEdit = () => setEditing(true);

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
    }
    setEditing(false);
    setChanged(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {editing ? (
        <>
          <Tooltip title="Speichern">
            <span>
              <IconButton
                onClick={handleSave}
                disabled={!changed}
                color="primary"
              >
                <SaveIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Abbrechen">
            <IconButton onClick={handleCancel} color="inherit">
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={current}
            onChange={handleChange}
            autoFocus
            label={label}
          />
        </>
      ) : (
        <>
          <Tooltip title="Bearbeiten">
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {value}
          </Typography>
        </>
      )}
    </Box>
  );
}
