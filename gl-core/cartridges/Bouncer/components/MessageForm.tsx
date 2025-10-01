// /Users/goldlabel/GitHub/pro/src/Pr0/components/MessageForm.tsx
import * as React from 'react';
import { TextField, Box, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { TPing } from '../types';

export default function MessageForm({ ping }: { ping: TPing }) {
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async () => {
    const trimmed = message.trim();
    if (!trimmed) {
      setError('Message cannot be empty');
      return;
    }

    try {
      const ref = doc(db, 'pings', ping.id);

      await updateDoc(ref, {
        messages: arrayUnion({
          text: trimmed,
          created: Date.now(),
        }),
      });

      setMessage('');
      setError('');
    } catch (err) {
      console.error('Error adding message:', err);
      setError('Failed to send message');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" flexDirection="column" sx={{ mx: 2 }}>
        <TextField
          autoFocus
          variant="standard"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={error}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="send message"
                  color="primary"
                  onClick={handleSubmit}
                  edge="end"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
