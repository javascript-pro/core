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
  useSlice,
  useDispatch,
  routeTo,
  RenderMarkdown,
} from '../../';
import { JD, setAppMode, resetCV, Download } from '../CV';

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
  const { appMode } = cvSlice;
  const router = useRouter();
  // console.log("markdown", markdown);

  const showAlert = true;
  const showToolbar = false;

  if (mode === 'app')
    return (
      <>
        <Box sx={{
          display: "flex",
          mx: 4,
        }}>
          
          { appMode !== 'pristine' && showToolbar && <MightyButton
            mode="icon"
            label="Reset"
            onClick={() => {
              dispatch(resetCV());
            }}
            icon="reset"
            color="secondary"
          /> }

          <Box sx={{ flexGrow: 1 }}/>
          { appMode === "cv" && <>
            <Box sx={{ mr: 2 }}>
              <Download cv={ markdown } />
            </Box>
          </> }

          
        </Box>

        { appMode === "jd" && <>
            <Box sx={{ mx: 4 }}>
              <JD />
            </Box>
          </> }

        { appMode === 'pristine' ? (
          <Box sx={{ mx: 4 }}>
            {/* <pre>appMode: {JSON.stringify(appMode, null, 2)}</pre>;  */}
            {/* <Typography variant="h6" gutterBottom>
              Need our CV, or something smarter?
            </Typography> */}

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
            {/* <Typography variant="body1">
              You can view and download our CV the traditional way. Or try our
              Job Fit AI — powered by a Large Language Model — to see how well
              we match a specific role. Paste in a job description and get an
              instant assessment.
            </Typography> */}
          </Box>
        ) : (
          <>
          { appMode === "cv" && <>
            <Box sx={{}}>
              <RenderMarkdown>
                {markdown}
              </RenderMarkdown>
            </Box>
          </> }
          
          </>
        )}
      </>
    );

  if (mode === 'advert')
    return (
      <Advert
        title={'C.V.'}
        description={'Try our Large Language Model Generated Job Fit AI'}
        onClick={() => {
          dispatch(routeTo('/cv', router));
        }}
      />
    );
  return <pre>cvSlice: {JSON.stringify(cvSlice, null, 2)}</pre>;
}
