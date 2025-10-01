// /Users/goldlabel/GitHub/pro/src/Pr0/components/MessageList.tsx
import * as React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Paper,
} from '@mui/material';
import moment from 'moment';
import { TPing } from '../types';
import { db } from '../../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function MessageList({ ping }: { ping: TPing | null }) {
  const messages = React.useMemo(() => {
    if (!ping || !Array.isArray(ping.messages)) return [];
    return [...ping.messages].sort((a, b) => b.created - a.created);
  }, [ping]);

  // Mark unseen messages as seen once we render them
  React.useEffect(() => {
    if (!ping || !Array.isArray(ping.messages) || ping.messages.length === 0) return;

    const unseen = ping.messages.filter((m) => !m.seen);
    if (unseen.length > 0) {
      const ref = doc(db, 'pings', ping.id);

      const updatedMessages = ping.messages.map((m) =>
        m.seen ? m : { ...m, seen: true }
      );

      updateDoc(ref, { messages: updatedMessages }).catch((err) =>
        console.error('Error marking messages seen:', err)
      );
    }
  }, [ping]);

  if (!ping) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Loading…
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {messages.length === 0 ? (
        <></>
      ) : (
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {messages.map((msg, idx) => {
            const isMe = msg.from === 'Goldlabel';

            return (
              <ListItem
                key={idx}
                sx={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  p: 0,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.5,
                    py: 1,
                    maxWidth: '90%',
                    color: isMe ? 'text.primary' : 'text.primary',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 0.5, textAlign: isMe ? 'right' : 'left' }}
                  >
                    {msg.from ?? 'You'} • {moment(msg.created).fromNow()}
                  </Typography>
                </Paper>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
