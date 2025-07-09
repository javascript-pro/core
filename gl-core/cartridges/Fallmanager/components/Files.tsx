'use client';

import * as React from 'react';
import moment from 'moment';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowSelectionModel } from '@mui/x-data-grid';
import {
  Box,
  CardHeader,
  CircularProgress,
  Fade,
  Typography,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Backdrop,
  Slide,
  Paper,
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
  const [deletingOverlay, setDeletingOverlay] = React.useState(false);
  const [deletingFileName, setDeletingFileName] = React.useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [confirmBulkDelete, setConfirmBulkDelete] = React.useState(false);

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

  const handleBulkDelete = async () => {
    setConfirmBulkDelete(false);
    setDeletingOverlay(true);
    setDeletingFileName(`${selectedIds.length} ${t('FILES')}`);
    for (const id of selectedIds) {
      await dispatch(deleteFile(id));
    }
    setSelectedIds([]);
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
        <Box sx={{ position: 'relative', minHeight: 700 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            onRowSelectionModelChange={(selection) =>
              setSelectedIds(selection as unknown as string[])
            }
            getRowHeight={() => 64}
            sx={{
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              },
              '& .MuiDataGrid-cell': {
                py: 1,
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: 'text.secondary',
                fontWeight: 500,
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.035)',
              },
            }}
          />

          <Slide
            direction="up"
            in={selectedIds.length > 0}
            mountOnEnter
            unmountOnExit
          >
            <Paper
              elevation={3}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 5,
                py: 1,
                px: 2,
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => setConfirmBulkDelete(true)}
                startIcon={<Icon icon="delete" />}
              >
                {t('DELETE_SELECTED')} ({selectedIds.length})
              </Button>
            </Paper>
          </Slide>
        </Box>
      )}

      {/* Single delete confirmation */}
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

      {/* Bulk delete confirmation */}
      <Dialog
        open={confirmBulkDelete}
        onClose={() => setConfirmBulkDelete(false)}
      >
        <DialogContent>
          <Typography>{t('CONFIRM_DELETE')}</Typography>
          <Typography fontWeight="bold" mt={1}>
            {selectedIds.length} {t('FILES')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmBulkDelete(false)}>
            {t('CANCEL')}
          </Button>
          <Button onClick={handleBulkDelete} color="error" variant="contained">
            {t('DELETE')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deleting overlay */}
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
