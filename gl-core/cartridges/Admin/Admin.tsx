// core/gl-core/cartridges/Admin/Admin.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Box, CssBaseline } from '@mui/material';
import { useThemeMode, useSlice, useDispatch, Theme } from '../../../gl-core';
import { Shell, Feedback } from '../Admin';

export default function Admin() {
  const pathname = usePathname();
  const themeMode = useThemeMode();
  const { db, themes } = useSlice();

  // console.log('Admin', themeMode, themes);
  const dispatch = useDispatch();
  const hasInitRun = useRef(false);

  useEffect(() => {
    if (!hasInitRun.current && (!db || Object.keys(db).length === 0)) {
      hasInitRun.current = true;
      //   dispatch(initDB());
    }
  }, [db, dispatch]);

  const renderContent = () => {
    if (!pathname) return null;
    const path = pathname.toLowerCase();

    const matchTable = path.match(/^\/database\/table\/([^/]+)/);
    if (matchTable) {
      return <>Table</>;
    }

    // if (path.startsWith('/pdfs/')) {
    //   const parts = path.split('/');
    //   const id = parseInt(parts[2], 10);
    //   const row = db?.tables?.pdfs?.rows?.find((r: any) => r.id === id);
    //   return row ? <FilePDF data={row} /> : <Box sx={{ m: 4 }}>Not found.</Box>;
    // }

    if (path.startsWith('/database')) {
      return <>database</>;
    }

    if (path.startsWith('/ai')) {
      return <>AI</>;
    }

    return <>Dashboard</>;
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Feedback />
      <pre style={{ fontSize: 10 }}>user: {JSON.stringify(true, null, 2)}</pre>
      <Shell>{renderContent()}</Shell>
    </Box>
  );
}
