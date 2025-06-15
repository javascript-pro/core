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
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

export default function CasesList() {
  const dispatch = useDispatch();
  const slice = useFallmanager();
  const router = useRouter();
  const cases = slice?.cases || [];

  React.useEffect(() => {
    const q = query(
      collection(db, 'fallmanager'),
      // where('caseClosed', '!=', true),
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
          // console.log("caseItem", caseItem.)
          const { caseClosed } = caseItem;
          // if (caseClosed) return null;

          const timeAgo = caseItem.createdAt?.seconds
            ? formatDistanceToNow(new Date(caseItem.createdAt.seconds * 1000), {
                addSuffix: true,
              })
            : 'just now';

          return (
            <ListItemButton
              key={`case_${i}`}
              onClick={() => {
                handleItemClick(caseItem);
              }}
            >
              <ListItemIcon>
                <Icon icon={caseClosed ? "caseclosed" : "case"} color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary={caseItem.caseName || 'Unnamed Case'}
                secondary={`Created ${timeAgo}`}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
