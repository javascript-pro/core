'use client';
import * as React from 'react';
import {
  CssBaseline,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Container,
  Box,
  ButtonBase,
  Typography,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert,
  IconButton,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { Theme, useDispatch, Icon } from '../../../gl-core';
import {
  Header,
  useFallmanagerSlice,
  incomingCases,
  incomingFiles,
  useLingua,
  updateAssist,
  Files,
} from '../Fallmanager';
import { db } from '../../lib/firebase';

const steps = ['Select PDF', 'PDF Selected', 'Uploading...', 'Uploaded'];

export default function Fallmanager() {
  const dispatch = useDispatch();
  const t = useLingua();
  const { theme, files, assist } = useFallmanagerSlice();

  const [file, setFile] = useState<File | null>(null);
  const [uploadedDoc, setUploadedDoc] = useState<any>(null);
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
    setUploadedDoc(null);
    dispatch(updateAssist({ reset: true }));
  };

  const uploadFile = async (file: File) => {
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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/gl-api/fallmanager/hochladen', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unknown upload error');
      }

      setUploadedDoc(data);

      dispatch(
        updateAssist({
          step: 3,
          feedback: {
            severity: 'success',
            title: 'Upload complete',
            message: `File ID: ${data.docId}`,
          },
        }),
      );
    } catch (err: any) {
      console.error('Upload failed:', err);
      dispatch(
        updateAssist({
          feedback: {
            severity: 'error',
            title: 'Upload failed',
            message: err.message || 'Something went wrong',
          },
        }),
      );
    }
  };

  const handleYes = () => {
    if (!file) {
      dispatch(
        updateAssist({
          feedback: {
            severity: 'error',
            title: 'No file found',
            message: 'Please select a file again.',
          },
        }),
      );
      return;
    }

    uploadFile(file);
  };

  const getStep = () => assist.step ?? 0;
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

  useEffect(() => {
    if (assist.step === 3) {
      const timeout = setTimeout(() => handleCancel(), 5000);
      return () => clearTimeout(timeout);
    }
  }, [assist.step]);

  return (
    <Theme theme={theme}>
      <CssBaseline />
      <Container>
        <Header />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              {/* <CardHeader 
                title="New File"
                subheader="Select PDF"
              /> */}
              <CardContent>
                {assist.step < 1 && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                    <ButtonBase
                      sx={{
                        width: '100%',
                        p: 2,
                        my: 3,
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Icon icon="upload" color="primary" />
                      <Typography variant="body2">Select PDF</Typography>
                    </ButtonBase>
                  </>
                )}

                {assist.step >= 1 && assist.feedback?.title && (
                  <Alert severity={assist.feedback.severity || 'successs'}>
                    <strong>{assist.feedback.title}</strong>
                    {assist.feedback.message && (
                      <>
                        <br />
                        {assist.feedback.message}
                      </>
                    )}
                    {assist.selected?.name && (
                      <>
                        <br />
                        <em>{assist.selected.name}</em>
                      </>
                    )}
                  </Alert>
                )}

                {assist.step === 1 && assist.selected && (
                  <Box>
                    <Typography variant="body1">
                      {assist.selected.name}
                    </Typography>
                    <Typography variant="body2">
                      {assist.selected.type} ·{' '}
                      {(assist.selected.size / 1024).toFixed(1)} KB
                    </Typography>
                  </Box>
                )}

                {uploading && <LinearProgress />}

                {assist.step === 3 && uploadedDoc && (
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      overflow: 'auto',
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Uploaded Document
                    </Typography>
                    <pre style={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(uploadedDoc, null, 2)}
                    </pre>
                  </Box>
                )}

                {assist.step === 1 && (
                  <Button
                    onClick={handleYes}
                    variant="contained"
                    color="primary"
                    disabled={uploading}
                  >
                    YES
                  </Button>
                )}

                {(file || assist.step) && (
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={handleCancel} color="secondary">
                      <Icon icon="close" />
                    </IconButton>
                  </Box>
                )}

                <Stepper activeStep={getStep()}>
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Files />
          </Grid>
        </Grid>

        {/* <pre>files: {JSON.stringify(files, null, 2)}</pre>
        <pre>{JSON.stringify(assist, null, 2)}</pre> */}
      </Container>
    </Theme>
  );
}
