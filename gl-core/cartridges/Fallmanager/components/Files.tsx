'use client';
import * as React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Card,
  CardHeader,
  IconButton,
  Tooltip,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import { Icon, MightyButton, useDispatch } from '../../../../gl-core';
import {
  useLingua,
  useFallmanagerSlice,
  seedFirebase,
} from '../../Fallmanager';

export default function Files() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { files } = useFallmanagerSlice();

  const fileArray = React.useMemo(() => {
    if (!files || typeof files !== 'object') return [];
    return Object.values(files);
  }, [files]);

  const handleSeed = () => {
    dispatch(seedFirebase());
  };

  return (
    <Box sx={{}}>
      {fileArray.length === 0 ? (
        <Typography sx={{ px: 2, py: 1 }}>{t('NO_FILES_FOUND')}</Typography>
      ) : (
        <List dense>
          {fileArray.map((file: any) => {
            const uploadedAt = file.createdAt?.seconds
              ? new Date(file.createdAt.seconds * 1000).toLocaleString()
              : 'Unknown date';
            const sizeKb = (file.fileSize / 1024).toFixed(1);

            return (
              <ListItem
                key={file.id}
                secondaryAction={
                  <Tooltip title="Download">
                    <IconButton
                      color="primary"
                      href={file.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon icon="link" />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemIcon>
                  <PictureAsPdfIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={file.fileName}
                  secondary={
                    <>
                      {`${sizeKb} KB`} — {uploadedAt}
                    </>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
