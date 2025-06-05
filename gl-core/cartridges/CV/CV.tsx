'use client';
import * as React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  MightyButton,
  Icon,
  Advert,
  useIsMobile,
  useSlice,
  useDispatch,
  routeTo,
  RenderMarkdown,
} from '../../';
import { JD, setAppMode, setCVKey, Download, Completion } from '../CV';

export type TCV = {
  mode: 'alert' | 'advert' | 'app' | null;
  title?: string | null;
  markdown?: string | null;
};

export default function CV({
  mode = null,
  markdown = 'no markdown. no problem.',
}: TCV) {
  const dispatch = useDispatch();
  const cvSlice = useSlice().cv;
  const { appMode, showJD } = cvSlice;
  const router = useRouter();
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (markdown) {
      dispatch(setCVKey('cvMarkdown', markdown));
    }
  }, [markdown]);

  if (mode === 'advert')
    return (
      <Advert
        icon="doc"
        title={'C.V.'}
        description={'Simple AI tool to match your Job to our CV'}
        onClick={() => {
          dispatch(routeTo('/cv', router));
        }}
      />
    );

  if (mode === 'app') {
    if (appMode === 'completion') {
      return <Completion />;
    }
  }

  return (
    <>
      <Box sx={{ mt: isMobile ? 1 : 2 }} />

      <Box
        sx={{
          display: 'flex',
          mx: 4,
        }}
      >
        {appMode === 'cv' ? (
          <MightyButton
            label="Match"
            icon="openai"
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(setCVKey('appMode', 'jd'));
              dispatch(setCVKey('showJD', !showJD));
            }}
          />
        ) : (
          <>
            <MightyButton
              label="View"
              icon="doc"
              color="primary"
              variant="contained"
              onClick={() => {
                dispatch(setCVKey('appMode', 'cv'));
                dispatch(setCVKey('showJD', false));
              }}
            />
            <Box sx={{ ml: 2 }}>
              <Download cv={markdown} />
            </Box>
          </>
        )}

        {appMode === 'cv' && (
          <Box sx={{ ml: 2, display: 'flex' }}>
            <Download cv={markdown} />
          </Box>
        )}
        <Box sx={{ ml: 1 }}>
          <MightyButton
            mode="icon"
            label="About"
            icon="about"
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(routeTo('/cv/about', router));
            }}
          />
        </Box>
      </Box>

      {showJD && (
        <Box sx={{ mx: 4 }}>
          <JD />
        </Box>
      )}

      {appMode === 'pristine' ? (
        <Box sx={{ mx: 4 }}>
          <List>
            <ListItemButton
              onClick={() => {
                dispatch(setAppMode('jd'));
              }}
            >
              <ListItemIcon>
                <Icon icon="openai" />
              </ListItemIcon>
              <ListItemText primary="Large Language Model Generated Job Fit AI" />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                dispatch(setAppMode('cv'));
              }}
              color="secondary"
            >
              <ListItemIcon>
                <Icon icon="doc" />
              </ListItemIcon>
              <ListItemText primary="View and Download our CV" />
            </ListItemButton>
          </List>
        </Box>
      ) : (
        appMode === 'cv' &&
        !showJD && (
          <Box sx={{ mt: 2 }}>
            <RenderMarkdown>{markdown}</RenderMarkdown>
          </Box>
        )
      )}
    </>
  );
}
