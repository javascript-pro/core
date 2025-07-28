// core/gl-core/cartridges/Admin/components/Layout.tsx

'use client';

import * as React from 'react';
import {
  Box,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
// import { Theme, useDispatch, MightyButton, Icon } from '../../../../gl-core';
// import { useAdminSlice } from '../../Admin';

type LayoutProps = {
  children: React.ReactNode;
};

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ pb: '50px' }}>{children}</Box>
      </Container>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          {/* <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
