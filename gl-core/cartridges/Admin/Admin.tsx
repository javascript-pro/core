// core/gl-core/cartridges/Admin/Admin.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import { useSlice, useDispatch, ThumbMenu } from '../../../gl-core';
import { init, Shell, Feedback, Dashboard } from '../Admin';
import { FlickrAdmin, LogsAdmin } from '../Admin';

export default function Admin() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { db } = useSlice();
  const hasInitRun = useRef(false);

  useEffect(() => {
    if (!hasInitRun.current && (!db || Object.keys(db).length === 0)) {
      hasInitRun.current = true;
      dispatch(init());
    }
  }, [db, dispatch]);

  const renderContent = () => {
    if (!pathname) return null;
    const path = pathname.toLowerCase();

    const matchTable = path.match(/^\/database\/table\/([^/]+)/);
    if (matchTable) {
      return <>Table</>;
    }

    if (path.startsWith('/admin/flickr')) {
      return <FlickrAdmin />;
    }

    if (path.startsWith('/admin/logs')) {
      return <LogsAdmin />;
    }

    return <Dashboard />;
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Feedback />
      <ThumbMenu />
      <Shell>{renderContent()}</Shell>
    </Box>
  );
}
