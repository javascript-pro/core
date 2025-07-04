'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  Chip,
  Stack,
  Grid,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import {
  doc,
  onSnapshot,
  DocumentData,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useLingua, BearbeitbarText } from '../../Fallmanager';
import { useDispatch, Icon } from '../../../../gl-core';

export default function Fall() {
  const pathname = usePathname();
  const id = pathname.split('/fallmanager/')[1];
  const router = useRouter();
  const t = useLingua();
  const dispatch = useDispatch();

  const [fallData, setFallData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'fallmanager', id), (snap) => {
      setFallData(snap.data() || null);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  if (loading || !fallData) return <LinearProgress />;

  const fieldsToCheck = [
    fallData.clientName,
    fallData.carRegistration,
    fallData.dateOfAccident,
    fallData.placeOfAccident,
    fallData.insuranceCompany,
    fallData.policyNumber,
    fallData.claimNumber,
    fallData.accidentReport,
    fallData.damageAssessment,
    fallData.repairInvoiceReceived,
    fallData.settlementLetterReceived,
  ];

  const totalFields = fieldsToCheck.length;
  const filledFields = fieldsToCheck.filter(Boolean).length;
  const completion = Math.round((filledFields / totalFields) * 100);

  const handleUpdate = (field: string, value: any) => {
    return updateDoc(doc(db, 'fallmanager', id), {
      [field]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleDelete = async () => {
    const confirm = window.confirm(t('DELETE_CONFIRM') || 'Are you sure?');
    if (!confirm) return;
    await deleteDoc(doc(db, 'fallmanager', id));
    router.push('/fallmanager');
  };

  const handleCancel = () => {
    router.push('/fallmanager');
  };

  const renderEditableRow = (field: string, label: string) => (
    <Box display="flex" alignItems="center" mb={2}>
      <Box mr={2}>
        {fallData?.[field] ? (
          <Icon icon="tick" color="secondary" />
        ) : (
          <Icon icon="close" color="warning" />
        )}
      </Box>
      <Box flexGrow={1}>
        <BearbeitbarText
          label={label}
          value={fallData?.[field]}
          onSave={(newVal) => handleUpdate(field, newVal)}
        />
      </Box>
    </Box>
  );

  const renderBooleanRow = (field: string, label: string) => {
    const val = fallData?.[field];
    const icon = val === true ? 'tick' : 'close';
    const color = val === true ? 'secondary' : 'warning';
    return (
      <Box display="flex" alignItems="center" mb={1}>
        <Box mr={2}>
          <Icon icon={icon} color={color} />
        </Box>
        <Typography variant="body2">{label}</Typography>
      </Box>
    );
  };

  return (
    <>
      <CardHeader
        // title={}
        avatar={
          <Stack direction="row" spacing={1}>
            <FormControl sx={{ minWidth: 180 }} size="small">
              <InputLabel>{t('STATUS')}</InputLabel>
              <Select
                value={fallData.status || ''}
                variant="standard"
                label={t('STATUS')}
                onChange={(e) => handleUpdate('status', e.target.value)}
              >
                <MenuItem value="in_review">{t('STATUS_IN_REVIEW')}</MenuItem>
                <MenuItem value="in_progress">
                  {t('STATUS_IN_PROGRESS')}
                </MenuItem>
                <MenuItem value="completed">{t('STATUS_COMPLETED')}</MenuItem>
                <MenuItem value="archived">{t('STATUS_ARCHIVED')}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        }
        action={
          <Stack direction="row" spacing={1}>
            <IconButton
              color="secondary"
              onClick={handleDelete}
              title={t('DELETE')}
            >
              <Icon icon="delete" />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={handleCancel}
              title={t('CANCEL')}
            >
              <Icon icon="cancel" />
            </IconButton>
          </Stack>
        }
      />

      <CardContent>
        <Grid container spacing={1} sx={{ border: '1px solid red' }}>
          <Grid
            sx={{ border: '1px solid green' }}
            size={{
              xs: 12,
            }}
          >
            <>
              <Typography variant="button" mb={0.5}>
                {completion}% {t('COMPLETED')}
              </Typography>
              <LinearProgress
                color="secondary"
                variant="determinate"
                value={completion}
              />
            </>
          </Grid>

          <Grid
            sx={{ border: '1px solid green' }}
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            {/* Grunddaten */}
            <Card>
              <CardHeader title={t('SECTION_BASIC_INFO')} />
              <CardContent>
                {renderEditableRow('clientName', t('CLIENT_NAME'))}
                {renderEditableRow('carRegistration', t('CAR_REGISTRATION'))}
              </CardContent>
            </Card>
          </Grid>

          <Grid
            sx={{ border: '1px solid orange' }}
            size={{
              xs: 12,
              sm: 6,
            }}
          >
            <Card>
              <CardHeader title={t('SECTION_DOCUMENTS')} />
              {/* Dokumente */}
              <CardContent>
                {renderBooleanRow('accidentReport', t('ACCIDENT_REPORT'))}
                {renderBooleanRow('damageAssessment', t('DAMAGE_ASSESSMENT'))}
                {renderBooleanRow('repairInvoiceReceived', t('REPAIR_INVOICE'))}
                {renderBooleanRow(
                  'settlementLetterReceived',
                  t('SETTLEMENT_LETTER'),
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Unfall & Versicherung */}
        <Typography variant="h6" mt={4} gutterBottom>
          {t('SECTION_ACCIDENT_INSURANCE')}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {renderEditableRow('dateOfAccident', t('DATE_OF_ACCIDENT'))}
        {renderEditableRow('placeOfAccident', t('PLACE_OF_ACCIDENT'))}
        {renderEditableRow('policeReportNumber', t('POLICE_REPORT_NUMBER'))}
        {renderEditableRow('insuranceCompany', t('INSURANCE_COMPANY'))}
        {renderEditableRow('policyNumber', t('POLICY_NUMBER'))}
        {renderEditableRow('claimNumber', t('CLAIM_NUMBER'))}
        {renderEditableRow('opposingInsurance', t('OPPOSING_INSURANCE'))}
        {renderEditableRow('opposingClaimNumber', t('OPPOSING_CLAIM_NUMBER'))}

        {/* Zeugen */}
        {fallData.witnesses?.length > 0 && (
          <>
            <Typography variant="h6" mt={4} gutterBottom>
              {t('SECTION_WITNESSES')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box>
              {fallData.witnesses.map((w: any, idx: number) => (
                <Chip
                  key={idx}
                  label={`${w.name} (${w.contact})`}
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </>
  );
}
