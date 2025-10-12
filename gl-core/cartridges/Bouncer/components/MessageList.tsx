// /Users/goldlabel/GitHub/pro/src/Pr0/components/MessageList.tsx
'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Paper,
  useTheme,
  Link,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import moment from 'moment';
import { TPing } from '../types';
import { db } from '../../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Icon } from '../../Theme';

// --- Turn URLs into clickable links
function linkify(text: string) {
  if (!text) return text;
  const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/gi;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    part.match(urlRegex) ? (
      <Link
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ wordBreak: 'break-word' }}
      >
        {part}
      </Link>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

export default function MessageList({ ping }: { ping: TPing | null }) {
  const theme = useTheme();
  const [confirmIndex, setConfirmIndex] = React.useState<number | null>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  // Sort oldest → newest so newest appear at the bottom
  const messages = React.useMemo(() => {
    if (!ping || !Array.isArray(ping.messages)) return [];
    return [...ping.messages]
      .map((m, i) => ({ ...m, originalIndex: i }))
      .sort((a, b) => a.created - b.created);
  }, [ping]);

  // Scroll to bottom whenever new messages arrive
  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Mark unseen messages as seen
  React.useEffect(() => {
    if (!ping || !Array.isArray(ping.messages) || ping.messages.length === 0)
      return;
    const unseen = ping.messages.filter((m) => !m.seen);
    if (unseen.length > 0) {
      const ref = doc(db, 'pings', ping.id);
      const updatedMessages = ping.messages.map((m) =>
        m.seen ? m : { ...m, seen: true },
      );
      updateDoc(ref, { messages: updatedMessages }).catch((err) =>
        console.error('Error marking messages seen:', err),
      );
    }
  }, [ping]);

  const handleConfirmDelete = async () => {
    if (!ping || confirmIndex === null) return;
    try {
      const ref = doc(db, 'pings', ping.id);
      const updatedMessages = [...ping.messages];
      updatedMessages.splice(confirmIndex, 1);
      await updateDoc(ref, { messages: updatedMessages });
    } catch (err) {
      console.error('Error deleting message:', err);
    } finally {
      setConfirmIndex(null);
    }
  };

  if (!ping) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Loading…
        </Typography>
      </Box>
    );
  }

  const visitorBg = theme.palette.background.default;

  return (
    <Box
      sx={{
        p: 2,
        maxHeight: 400,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.length === 0 ? null : (
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flexGrow: 1,
          }}
        >
          {messages.map((msg, idx) => {
            const isMe = msg.from === 'Goldlabel';
            const senderName = isMe
              ? 'Goldlabel'
              : ping.displayName || 'Visitor';
            const showDelete = !isMe;

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
                    position: 'relative',
                    px: showDelete ? 2.5 : 1.5,
                    py: 1,
                    maxWidth: '80%',
                    borderRadius: 2,
                    bgcolor: isMe ? 'primary.main' : visitorBg,
                    color: isMe
                      ? 'primary.contrastText'
                      : theme.palette.text.primary,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {linkify(msg.text)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      textAlign: isMe ? 'right' : 'left',
                      opacity: 0.8,
                    }}
                  >
                    {senderName} • {moment(msg.created).fromNow()}
                  </Typography>

                  {showDelete && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => setConfirmIndex(msg.originalIndex)}
                        sx={{
                          opacity: 0.5,
                          '&:hover': { opacity: 1 },
                          color: 'text.secondary',
                        }}
                      >
                        <Icon icon="delete" />
                      </IconButton>
                    </Box>
                  )}
                </Paper>
              </ListItem>
            );
          })}
          <div ref={bottomRef} />
        </List>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmIndex !== null}
        onClose={() => setConfirmIndex(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Message?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete your message. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmIndex(null)}
            startIcon={<Icon icon="cancel" />}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            startIcon={<Icon icon="tick" />}
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
