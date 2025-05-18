'use client';

import * as React from 'react';
import {
  Box,
  IconButton,
  Dialog,
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
} from '../../../gl-core';

import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';

export type TShare = {
  frontmatter?: {
    title?: string;
    description?: string;
    image?: string;
    slug?: string;
  };
  body?: string;
};

export default function Share({ frontmatter = null, body = '' }: TShare) {
  const dispatch = useDispatch();
  const slice = useSlice();
  const { modalShare } = slice;
  const isMobile = useIsMobile();

  const [copied, setCopied] = React.useState(false);

  const closeModalShare = () =>
    dispatch(setUbereduxKey({ key: 'modalShare', value: false }));
  const openModalShare = () =>
    dispatch(setUbereduxKey({ key: 'modalShare', value: true }));

  if (!frontmatter || !frontmatter.slug) return null;

  const shareUrl = `https://goldlabel.pro/${frontmatter.slug}`;
  const shareTitle = frontmatter.title || 'Check this out';
  const shareDescription =
    frontmatter.description ||
    'A new project from Goldlabel — modern software, real results.';
  const shareImage = frontmatter.image?.startsWith('http')
    ? frontmatter.image
    : `https://goldlabel.pro${frontmatter.image || '/png/test.png'}`;

  const fullWidth = { display: 'block', width: '100%' };

  return (
    <>
      <MightyButton
        mode="icon"
        color="secondary"
        label="Share"
        icon="share"
        onClick={openModalShare}
      />

      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={isMobile}
        open={modalShare as boolean}
        onClose={closeModalShare}
      >
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <CardHeader
              title={`Share: ${shareTitle}`}
              subheader={shareDescription}
            />
            <CardMedia
              component="img"
              height="200"
              image={shareImage}
              alt={shareTitle}
            />
          </Box>

          <List dense>
            <ListItemButton
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <ListItemIcon>
                <Icon icon="copy" />
              </ListItemIcon>
              <ListItemText primary={copied ? 'Copied!' : 'Copy Link'} />
            </ListItemButton>

            <FacebookShareButton url={shareUrl} style={fullWidth}>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="facebook" />
                </ListItemIcon>
                <ListItemText primary="Facebook" />
              </ListItemButton>
            </FacebookShareButton>

            <LinkedinShareButton
              url={shareUrl}
              title={shareTitle}
              summary={shareDescription}
              source="Goldlabel"
              style={fullWidth}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="linkedin" />
                </ListItemIcon>
                <ListItemText primary="LinkedIn" />
              </ListItemButton>
            </LinkedinShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={shareTitle}
              separator=" - "
              style={fullWidth}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon="whatsapp" />
                </ListItemIcon>
                <ListItemText primary="WhatsApp" />
              </ListItemButton>
            </WhatsappShareButton>
          </List>
        </DialogContent>

        <DialogActions>
          {isMobile ? (
            <IconButton onClick={closeModalShare}>
              <Icon icon="close" />
            </IconButton>
          ) : (
            <MightyButton
              mode="icon"
              label="Close"
              icon="close"
              variant="outlined"
              onClick={closeModalShare}
            />
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
