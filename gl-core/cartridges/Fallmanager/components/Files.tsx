'use client';

import * as React from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import {
  Card,
  CardHeader,
  CircularProgress,
  Fade,
  Typography,
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

  const rows = React.useMemo(() => {
    if (!files || typeof files !== 'object') return [];
    return Object.values(files).map((file: any) => ({
      id: file.id,
      fileName: file.fileName,
      size: (file.fileSize / 1024).toFixed(1) + ' KB',
      uploadedAt: file.createdAt?.seconds
        ? new Date(file.createdAt.seconds * 1000).toLocaleString()
        : 'Unknown',
    }));
  }, [files]);

  const handleDelete = async (id: string) => {
    setDeleting((prev) => ({ ...prev, [id]: true }));
    await dispatch(deleteFile(id));
    setDeleting((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'fileName',
      headerName: t('FILENAME') || 'Filename',
      flex: 2,
    },
    {
      field: 'size',
      headerName: t('SIZE') || 'Size',
      flex: 1,
    },
    {
      field: 'uploadedAt',
      headerName: t('UPLOADED_AT') || 'Uploaded At',
      flex: 1.5,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      getActions: (params) => [
        <GridActionsCellItem
          key="open"
          icon={<Icon icon="edit" />}
          label={t('OPEN') || 'Open'}
          onClick={() => router.push(`/fallmanager/file/${params.id}`)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            deleting[params.id as string] ? (
              <Fade in>
                <CircularProgress size={20} sx={{ color: 'error.main' }} />
              </Fade>
            ) : (
              <Icon icon="delete" />
            )
          }
          label={t('DELETE') || 'Delete'}
          onClick={() => handleDelete(params.id as string)}
          disabled={!!deleting[params.id as string]}
        />,
      ],
      flex: 1,
    },
  ];

  return (
    <Card>
      <CardHeader title={t('ALL_FILES')} action={<Upload />} />
      {rows.length === 0 ? (
        <Typography sx={{ px: 2, py: 1 }}>{t('NO_FILES')}</Typography>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
          />
        </div>
      )}
    </Card>
  );
}
