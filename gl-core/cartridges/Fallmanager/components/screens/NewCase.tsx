import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caseSchema } from '../../../../lib/schemas/caseSchema';
import { z } from 'zod';
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import {createFall} from '../../../Fallmanager';

export type CaseFormValues = z.infer<typeof caseSchema>;

export default function NewCase() {
  const methods = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      caseClosed: false,
      metadata: {
        mandateReceived: false
      },
      client: {
        isDriver: false,
        isOwner: false
      },
      insurance: {
        damageClaimReported: false,
        acknowledged: false
      },
      policeReport: {
        reportAvailable: false
      },
      expertOpinion: {
        appointed: false,
        reportDelivered: false,
        damageValue: 0
      },
      damages: [],
      progress: {
        documentsReceived: [],
        correspondenceLog: [],
        actions: []
      }
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = async (data: CaseFormValues) => {
    try {
      await createFall(data as any);
      alert('Fall erfolgreich erstellt');
    } catch (err) {
      console.error(err);
      alert('Fehler beim Erstellen des Falls');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Neuen Fall anlegen
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            {/* Metadata Section */}
            <Typography variant="h6">Unfalldaten</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Aktenzeichen" fullWidth {...register('metadata.referenceNumber')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Unfalldatum" fullWidth {...register('metadata.accidentDate')} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Unfallort" fullWidth {...register('metadata.accidentLocation')} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Beschreibung"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('metadata.description')}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={<Checkbox {...register('metadata.mandateReceived')} />}
                  label="Mandat erhalten"
                />
              </Grid>
            </Grid>

            <Divider />

            {/* Client Section */}
            <Typography variant="h6">Mandant</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Vorname" fullWidth {...register('client.firstName')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Nachname" fullWidth {...register('client.lastName')} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Adresse" fullWidth {...register('client.address')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Telefon" fullWidth {...register('client.phone')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="E-Mail" fullWidth {...register('client.email')} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlLabel control={<Checkbox {...register('client.isDriver')} />} label="Ist Fahrer" />
                <FormControlLabel control={<Checkbox {...register('client.isOwner')} />} label="Ist Halter" />
              </Grid>
            </Grid>
          </Stack>

          <Box mt={4}>
            <Button type="submit" variant="contained" color="primary">
              Fall erstellen
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Container>
  );
}