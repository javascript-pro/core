'use client';

import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Icon, useDispatch, resend } from '../../../../gl-core';

export default function ResendAdmin() {
  const dispatch = useDispatch();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resend({ to, subject, body }) as any);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon icon="email" />
        <strong>ResendAdmin</strong>
      </Box>

      <TextField
        label="To"
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Body"
        multiline
        minRows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        fullWidth
      />

      <Button type="submit" variant="contained">
        Send Test Email
      </Button>
    </Box>
  );
}
