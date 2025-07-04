'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardHeader,
  Button,
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
  LinearProgress,
  CardContent,
} from '@mui/material';
import {
  collection,
  onSnapshot,
  DocumentData,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Icon } from '../../../../gl-core';
import {
  useLingua,
  setzeAktuellerFall,
  toggleNewCase,
  seedFirebase,
} from '../../Fallmanager';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Fallliste() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useLingua();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(
      collection(db, 'fallmanager'),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (doc: DocumentData) => {
    dispatch(setzeAktuellerFall(doc as any));
    router.push(`/fallmanager/${doc.id}`);
  };

  const handleNewCase = () => {
    dispatch(toggleNewCase(true));
  };

  const handleSeed = () => {
    dispatch(seedFirebase());
  };

  const getCompletion = (doc: DocumentData): number => {
    const fieldsToCheck = [
      doc.clientName,
      doc.carRegistration,
      doc.dateOfAccident,
      doc.placeOfAccident,
      doc.insuranceCompany,
      doc.policyNumber,
      doc.claimNumber,
      doc.accidentReport,
      doc.damageAssessment,
      doc.repairInvoiceReceived,
      doc.settlementLetterReceived,
    ];
    const total = fieldsToCheck.length;
    const filled = fieldsToCheck.filter(Boolean).length;
    return Math.round((filled / total) * 100);
  };

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : docs.length === 0 ? (
        <Container sx={{ mt: 4 }}>
          <Alert
            sx={{ pt: 2 }}
            severity="info"
            action={
              <Stack direction="row" spacing={1}>
                <Button onClick={handleSeed} variant="outlined">
                  {t('SEED_DATABASE')}
                </Button>
                <Button onClick={handleNewCase} variant="outlined">
                  {t('FIRST_CASE')}
                </Button>
              </Stack>
            }
          >
            <AlertTitle>
              <Typography variant="h6">{t('NOT_FOUND')}</Typography>
            </AlertTitle>
          </Alert>
        </Container>
      ) : (
        <List disablePadding>
          {docs.map((doc) => {
            const completion = getCompletion(doc);
            const status =
              doc.status === 'in_review'
                ? t('STATUS_IN_REVIEW')
                : doc.status === 'in_progress'
                  ? t('STATUS_IN_PROGRESS')
                  : doc.status === 'completed'
                    ? t('STATUS_COMPLETED')
                    : doc.status === 'archived'
                      ? t('STATUS_ARCHIVED')
                      : '';

            return (
              <ListItem key={doc.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton onClick={() => handleClick(doc)}>
                  <Card sx={{ width: '100%' }}>
                    <CardHeader
                      avatar={<Icon icon="case" color="secondary" />}
                      title={
                        <Typography variant="body1" noWrap>
                          {doc.clientName}
                        </Typography>
                      }
                      subheader={
                        <Typography variant="body2" noWrap>
                          {doc.status}
                        </Typography>
                      }
                      action={
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          mb={0.5}
                        >
                          {completion}% {t('COMPLETED')}
                        </Typography>
                      }
                    />
                  </Card>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
