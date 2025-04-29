'use client';
import React from 'react';
import { 
  Box, 
  Divider,
  List,
  Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  NavItem,
} from "../";

export type TFooter = {
}

export default function Footer({
}: TFooter) {
  
  const router = useRouter();

  return (
    <Box component="footer" sx={{
        mt: 8, 
        py: 6,
    }}>
      <Container maxWidth="md">
        <Divider sx={{my:1}} />
        <Grid container spacing={2}>
          
            <Grid size={{
                "xs": 12,
                "sm": 6,
                "md": 3,
            }}>
              <Typography variant="body1" gutterBottom sx={{mt:1}}>
                Goldlabel Apps Ltd
              </Typography>
              <Typography variant="body2">321-323 High Road</Typography>
              <Typography variant="body2">Essex RM6 6AX</Typography>
              <Typography variant="body2">UK Company No. 15460545</Typography>
              <Typography variant="body2">Reg. in England and Wales</Typography>
          </Grid>

          <Grid size={{
                "xs": 12,
                "sm": 6,
                "md": 3,
            }}>
            
            <List dense>
              <NavItem 
                label="Work"
                icon="work"
                onClick={() => {
                  router.push("/work");
                }}
              />
              <NavItem 
                label="Life"
                icon="life"
                onClick={() => {
                  router.push("/life")
                }}
              />
              <NavItem 
                label="Balance"
                icon="balance"
                onClick={() => {
                  router.push("/balance")
                }}
              />
            </List>
          </Grid>

          <Grid size={{
            "xs": 12,
            "sm": 6,
            "md": 3,
          }}>

            <List dense>
              <NavItem 
                label="Privacy"
                icon="admin"
                onClick={() => {
                  router.push("/work/company/privacy-cookies")
                }}
              />
            </List>
          </Grid>

          <Grid size={{
                "xs": 12,
                "sm": 6,
                "md": 3,
            }}>
            
            <List dense>
              <NavItem 
                label="GitHub"
                icon="github"
                onClick={() => {
                  window.open("https://github.com/goldlabel-apps", "_blank");
                }}
              />
            </List>

          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
