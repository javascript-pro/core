'use client';

import * as React from 'react';
import moment from 'moment';
import 'moment/locale/de';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import {
  Box,
  LinearProgress,
  Fade,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Icon, useDispatch, useIsMobile } from '../../../../gl-core';
import { useLingua, useFallmanagerSlice, deleteFile } from '../../Fallmanager';

type Row = {
  id: string;
  fileName?: string;
  uploadedAt: number; // ✅ timestamp in ms
  downloadUrl?: string;
  summary: string;
  rawTextSeverity: string | null;
  rawTextProcessing: boolean;
  step: number;
};

export default function Files() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const t = useLingua();
  const router = useRouter();
  const { files, language } = useFallmanagerSlice();

  const [hideCompleted, setHideCompleted] = React.useState(false);
  const [deleting, setDeleting] = React.useState<Record<string, boolean>>({});
  const [deletingOverlay, setDeletingOverlay] = React.useState(false);
  const [deletingFileName, setDeletingFileName] = React.useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);

  moment.locale(language === 'de' ? 'de' : 'en');

  const allRows = React.useMemo<Row[]>(() => {
    if (!files || typeof files !== 'object') return [];

    return Object.values(files).map((file: any): Row => {
      const uploadedAtDate = file.createdAt?.seconds
        ? new Date(file.createdAt.seconds * 1000)
        : null;

      const summary =
        file.openai?.summary?.[language] || file.openai?.summary?.en || '';

      let step = 1;
      if (file.rawText) step = 2;
      if (file.openai) step = 3;
      if (file.thumbnail) step = 4;

      return {
        id: file.id,
        fileName: file.fileName,
        uploadedAt: uploadedAtDate ? uploadedAtDate.getTime() : 0, // ✅ fallback to 0
        downloadUrl: file.downloadUrl,
        summary,
        rawTextSeverity: file.rawTextSeverity || null,
        rawTextProcessing: !!file.rawTextProcessing,
        step,
      };
    });
  }, [files, language]);

  const rows = React.useMemo(() => {
    return hideCompleted ? allRows.filter((r) => r.step !== 4) : allRows;
  }, [allRows, hideCompleted]);

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

  const baseColumns: GridColDef<Row>[] = [
    {
      field: 'uploadedAt',
      headerName: 'Uploaded',
      type: 'date',
      width: 150,
      valueGetter: (params: GridRenderCellParams<Row>) =>
  params.row.uploadedAt ? new Date(params.row.uploadedAt) : undefined,

    },
    {
      field: 'fileName',
      headerName: t('FILENAME'),
      flex: 2,
    },
    {
      field: 'summary',
      headerName: t('SUMMARY'),
      flex: 3,
      renderCell: (params: GridRenderCellParams<Row>) => (
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.75rem',
            whiteSpace: 'normal',
            lineHeight: 1.35,
          }}
        >
          {params.row.summary}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<Row>) => {
        const isPDF = params.row.fileName?.toLowerCase().endsWith('.pdf');
        if (!params.row.rawTextProcessing || !isPDF) return null;

        return (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <CircularProgress size={24} />
          </Box>
        );
      },
    },
    {
      field: 'step',
      headerName: '',
      width: 100,
      renderCell: (params: GridRenderCellParams<Row>) => {
        const step = params.row.step;
        return (
          <Typography variant="caption">
            {step === 4 ? t('DONE') : t(`STEP_${step}`)}
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      getActions: (params) => {
        const row = params.row as Row;
        const id = params.id as string;
        const url = row.downloadUrl;

        return [
          <GridActionsCellItem
            showInMenu
            key="download"
            icon={<Icon icon="link" />}
            label={t('VIEW_PDF')}
            onClick={() => url && window.open(url, '_blank', 'noopener,noreferrer')}
          />,
          <GridActionsCellItem
            showInMenu
            key="delete"
            icon={
              deleting[id] ? (
                <Fade in>
                  <LinearProgress sx={{ height: 2, width: '100%' }} />
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

  const columns = isMobile
    ? baseColumns.filter((col) =>
        ['fileName', 'actions'].includes(col.field as string),
      )
    : baseColumns;

  const handleRowClick = (params: GridRowParams<Row>) => {
    router.push(`/fallmanager/file/${params.id}`);
  };

  const getConfirmFileName = () => {
    if (!confirmDeleteId) return '...';
    const match = rows.find((r) => r.id === confirmDeleteId);
    return match?.fileName || '...';
  };

  return (
    <>
      {rows.length === 0 ? (
        <Typography sx={{ px: 2, py: 1 }}>{t('NO_FILES')}</Typography>
      ) : (
        <Box sx={{ position: 'relative', minHeight: 450, mx: 2, mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
            getRowHeight={() => 'auto'}
            sortModel={[{ field: 'uploadedAt', sort: 'desc' }]}
            columnVisibilityModel={{ uploadedAt: false }}
            sx={{
              '& .MuiDataGrid-row': {
                cursor: 'pointer',
                alignItems: 'flex-start',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              },
              '& .MuiDataGrid-cell': {
                py: 1,
                whiteSpace: 'normal !important',
                overflowWrap: 'break-word',
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
        </Box>
      )}

      <Dialog
        fullWidth
        maxWidth="xs"
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
      >
        <DialogTitle>
          {t('DELETE')} {getConfirmFileName()}?
        </DialogTitle>
        <DialogContent>
          <Typography mt={1}>
            {t('CONFIRM_DELETE')}
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
          <LinearProgress color="inherit" />
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
