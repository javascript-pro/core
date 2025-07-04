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
  FormGroup,
  FormControlLabel,
  Checkbox,
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
  useFallmanagerSlice,
} from '../../Fallmanager';
import { updateMemory } from '../actions/updateMemory';

const ALL_STATUSES = ['in_review', 'in_progress', 'completed', 'archived'];

export default function Fallliste() {
  const slice = useFallmanagerSlice();
  const memory =
    slice?.memory && typeof slice.memory === 'object' ? slice.memory : {};

  const [docs, setDocs] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(
    typeof memory.search === 'string' ? memory.search : '',
  );
  const [visibleStatuses, setVisibleStatuses] = useState<string[]>(
    Array.isArray(memory.visibleStatuses)
      ? memory.visibleStatuses
      : ALL_STATUSES,
  );

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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    dispatch(updateMemory({ search: value }));
  };

  const handleStatusToggle = (status: string) => {
    const next = visibleStatuses.includes(status)
      ? visibleStatuses.filter((s) => s !== status)
      : [...visibleStatuses, status];
    setVisibleStatuses(next);
    dispatch(updateMemory({ visibleStatuses: next }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_review':
        return { icon: 'star', color: 'secondary' };
      case 'in_progress':
        return { icon: 'work', color: 'secondary' };
      case 'completed':
        return { icon: 'tick', color: 'secondary' };
      case 'archived':
        return { icon: 'delete', color: 'secondary' };
      default:
        return { icon: 'settings', color: 'secondary' };
    }
  };

  const filteredDocs = docs.filter(
    (doc) =>
      doc.clientName?.toLowerCase().includes(search.toLowerCase()) &&
      visibleStatuses.includes(doc.status),
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
                <MightyButton
                  label={t('SEED_DATABASE')}
                  variant="contained"
                  icon="api"
                  onClick={handleSeed}
                />
                <MightyButton
                  label={t('NEW_CASE')}
                  variant="contained"
                  icon="case"
                  onClick={handleNewCase}
                />
                <MightyButton
                  label={t('NEW_AI_CASE')}
                  variant="contained"
                  icon="aicase"
                  onClick={handleAIAssistClick}
                />
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
          <Toolbar sx={{ px: 2, flexWrap: 'wrap', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                flexGrow: 1,
              }}
            >
              <TextField
                size="small"
                label={t('FIND_CASE')}
                variant="outlined"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />

              <FormGroup row>
                {ALL_STATUSES.map((status) => {
                  const { icon, color } = getStatusIcon(status);
                  return (
                    <FormControlLabel
                      key={status}
                      control={
                        <Checkbox
                          checked={visibleStatuses.includes(status)}
                          onChange={() => handleStatusToggle(status)}
                        />
                      }
                      label={
                        <Box display="flex" alignItems="center">
                          <Icon icon={icon as any} color={color} />
                        </Box>
                      }
                    />
                  );
                })}
              </FormGroup>
            </Box>

            <Stack direction="row" spacing={1}>
              <MightyButton
                label={t('NEW_CASE')}
                variant="outlined"
                icon="case"
                onClick={handleNewCase}
              />
              <MightyButton
                label={t('NEW_AI_CASE')}
                variant="contained"
                icon="aicase"
                onClick={handleAIAssistClick}
              />
            </Stack>
          </Toolbar>

          <List>
            {filteredDocs.map((doc) => {
              const icon = getStatusIcon(doc.status);
              return (
                <ListItem key={doc.id} disablePadding>
                  <ListItemButton onClick={() => handleClick(doc)}>
                    <Card sx={{ mx: 1, width: '100%' }}>
                      <CardHeader
                        avatar={<Icon icon="case" />}
                        title={
                          <Typography variant="body1" noWrap>
                            {doc.clientName}
                          </Typography>
                        }
                        action={
                          <Tooltip title={doc.status || t('UNKNOWN')}>
                            <Box sx={{ pr: 1, pt: 1 }}>
                              <Icon
                                icon={icon.icon as any}
                                color={icon.color}
                              />
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
