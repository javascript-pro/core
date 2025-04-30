'use client';
import React from 'react';
import { 
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Container, 
  Grid, 
  Typography,
} from '@mui/material';
import {
  Icon,
  useIsMobile,
} from "../";

export type TFooter = {

}

export default function Footer({
}: TFooter) {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <>
        <AppBar 
          position="fixed" 
          color="default" 
          sx={{
            boxShadow: 0,
            top: 'auto', 
            bottom: 0,
            py: 2
          }}>
          <Toolbar>
            <Container maxWidth="md">
              <Box sx={{
                // border: "1px solid green", 
                flexGrow:1,
              }}>
                <Grid container spacing={1}>
                  <Grid size={{
                    "sm": 12,
                    "md": 4,
                  }}>
                  <Typography variant="button">
                    Company
                  </Typography>
                  <Typography variant="body2">Goldlabel Apps Ltd</Typography>
                  <Typography variant="body2">321-323 High Road</Typography>
                  <Typography variant="body2">Essex RM6 6AX</Typography>
                  <Typography variant="body2">UK Company No. 15460545</Typography>
                </Grid>

                <Grid size={{
                    "sm": 12,
                    "md": 4,
                }}>
                  <Typography variant="button">
                    Links
                  </Typography>
                </Grid>


                <Grid size={{
                    "sm": 12,
                    "md": 4,
                }}>
                  <Typography variant="button">
                    Connect
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            
          </Container>
      </Toolbar>
      
    </AppBar>

    </>
  );
};
