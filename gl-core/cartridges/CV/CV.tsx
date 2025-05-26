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
import { JD, setAppMode, setCVKey, resetCV, Download } from '../CV';

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
  // console.log("markdown", markdown);

  const showToolbar = false;

    if (mode === 'advert')
      return (
        <Advert
          title={'C.V.'}
          description={'A simple, useful AI tool to match a Job to our CV'}
          onClick={() => {
            dispatch(routeTo('/cv', router));
          }}
        />
    );

  if (mode === 'app')
    return (
      <>
        {/* <pre>cvSlice: {JSON.stringify(cvSlice, null, 2)}</pre> */}
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

          

              { appMode === "cv" ? <MightyButton 
                  mode="icon"
                  label="Paste job"
                  icon="job"
                  color="secondary"
                  onClick={() => {
                    dispatch(setCVKey("appMode", "jd"));
                    dispatch(setCVKey("showJD", !showJD));
                  }}
                /> : <MightyButton 
                  mode="icon"
                  label="View CV"
                  icon="doc"
                  color="secondary"
                  onClick={() => {
                    dispatch(setCVKey("appMode", "cv"));
                    dispatch(setCVKey("showJD", false));
                  }}
                />  }


            { appMode === "cv" && <>
              <Box sx={{ mr: 2, display: "flex" }}>
                <Download cv={ markdown } />
              </Box>
            </> }
          </Box>

        { showJD && <>
            <Box sx={{ mx: 4 }}>
              <JD />
            </Box>
          </> }

        { appMode === 'pristine' ? (
          <Box sx={{ mx: 4 }}>
           
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
            
          </Box>
        ) : (
          <>
          { appMode === "cv" && !showJD && <>
            <Box sx={{mt: 2}}>
              <RenderMarkdown>
                {markdown}
              </RenderMarkdown>
            </Box>
          </> }
          
          </>
        )}
      </>
    );

  return <pre>cvSlice: {JSON.stringify(cvSlice, null, 2)}</pre>;
}
