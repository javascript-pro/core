'use client';
// core/gl-core/cartridges/Fallmanager/components/cases/CasesList.tsx

import * as React from 'react';
import { db } from '../../../../../gl-core/lib/firebase';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, routeTo } from '../../../../../gl-core';
import { incomingChange, useFallmanager, Icon } from '../../../Fallmanager';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

export default function CasesList() {
  const dispatch = useDispatch();
  const slice = useFallmanager();
  const router = useRouter();
  const cases = slice?.cases || [];

  React.useEffect(() => {
    const q = query(
      collection(db, 'fallmanager'),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(incomingChange('cases', data));
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleItemClick = (item: any) => {
    if (item.id) {
      dispatch(routeTo(`/fallmanager/cases/${item.id}`, router));
    }
  };

  return (
    <Box>
      <List dense>
        {cases.length === 0 && (
          <ListItem>
            <ListItemText primary="No cases yet." />
          </ListItem>
        )}
        {cases.map((caseItem: any, i: number) => {
          const { caseClosed, createdAt, closedAt } = caseItem;

          const subheader =
            caseClosed && closedAt?.seconds
              ? `Closed on ${new Date(closedAt.seconds * 1000).toLocaleDateString()}`
              : createdAt?.seconds
                ? `Opened ${formatDistanceToNow(
                    new Date(createdAt.seconds * 1000),
                    { addSuffix: true },
                  )}`
                : 'Created just now';

          return (
            <ListItemButton
              key={`case_${i}`}
              onClick={() => handleItemClick(caseItem)}
            >
              <ListItemIcon>
                <Icon
                  icon={caseClosed ? 'caseclosed' : 'case'}
                  color="secondary"
                />
              </ListItemIcon>
              <ListItemText
                primary={caseItem.caseName || 'Unnamed Case'}
                secondary={subheader}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
