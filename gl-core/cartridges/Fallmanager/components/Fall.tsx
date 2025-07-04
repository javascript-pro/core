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
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
import { useDispatch } from '../../../../gl-core';

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
      <Box flexGrow={1}>
        <BearbeitbarText
          label={label}
          value={fallData?.[field]}
          onSave={(newVal) => handleUpdate(field, newVal)}
        />
      </Box>
      <Box ml={2}>
        {fallData?.[field] ? (
          <CheckIcon color="success" />
        ) : (
          <CloseIcon color="error" />
        )}
      </Box>
    </Box>
  );

  return (
    <Card>
      <CardHeader
        title={fallData.clientName || t('CLIENT_NAME')}
        subheader={`ID: ${id}`}
        action={
          <Box>
            <IconButton onClick={handleDelete} title={t('DELETE')}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleCancel} title={t('CANCEL')}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
        }
      />
      <CardContent>
        <Box mb={2}>
          <Typography variant="body2">
            {t('COMPLETION')}: {completion}%
          </Typography>
          <LinearProgress variant="determinate" value={completion} />
        </Box>

        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>{t('STATUS')}</InputLabel>
          <Select
            value={fallData.status || ''}
            label={t('STATUS')}
            onChange={(e) => handleUpdate('status', e.target.value)}
          >
            <MenuItem value="in_review">{t('STATUS_IN_REVIEW')}</MenuItem>
            <MenuItem value="in_progress">{t('STATUS_IN_PROGRESS')}</MenuItem>
            <MenuItem value="completed">{t('STATUS_COMPLETED')}</MenuItem>
            <MenuItem value="archived">{t('STATUS_ARCHIVED')}</MenuItem>
          </Select>
        </FormControl>

        {renderEditableRow('clientName', t('CLIENT_NAME'))}
        {renderEditableRow('carRegistration', t('CAR_REGISTRATION'))}
        {renderEditableRow('dateOfAccident', t('DATE_OF_ACCIDENT'))}
        {renderEditableRow('placeOfAccident', t('PLACE_OF_ACCIDENT'))}
        {renderEditableRow('insuranceCompany', t('INSURANCE_COMPANY'))}
        {renderEditableRow('policyNumber', t('POLICY_NUMBER') || 'Policy Number')}
        {renderEditableRow('claimNumber', t('CLAIM_NUMBER'))}
      </CardContent>
    </Card>
  );
}
