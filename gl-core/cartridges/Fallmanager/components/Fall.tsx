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
  Stack,
  Grid,
  Switch,
  TextField,
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
import { useDispatch, Icon, MightyButton } from '../../../../gl-core';

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
    const confirm = window.confirm(t('DELETE_CONFIRM'));
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

  const renderBooleanSwitch = (field: string, label: string) => {
    const val = Boolean(fallData?.[field]);
    const icon = val ? 'tick' : 'close';
    const color = val ? 'secondary' : 'warning';

    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <Icon icon={icon} color={color} />
          </Box>
          <Typography variant="body2">{label}</Typography>
        </Box>
        <Switch
          checked={val}
          color="secondary"
          onChange={(e) => handleUpdate(field, e.target.checked)}
        />
      </Box>
    );
  };

  const renderDateRow = (field: string, label: string) => {
    const val = fallData?.[field] || '';

    return (
      <Box display="flex" alignItems="center" mb={2}>
        <Box mr={2}>
          {val ? (
            <Icon icon="tick" color="secondary" />
          ) : (
            <Icon icon="close" color="warning" />
          )}
        </Box>
        <Box flexGrow={1}>
          <TextField
            label={label}
            type="date"
            size="small"
            fullWidth
            value={val.slice(0, 10)}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleUpdate(field, e.target.value)}
          />
        </Box>
      </Box>
    );
  };

  return (
    <>
      <CardHeader
        avatar={
          <>
            <Box sx={{ mr: 2 }}>
              <FormControl size="small">
                <InputLabel>{t('STATUS')}</InputLabel>
                <Select
                  value={fallData.status || ''}
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
            </Box>
            <Box sx={{ display: 'block' }}>
              <Typography variant="button" mb={0.5}>
                {completion}% {t('COMPLETED')}
              </Typography>
              <LinearProgress
                color="secondary"
                variant="determinate"
                value={completion}
              />
            </Box>
          </>
        }
        action={
          <Stack direction="row" spacing={2}>

            <MightyButton 
              icon="delete"
              onClick={handleDelete}
              label={t('DELETE')}
            />

            <MightyButton 
              icon="close"
              onClick={handleCancel}
              label={t('SAVE_AND_CLOSE')}
            />

          </Stack>
        }
      />

      <CardContent>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card>
              <CardHeader title={t('SECTION_BASIC_INFO')} />
              <CardContent>
                {renderEditableRow('clientName', t('CLIENT_NAME'))}
                {renderEditableRow('insuranceCompany', t('INSURANCE_COMPANY'))}
                
              </CardContent>
            </Card>

            <Card sx={{ my: 2 }}>
              <CardHeader title={t('SECTION_DOCUMENTS')} />
              <CardContent>
                {renderBooleanSwitch('accidentReport', t('ACCIDENT_REPORT'))}
                {renderBooleanSwitch(
                  'damageAssessment',
                  t('DAMAGE_ASSESSMENT'),
                )}
                {renderBooleanSwitch(
                  'repairInvoiceReceived',
                  t('REPAIR_INVOICE'),
                )}
                {renderBooleanSwitch(
                  'settlementLetterReceived',
                  t('SETTLEMENT_LETTER'),
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Card>
              <CardHeader title={t('SECTION_ACCIDENT_INSURANCE')} />
              <CardContent>
                {renderDateRow('dateOfAccident', t('DATE_OF_ACCIDENT'))}
                {renderEditableRow('carRegistration', t('CAR_REGISTRATION'))}
                {renderEditableRow('policyNumber', t('POLICY_NUMBER'))}
                {renderEditableRow('placeOfAccident', t('PLACE_OF_ACCIDENT'))}
                {renderEditableRow(
                  'policeReportNumber',
                  t('POLICE_REPORT_NUMBER'),
                )}
                {renderEditableRow('claimNumber', t('CLAIM_NUMBER'))}
                {renderEditableRow(
                  'opposingInsurance',
                  t('OPPOSING_INSURANCE'),
                )}
                {renderEditableRow(
                  'opposingClaimNumber',
                  t('OPPOSING_CLAIM_NUMBER'),
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
}
