// /Users/goldlabel/GitHub/core/gl-core/cartridges/Admin/components/AuthAdmin.tsx
'use client';

import * as React from 'react';
import {
  Box,
  Alert,
  CircularProgress,
  CardHeader,
  Typography,
  Avatar,
  TextField,
  Autocomplete,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Icon } from '../../../../gl-core';

type TUserDoc = {
  id: string;
  email: string;
  displayName: string;
  level: number;
  avatar: string;
};

export default function AuthAdmin() {
  const [users, setUsers] = React.useState<TUserDoc[]>([]);
  const [checked, setChecked] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [filterValue, setFilterValue] = React.useState(''); // the search string

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'auth'),
      (querySnapshot) => {
        const docs: TUserDoc[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as DocumentData;
          docs.push({
            id: docSnap.id,
            email: data.email ?? '',
            displayName: data.displayName ?? '',
            avatar: data.avatar ?? '',
            level: data.level ?? 1,
          });
        });
        setUsers(docs);
        setErrorMsg(null);
        setChecked(true);
      },
      (error) => {
        setUsers([]);
        setErrorMsg(`Firebase Error: ${error.message}`);
        setChecked(true);
      },
    );
    return () => unsubscribe();
  }, []);

  const emptyHeader = () => <></>;

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      flex: 0.3,
      minWidth: 80,
      sortable: false,
      renderHeader: emptyHeader,
      renderCell: (params: GridRenderCellParams<any, string>) => {
        const url = params.value;
        return url ? (
          <Avatar src={url} alt="avatar" sx={{ width: 32, height: 32, mt: 1 }} />
        ) : (
          <Avatar sx={{ width: 32, height: 32 }} />
        );
      },
    },
    {
      field: 'displayName',
      headerName: '',
      flex: 1,
      minWidth: 180,
      renderHeader: emptyHeader,
      sortable: true,
    },
    {
      field: 'email',
      headerName: '',
      flex: 1,
      minWidth: 200,
      renderHeader: emptyHeader,
      sortable: true,
    },
    {
      field: 'level',
      headerName: '',
      type: 'number',
      flex: 0.3,
      minWidth: 100,
      renderHeader: emptyHeader,
      sortable: true,
      valueFormatter: (params: any) =>
        params.value !== undefined && params.value !== null
          ? String(params.value)
          : params.value,
    },
  ];

  // Filtered rows
  const filteredRows = React.useMemo(() => {
    if (!filterValue.trim()) return users;
    const lower = filterValue.toLowerCase();
    return users.filter(
      (u) =>
        u.email.toLowerCase().includes(lower) ||
        u.displayName.toLowerCase().includes(lower),
    );
  }, [filterValue, users]);

  // Options for Autocomplete (just for suggestions)
  const options = users.map((u) => ({
    id: u.id,
    label: u.displayName || u.email,
  }));

  return (
    <Box sx={{}}>
      <CardHeader
        avatar={<Icon icon="auth" />}
        title={<Typography variant='h6'>Auth</Typography>}
        action={<>
        {/* Autocomplete to search */}
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            onInputChange={(_, newInputValue) => {
              setFilterValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter"
                variant="filled"
              />
            )}
            sx={{ mb: 2, width: 200 }}
          />
        </>}
      />

      {!checked ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : errorMsg ? (
        <Alert severity="error">{errorMsg}</Alert>
      ) : filteredRows.length === 0 ? (
        <Typography>No users match your search.</Typography>
      ) : (
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            disableColumnMenu
            disableColumnSelector
            disableMultipleRowSelection
            sx={{
              border: 'none',
              '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeaderTitle': {
                display: 'none',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
