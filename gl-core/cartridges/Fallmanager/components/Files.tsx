'use client';

import * as React from 'react';
import moment from 'moment';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import {
  Card,
  CardHeader,
  CircularProgress,
  Fade,
  Typography,
  Tooltip,
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
      field: 'thumbnail',
      headerName: '',
      width: 80,
      renderCell: (params) =>
        params.row.thumbnail ? (
          <img
            src={params.row.thumbnail}
            alt="Thumbnail"
            style={{
              width: 60,
              height: 80,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        ) : (
          <span />
        ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'fileName',
      headerName: t('FILENAME'),
      flex: 2,
    },
    {
      field: 'size',
      headerName: t('FILESIZE'),
      flex: 1,
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
            onClick={() => handleDelete(id)}
            disabled={!!deleting[id]}
          />,
        ];
      },
      flex: 1,
    },
  ];

  const handleRowClick = (params: any) => {
    router.push(`/fallmanager/file/${params.id}`);
  };

  return (
    <>
      <CardHeader
        avatar={<Icon icon="files" color="primary" />}
        title={t('ALL_FILES')}
        action={<Upload />}
      />
      {rows.length === 0 ? (
        <Typography sx={{ px: 2, py: 1 }}>{t('NO_FILES')}</Typography>
      ) : (
        <div style={{ height: 600, width: '100%' }}>
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
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          />
        </div>
      )}
    </>
  );
}
