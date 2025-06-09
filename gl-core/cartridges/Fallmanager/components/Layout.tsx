import * as React from 'react';
import { TLayout } from '../types';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';

import { Icon, useDispatch } from '../../../../gl-core';
import { firebaseAuth } from '../../Bouncer';

const messages = [
  {
    id: 1,
    primary: 'Brunch this week?',
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/svg/flags/ar.svg',
  },
  {
    id: 2,
    primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: '/svg/flags/de.svg',
  }
];

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function Layout({ children = null }: TLayout) {

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(firebaseAuth("signout"));
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Box sx={{ pb: '50px' }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ p: 2, pb: 0 }}
        >
          Latest Activity
        </Typography>
      </Box>

      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton 
            color="inherit" 
            aria-label="Open Sidebar">
            <Icon icon="menu" />
          </IconButton>
          <StyledFab 
            color="secondary" 
            aria-label="Add Case">
            <Icon icon="add" />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton 
            aria-label="Signout"
            color="inherit"
            onClick={handleSignout}>
            <Icon icon="signout" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
