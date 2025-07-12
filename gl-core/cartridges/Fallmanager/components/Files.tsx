'use client';

import * as React from 'react';
import moment from 'moment';
import 'moment/locale/de';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import {
  Box,
  LinearProgress,
  Fade,
  Typography,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Backdrop,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Icon, useDispatch, useIsMobile } from '../../../../gl-core';
import { useLingua, useFallmanagerSlice, deleteFile } from '../../Fallmanager';

export default function Files() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const t = useLingua();
  const router = useRouter();
  const { files, language } = useFallmanagerSlice();

  const [deleting, setDeleting] = React.useState<Record<string, boolean>>({});
  const [deletingOverlay, setDeletingOverlay] = React.useState(false);
  const [deletingFileName, setDeletingFileName] = React.useState<string | null>(
    null,
  );
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(
    null,
  );

  const rows = React.useMemo(() => {
    if (!files || typeof files !== 'object') return [];

    moment.locale(language === 'de' ? 'de' : 'en');

    return Object.values(files).map((file: any) => {
      const uploadedAt = file.createdAt?.seconds
        ? new Date(file.createdAt.seconds * 1000)
        : null;

      const summary =
        file.openai?.summary?.[language] || file.openai?.summary?.en || '';

      let step = 1;
      if (file.rawText) step = 2;
      if (file.openai) step = 3;

      return {
        id: file.id,
        fileName: file.fileName,
        uploadedAt: uploadedAt ? uploadedAt.toISOString() : null,
        downloadUrl: file.downloadUrl,
        summary,
        rawTextSeverity: file.rawTextSeverity || null,
        rawTextProcessing: !!file.rawTextProcessing,
        step,
      };
    });
  }, [files, language]);

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

  const baseColumns: GridColDef[] = [
    {
      field: 'fileName',
      headerName: t('FILENAME'),
      flex: 2,
    },
    {
      field: 'summary',
      headerName: t('SUMMARY'),
      flex: 3,
      renderCell: (params) => (
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
  renderCell: (params) => {
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
      renderCell: (params) => {
        const step = params.row.step;
        let color: 'default' | 'primary' | 'secondary' = 'default';
        if (step === 2) color = 'primary';
        if (step === 3) color = 'default';

        return (
          <Chip
            label={`${step < 3 ? step : "Done"}`}
            color={color}
            size="small"
            sx={{  }}
          />
        );
      },
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
      {rows.length === 0 ? (
        <Typography sx={{ px: 2, py: 1 }}>{t('NO_FILES')}</Typography>
      ) : (
        <Box sx={{ position: 'relative', minHeight: 450, mx: 2, mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
            getRowHeight={() => 'auto'}
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
        maxWidth="sm"
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
      >
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
