// core/gl-core/cartridges/Fallmanager/components/Files.tsx
'use client';
import * as React from 'react';
import {
  Card,
  CardHeader,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Fade,
  ListItemSecondaryAction,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Icon, useDispatch } from '../../../../gl-core';
import { useLingua, useFallmanagerSlice, deleteFile, Upload } from '../../Fallmanager';

export default function Files() {
  const dispatch = useDispatch();
  const t = useLingua();
  const router = useRouter();
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
    <Card>
      <CardHeader 
        title="Files" 
        avatar={<Icon icon="doc" color="primary" />}
        action={<Upload/>}
      />
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
              <ListItemButton
                key={file.id}
                onClick={() => router.push(`/fallmanager/file/${file.id}`)}
                disabled={isDeleting}
              >
                <ListItemText
                  primary={file.fileName}
                  secondary={`${sizeKb} KB — ${uploadedAt}`}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Download">
                    <IconButton
                      color="primary"
                      href={file.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      disabled={isDeleting}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon icon="link" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <span>
                      <IconButton
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(file);
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Fade in>
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
                </ListItemSecondaryAction>
              </ListItemButton>
            );
          })}
        </List>
      )}
    </Card>
  );
}
