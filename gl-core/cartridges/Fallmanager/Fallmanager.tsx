'use client';
import * as React from 'react';
import {
  CssBaseline,
  Container,
  Box,
  ButtonBase,
  Typography,
  Stack,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import {
  Theme,
  useDispatch,
} from '../../../gl-core';
import {
  Header,
  useFallmanagerSlice,
  incomingCases,
  incomingFiles,
  useLingua,
  updateAssist,
} from '../Fallmanager';
import { db } from '../../lib/firebase';

const steps = ['Start', 'File selected', 'Uploading'];

export default function Fallmanager() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { theme, files, assist } = useFallmanagerSlice();

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);

    if (selected) {
      const selectedFile = {
        name: selected.name,
        type: selected.type,
        size: selected.size,
        lastModified: selected.lastModified,
      };

      dispatch(
        updateAssist({
          selected: selectedFile,
          feedback: {
            severity: 'info',
            title: 'File selected. Ready to upload?',
            message: '',
          },
          step: 1,
        }),
      );
    }
  };

  const handleCancel = () => {
    setFile(null);
    dispatch(updateAssist({ reset: true }));
  };

  const handleYes = () => {
    dispatch(
      updateAssist({
        step: 2,
        feedback: {
          severity: 'success',
          title: 'Uploading...',
          message: '',
        },
      }),
    );
  };

  const getStep = () => assist.step ?? 0;

  const selectedFile = assist.selected;
  const uploading = assist.step >= 2;

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'fallmanager'),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updates: Record<string, any> = {};
        snapshot.forEach((doc) => {
          updates[doc.id] = { id: doc.id, ...doc.data() };
        });
        dispatch(incomingCases(updates));
      },
      (error) => {
        console.error('❌ Firestore subscription error (cases):', error);
      },
    );
    return () => unsub();
  }, [dispatch]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'files'),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updates: Record<string, any> = {};
        snapshot.forEach((doc) => {
          updates[doc.id] = { id: doc.id, ...doc.data() };
        });
        dispatch(incomingFiles(updates));
      },
      (error) => {
        console.error('❌ Firestore subscription error (files):', error);
      },
    );
    return () => unsub();
  }, [dispatch]);

  return (
    <Theme theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Header />

        <Box sx={{ my: 4 }}>
          <Stepper activeStep={getStep()} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="application/pdf"
          onChange={handleFileChange}
        />

        <Stack spacing={2} sx={{ my: 2 }}>
          {assist.step < 1 && (
            <ButtonBase
              onClick={() => fileInputRef.current?.click()}
              sx={{
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px dashed',
                borderColor: 'divider',
                backgroundColor: file ? 'background.paper' : 'action.hover',
                p: 2,
                textAlign: 'left',
              }}
            >
              {file?.name ? (
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2">{file.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {file.type} · {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Select file
                </Typography>
              )}
            </ButtonBase>
          )}

          {assist.step >= 1 && assist.feedback?.title && (
            <Alert severity={assist.feedback.severity || 'info'}>
              <strong>{assist.feedback.title}</strong>
              {assist.feedback.message && (
                <>
                  <br />
                  {assist.feedback.message}
                </>
              )}
            </Alert>
          )}

          {assist.step === 1 && selectedFile && (
            <Stack>
              <Typography variant="subtitle2">{selectedFile.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {selectedFile.type} · {(selectedFile.size / 1024).toFixed(1)} KB
              </Typography>
            </Stack>
          )}

          {uploading && <LinearProgress />}

          {assist.step === 1 && (
            <Button
              onClick={handleYes}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={uploading}
            >
              YES
            </Button>
          )}
        </Stack>

        {(file || assist.step) && (
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleCancel} color="secondary">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Container>
    </Theme>
  );
}
