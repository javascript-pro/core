'use client';
import * as React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Fade,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Icon, useDispatch } from '../../../../gl-core';
import { useLingua, useFallmanagerSlice, deleteFile } from '../../Fallmanager';

export default function Files() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { files } = useFallmanagerSlice();

  const [deleting, setDeleting] = React.useState<Record<string, boolean>>({});

  const fileArray = React.useMemo(() => {
    if (!files || typeof files !== 'object') return [];
    return Object.values(files);
  }, [files]);

  const handleDelete = async (file: any) => {
    setDeleting((prev) => ({ ...prev, [file.id]: true }));
    await dispatch(deleteFile(file.id));
    setDeleting((prev) => {
      const updated = { ...prev };
      delete updated[file.id];
      return updated;
    });
  };

  return (
    <Box>
      {fileArray.length === 0 ? (
        <Typography sx={{ px: 2, py: 1 }}>{t('NO_FILES_FOUND')}</Typography>
      ) : (
        <List dense>
          {fileArray.map((file: any) => {
            const uploadedAt = file.createdAt?.seconds
              ? new Date(file.createdAt.seconds * 1000).toLocaleString()
              : 'Unknown date';
            const sizeKb = (file.fileSize / 1024).toFixed(1);
            const isDeleting = !!deleting[file.id];

            return (
              <ListItem
                key={file.id}
                secondaryAction={
                  <>
                    <Tooltip title="Download">
                      <IconButton
                        color="primary"
                        href={file.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        disabled={isDeleting}
                      >
                        <Icon icon="link" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <span>
                        <IconButton
                          color="primary"
                          onClick={() => handleDelete(file)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <Fade in={true}>
                              <CircularProgress
                                size={20}
                                sx={{ color: 'error.main' }}
                              />
                            </Fade>
                          ) : (
                            <Icon icon="delete" />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                  </>
                }
              >
                {/* <ListItemIcon>
                  <PictureAsPdfIcon color="primary" />
                </ListItemIcon> */}
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
