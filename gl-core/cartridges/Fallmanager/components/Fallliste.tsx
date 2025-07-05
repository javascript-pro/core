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
  TextField,
  Toolbar,
  Tooltip,
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
  toggleAICase,
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

  const handleAIAssistClick = () => {
    dispatch(toggleAICase(true));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_review':
        return { icon: 'warning', color: 'info' };
      case 'in_progress':
        return { icon: 'work', color: 'warning' };
      case 'completed':
        return { icon: 'tick', color: 'success' };
      case 'archived':
        return { icon: 'delete', color: 'disabled' };
      default:
        return { icon: 'settings', color: 'action' };
    }
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
                variant="contained"
                color="secondary"
                icon="case"
                onClick={handleNewCase}
              />

              <MightyButton
                label={t('NEW_WITH_AI')}
                variant="contained"
                color="secondary"
                icon="aicase"
                onClick={handleAIAssistClick}
              />
            </Stack>
            <TextField
              size="small"
              label={t('FIND_CASE')}
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Toolbar>

          <List>
            {filteredDocs.map((doc) => {
              const icon = getStatusIcon(doc.status);
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
                          <Tooltip title={doc.status || t('UNKNOWN')}>
                            <Box sx={{ pr: 1, pt: 1 }}>
                              {doc.status}
                              <Icon icon={icon.icon as any} color={icon.color} />
                            </Box>
                          </Tooltip>
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
