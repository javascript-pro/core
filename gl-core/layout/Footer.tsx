// components/Footer.tsx
import React from 'react';
import { 
  Box, 
  List,
  Container, Grid, Typography } from '@mui/material';
import {
  NavItem,
} from "../";

export type TFooter = {
}

export default function Footer({
}: TFooter) {


  return (
    <Box component="footer" sx={{
        mt: 8, 
        py: 6,
    }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {/* Company Info */}
            <Grid size={{
                "xs": 12,
                "sm": 6,
                "md": 3,
            }}>
              <Typography variant="h6" gutterBottom sx={{mt:1}}>
                Goldlabel Apps Ltd
              </Typography>
              <Typography variant="body2">321-323 High Road</Typography>
              <Typography variant="body2">Essex RM6 6AX</Typography>
              <Typography variant="body2">UK Company No. 15460545</Typography>
              <Typography variant="body2">Reg. in England and Wales</Typography>
          </Grid>

          {/* Navigation */}
          <Grid size={{
                "xs": 12,
                "sm": 6,
                "md": 3,
            }}>
            
            <List dense>
              <NavItem 
                label="Home"
                icon="home"
              />
              <NavItem 
                label="Work"
                icon="work"
                onClick={() => {
                  console.log("/work")
                }}
              />
              <NavItem 
                label="Life"
                icon="life"
                onClick={() => {
                  console.log("/life")
                }}
              />
              <NavItem 
                label="Balance"
                icon="balance"
                onClick={() => {
                  console.log("/balance")
                }}
              />
            </List>
          </Grid>

          {/* Legal */}
          <Grid size={{
                "xs": 12,
                "sm": 6,
                "md": 3,
            }}>
            <List dense>
              <NavItem 
                label="Privacy"
                icon="admin"
              />
            </List>


          </Grid>

          {/* Social / Trust */}
          <Grid size={{
                "xs": 12,
                "sm": 6,
                "md": 3,
            }}>
            
            <List dense>
              <NavItem 
                label="GitHub"
                icon="github"
              />
            </List>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
