'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Chip,
  TextField,
  Toolbar,
} from '@mui/material';
import {
  collection,
  onSnapshot,
  DocumentData,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Icon, MightyButton, useDispatch } from '../../../../gl-core';
import {
  useLingua,
  setzeAktuellerFall,
  toggleNewCase,
  seedFirebase,
} from '../../Fallmanager';

export default function Fallliste() {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
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

  const handleAiHelp = () => {
    console.log('handleAiHelp');
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

  const filteredDocs = docs.filter((doc) =>
    doc.clientName?.toLowerCase().includes(search.toLowerCase()),
  );

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
        <>
          <Toolbar
            sx={{ px: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}
          >
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <MightyButton
                label={t('NEW_CASE')}
                icon="plus"
                onClick={handleNewCase}
              />

              <MightyButton
                label={t('NEW_WITH_AI')}
                icon="openai"
                onClick={handleAiHelp}
              />
            </Stack>
            <TextField
              size="small"
              label={t('SEARCH')}
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Toolbar>

          <List>
            {filteredDocs.map((doc) => {
              const completion = getCompletion(doc);

              return (
                <ListItem key={doc.id} disablePadding>
                  <ListItemButton onClick={() => handleClick(doc)}>
                    <Card sx={{ mx: 1, width: '100%' }}>
                      <CardHeader
                        avatar={<Icon icon="case" color="secondary" />}
                        title={
                          <Typography variant="body1" noWrap>
                            {doc.clientName}
                          </Typography>
                        }
                        action={
                          <Chip
                            label={`${completion}% ${t('COMPLETED')}`}
                            variant="outlined"
                            size="small"
                            color="primary"
                            sx={{ fontWeight: 500, height: 24 }}
                          />
                        }
                      />
                    </Card>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Box>
  );
}
