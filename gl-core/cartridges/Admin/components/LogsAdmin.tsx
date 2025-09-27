// core/gl-core/cartridges/Admin/components/LogsAdmin.tsx
'use client';
import * as React from 'react';
import {
  Box,
  Grid,
  Alert,
  AlertTitle,
  CircularProgress,
  Typography,
  IconButton,
  Menu,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Icon } from '../../Theme';
import { db } from '../../../lib/firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import moment from 'moment';

type LogEntry = {
  id: string;
  title: string;
  description?: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  created?: number;
  updated?: number;
  data?: Record<string, any>;
};

export default function LogsAdmin() {
  const [logs, setLogs] = React.useState<LogEntry[]>([]);
  const [loading, setLoading] = React.useState(true);

  // menu state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuData, setMenuData] = React.useState<Record<string, any> | null>(null);

  // delete confirm state
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [logToDelete, setLogToDelete] = React.useState<LogEntry | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, data: Record<string, any>) => {
    setAnchorEl(event.currentTarget);
    setMenuData(data);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuData(null);
  };

  const handleDeleteClick = (log: LogEntry) => {
    setLogToDelete(log);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setLogToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!logToDelete) return;
    try {
      setDeleting(true);
      const res = await fetch('/api/gl-api/logs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: logToDelete.id }),
      });
      const result = await res.json();
      if (!res.ok) {
        console.error('Failed to delete log:', result);
      }
    } catch (err) {
      console.error('Error deleting log:', err);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setLogToDelete(null);
    }
  };

  React.useEffect(() => {
    const q = query(collection(db, 'logs'), orderBy('updated', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: LogEntry[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as LogEntry[];
      setLogs(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ m: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {logs.map((log) => (
            <Grid key={log.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Alert
                severity={log.severity || 'success'}
                action={
                  <Box>
                    {log.data && (
                      <IconButton
                        color="primary"
                        onClick={(e) => handleMenuOpen(e, log.data!)}
                      >
                        <Icon icon="api" />
                      </IconButton>
                    )}
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteClick(log)}
                    >
                      <Icon icon="delete" />
                    </IconButton>
                  </Box>
                }
              >
                <AlertTitle>{log.title}</AlertTitle>
                {log.description && (
                  <Typography variant="body2" gutterBottom>
                    {log.description}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  {log.updated
                    ? moment(log.updated).fromNow()
                    : log.created
                    ? moment(log.created).fromNow()
                    : ''}
                </Typography>
              </Alert>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Data menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {menuData &&
          Object.entries(menuData).map(([key, value]) => (
            <ListItem key={key} sx={{ minWidth: 200 }}>
              <ListItemText primary={String(value)} secondary={key} />
            </ListItem>
          ))}
      </Menu>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-log-dialog-title"
      >
        <DialogTitle id="delete-log-dialog-title">Delete log?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {logToDelete
              ? `Are you sure you want to delete the log "${logToDelete.title}"?`
              : 'Are you sure you want to delete this log?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={deleting}>
            No
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
