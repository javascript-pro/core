// core/gl-core/cartridges/Fallmanager/components/Files.tsx
'use client';

import * as React from 'react';
import moment from 'moment';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import {
  Box,
  CardHeader,
  CircularProgress,
  Fade,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Backdrop,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Icon, useDispatch } from '../../../../gl-core';
import {
  useLingua,
  useFallmanagerSlice,
  deleteFile,
  Upload,
} from '../../Fallmanager';

export default function Files() {
  const dispatch = useDispatch();
  const t = useLingua();
  const router = useRouter();
  const { files } = useFallmanagerSlice();

  const [deleting, setDeleting] = React.useState<Record<string, boolean>>({});
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(
    null,
  );
  const [deletingOverlay, setDeletingOverlay] = React.useState(false);
  const [deletingFileName, setDeletingFileName] = React.useState<string | null>(
    null,
  );

  const rows = React.useMemo(() => {
    if (!files || typeof files !== 'object') return [];
    return Object.values(files).map((file: any) => {
      const uploadedAt = file.createdAt?.seconds
        ? new Date(file.createdAt.seconds * 1000)
        : null;

      return {
        id: file.id,
        fileName: file.fileName,
        size: (file.fileSize / 1024).toFixed(1) + ' KB',
        uploadedAt: uploadedAt ? uploadedAt.toISOString() : null,
        uploadedFromNow: uploadedAt ? moment(uploadedAt).fromNow() : 'Unknown',
        downloadUrl: file.downloadUrl,
        thumbnail: file.thumbnail || null,
      };
    });
  }, [files]);

  const handleDelete = async (id: string) => {
    const fileToDelete = rows.find((row) => row.id === id);
    setDeletingFileName(fileToDelete?.fileName || '...');
    setConfirmDeleteId(null);
    setDeletingOverlay(true);
    setDeleting((prev) => ({ ...prev, [id]: true }));
    await dispatch(deleteFile(id));
    setDeleting((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setDeletingOverlay(false);
    setDeletingFileName(null);
  };

  const columns: GridColDef[] = [
    {
      field: 'fileName',
      headerName: t('FILENAME'),
      flex: 2,
    },
    {
      field: 'size',
      headerName: t('FILESIZE'),
      width: 100,
    },
    {
      field: 'uploadedFromNow',
      headerName: t('TIME_CREATED'),
      flex: 1.5,
      renderCell: (params) =>
        params.row.uploadedAt ? (
          <Tooltip title={moment(params.row.uploadedAt).format('LLL')}>
            <span>{params.row.uploadedFromNow}</span>
          </Tooltip>
        ) : (
          <span>Unknown</span>
        ),
    },
    {
      field: 'thumbnail',
      headerName: '',
      width: 100,
      renderCell: (params) =>
        params.row.thumbnail ? (
          <Box
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                params.row.downloadUrl,
                '_blank',
                'noopener,noreferrer',
              );
            }}
            sx={{ cursor: 'pointer' }}
          >
            <img
              src={params.row.thumbnail}
              alt="Thumbnail"
              title={t('VIEW_FILE')}
              style={{
                width: 60,
                height: 80,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Box>
        ) : (
          <span />
        ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      getActions: (params) => {
        const id = params.id as string;
        const url = (params.row as any).downloadUrl;

        return [
          <GridActionsCellItem
            showInMenu
            key="download"
            icon={<Icon icon="link" />}
            label={t('VIEW_FILE')}
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
          />,
          <GridActionsCellItem
            showInMenu
            key="delete"
            icon={
              deleting[id] ? (
                <Fade in>
                  <CircularProgress size={20} sx={{ color: 'error.main' }} />
                </Fade>
              ) : (
                <Icon icon="delete" />
              )
            }
            label={t('DELETE')}
            onClick={() => setConfirmDeleteId(id)}
            disabled={!!deleting[id]}
          />,
        ];
      },
      width: 80,
    },
  ];

  const handleRowClick = (params: any) => {
    router.push(`/fallmanager/file/${params.id}`);
  };

  const getConfirmFileName = () => {
    if (!confirmDeleteId) return '...';
    const match = rows.find((r) => r.id === confirmDeleteId);
    return match?.fileName || '...';
  };

  return (
    <>
      <CardHeader avatar={<Upload />} />

      {rows.length === 0 ? (
        <Typography sx={{ px: 2, py: 1 }}>{t('NO_FILES')}</Typography>
      ) : (
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            getRowHeight={() => 100}
            sx={{
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
                alignItems: 'start',
              },
              '& .MuiDataGrid-cell': {
                py: 1,
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: 'text.secondary',
                fontWeight: 500,
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          />
        </div>
      )}

      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)}>
        <DialogContent>
          <Typography>{t('CONFIRM_DELETE')}</Typography>
          <Typography fontWeight="bold" mt={1}>
            {getConfirmFileName()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteId(null)}>
            {t('CANCEL')}
          </Button>
          <Button
            onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}
            color="error"
            variant="contained"
          >
            {t('DELETE')}
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        open={deletingOverlay}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <CircularProgress color="inherit" />
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            {t('DELETING')}
            {deletingFileName ? ` “${deletingFileName}”...` : '...'}
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
