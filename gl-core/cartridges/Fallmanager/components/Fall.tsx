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
  Stack,
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

  const renderEditableRow = (field: string, label: string) => (
    <Box display="flex" alignItems="center" mb={2}>
      <Box mr={2}>
        {fallData?.[field] ? (
          <Icon icon="tick" />
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
            <Icon icon={icon as any} color={color} />
          </Box>
          <Typography variant="body2">{label}</Typography>
        </Box>
        <Switch
          checked={val}
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
          {val ? <Icon icon="tick" /> : <Icon icon="close" color="warning" />}
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
                  onChange={async (e) => {
                    await handleUpdate('status', e.target.value);
                    router.push('/fallmanager');
                  }}
                >
                  {['in_review', 'in_progress', 'completed', 'archived'].map(
                    (status) => {
                      const { icon, color } = getStatusIcon(status);
                      return (
                        <MenuItem key={status} value={status}>
                          <Box display="flex" alignItems="center">
                            <Icon icon={icon as any} color={color} />
                            <Box ml={1}>
                              {t(`STATUS_${status.toUpperCase()}`)}
                            </Box>
                          </Box>
                        </MenuItem>
                      );
                    },
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'block' }}>
              <Typography variant="button" mb={0.5}>
                {completion}% {t('COMPLETED')}
              </Typography>
              <LinearProgress variant="determinate" value={completion} />
            </Box>
          </>
        }
        action={
          <Stack direction="row" spacing={2}>
            <MightyButton
              mode="icon"
              icon="delete"
              onClick={handleDelete}
              label={t('DELETE')}
            />
            <MightyButton
              icon="close"
              variant="contained"
              onClick={handleCancel}
              label={t('SAVE_AND_CLOSE')}
            />
          </Stack>
        }
      />

      <CardContent>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
          gap={2}
        >
          <Card>
            <CardHeader title={t('SECTION_BASIC_INFO')} />
            <CardContent>
              {renderEditableRow('clientName', t('CLIENT_NAME'))}
              {renderEditableRow('insuranceCompany', t('INSURANCE_COMPANY'))}
              {renderEditableRow('policyNumber', t('POLICY_NUMBER'))}
              {renderEditableRow('claimNumber', t('CLAIM_NUMBER'))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader title={t('SECTION_ACCIDENT_DETAILS')} />
            <CardContent>
              {renderDateRow('dateOfAccident', t('DATE_OF_ACCIDENT'))}
              {renderEditableRow('carRegistration', t('CAR_REGISTRATION'))}
              {renderEditableRow('placeOfAccident', t('PLACE_OF_ACCIDENT'))}
              {renderEditableRow(
                'policeReportNumber',
                t('POLICE_REPORT_NUMBER'),
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader title={t('SECTION_DOCUMENTS')} />
            <CardContent>
              {renderBooleanSwitch('accidentReport', t('ACCIDENT_REPORT'))}
              {renderBooleanSwitch('damageAssessment', t('DAMAGE_ASSESSMENT'))}
              {renderBooleanSwitch(
                'repairInvoiceReceived',
                t('REPAIR_INVOICE'),
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader title={t('SECTION_OPPOSING_PARTY')} />
            <CardContent>
              {renderEditableRow('opposingInsurance', t('OPPOSING_INSURANCE'))}
              {renderEditableRow(
                'opposingClaimNumber',
                t('OPPOSING_CLAIM_NUMBER'),
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader title={t('SECTION_SETTLEMENT')} />
            <CardContent>
              {renderBooleanSwitch(
                'settlementLetterReceived',
                t('SETTLEMENT_LETTER'),
              )}
            </CardContent>
          </Card>
        </Box>
      </CardContent>
    </>
  );
}
