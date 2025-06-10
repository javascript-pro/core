'use client';
import * as React from 'react';
import config from './config.json';
import { TFallmanager } from './types';
import {
  AppBar,
  CssBaseline,
  Paper,
  Toolbar,
  Typography,
  useTheme,
  Container,
} from '@mui/material';
import { Theme } from '../../../gl-core';
import { StickyHeader } from '../Fallmanager';

export default function Fallmanager({ payload = null }: TFallmanager) {
  const theme = useTheme();

  return (
    <Theme theme={config.theme as any}>
      <CssBaseline />

      {/* Sticky AppBar */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <StickyHeader />
        </Toolbar>
      </AppBar>

      <Paper
        square
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nisi purus, interdum lacinia nulla faucibus, feugiat vestibulum sapien. Aenean et est tortor. Ut vel urna sit amet neque cursus malesuada in sit amet urna. Nunc varius, sapien quis pulvinar tempor, quam lacus aliquam magna, non molestie massa erat a lorem. Donec faucibus, ipsum ac venenatis vehicula, quam purus imperdiet lorem, tincidunt semper elit velit sit amet felis. Aenean vel lorem lectus. Duis ante diam, lacinia vitae dolor et, blandit hendrerit metus.
            <br /><br />
            Cras molestie leo vel lacus viverra vulputate. Donec ac auctor lacus. In faucibus nibh et auctor vehicula. Pellentesque venenatis in ipsum a egestas. Sed sapien ante, condimentum tincidunt imperdiet vitae, laoreet et diam. Maecenas vel facilisis dolor, quis condimentum nunc. Duis ullamcorper tincidunt dui, sed rutrum lectus gravida in. Integer quis mi ultricies, pretium purus dapibus, blandit ligula. Proin accumsan sodales enim ac consectetur. Vivamus finibus consectetur metus id volutpat. Quisque sed ultrices nibh. Etiam blandit varius lacinia.
            <br /><br />
            Suspendisse sit amet nulla non lorem auctor pretium. Proin vitae lacinia enim. Sed urna mi, fringilla vel nulla at, mattis vehicula felis. Duis volutpat, neque vitae egestas sollicitudin, odio elit feugiat sem, in gravida dui tellus quis purus. Ut rutrum purus eu diam ornare dapibus. Cras eget molestie quam, eget venenatis erat. Aenean vel nunc augue. Vivamus id erat auctor nisi consectetur mattis a eu odio.
            <br /><br />
            Vestibulum pellentesque magna eu turpis sollicitudin, non ullamcorper dui euismod. Ut ac ipsum sed lacus tempus viverra tempor in massa. Mauris imperdiet sodales risus, in ullamcorper magna congue non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum hendrerit maximus justo nec lacinia. Nunc facilisis turpis in aliquam malesuada. Cras id massa quis nulla luctus placerat varius eu sem.
            <br /><br />
            Nunc venenatis turpis vel est iaculis vulputate. Etiam fringilla rutrum pulvinar. Quisque suscipit fringilla turpis eget dictum. Nullam tincidunt nunc sit amet turpis venenatis aliquet. Donec vel purus pretium, laoreet lorem hendrerit, dignissim quam. Aenean consequat feugiat luctus. Mauris sit amet tempor purus. Mauris tincidunt ullamcorper arcu. Aliquam gravida faucibus aliquam.
          </Typography>
        </Container>
      </Paper>
    </Theme>
  );
}
