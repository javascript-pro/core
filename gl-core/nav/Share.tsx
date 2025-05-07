'use client';
import * as React from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardHeader,
  CardMedia,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  MightyButton,
  useSlice,
  useDispatch,
  setUbereduxKey,
  useIsMobile,
  Icon,
} from '../';

export type TShare = {
  label?: string | null;
  frontmatter?: any;
}

export default function Share({
    frontmatter = null
}: TShare) {
  const dispatch = useDispatch();
  const slice = useSlice();
  const {modalShare} = slice;
  const isMobile = useIsMobile();

  const closeModalShare = () => dispatch(setUbereduxKey({ key: "modalShare", value: false }));
  const openModalShare = () => dispatch (setUbereduxKey({ key: "modalShare", value: true }))

  if (!frontmatter) return null;

  return <>
          <MightyButton 
            color="secondary"
            label="Share"
            icon="share"
            onClick={openModalShare}
          />

            <Dialog 
              fullWidth
              maxWidth="xs"
              fullScreen={isMobile ? true : false}
              open={modalShare as boolean}
              onClose={closeModalShare}
            >

              <DialogTitle>
                Sharing
              </DialogTitle>
              <DialogContent>

              <Box>
                <CardHeader 
                  title={frontmatter.title}
                  subheader={frontmatter.description}
                />
                <CardMedia 
                  height={100}
                  component={"img"}
                  src={frontmatter.image}
                />
              </Box>

              {/* <pre>
                frontmatter: { JSON.stringify(frontmatter, null, 2) }
              </pre> */}
              
              <List dense>


                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon="facebook" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Facebook"
                  />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon="linkedin" />
                  </ListItemIcon>
                  <ListItemText
                    primary="LinkedIn"
                  />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon="whatsapp" />
                  </ListItemIcon>
                  <ListItemText
                    primary="WhatsApp"
                  />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon="copy" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Copy Link"
                  />
                </ListItemButton>
                
              </List>

            </DialogContent>

            <DialogActions>
              {isMobile ? <><IconButton onClick={closeModalShare}>
                  <Icon icon="close" />
                </IconButton></> 
              : <>
              
              <MightyButton 
                label="Close"
                icon="close"
                variant="outlined" 
                onClick={closeModalShare}
              />

              </>}
            </DialogActions>

          </Dialog>
        </>
}
