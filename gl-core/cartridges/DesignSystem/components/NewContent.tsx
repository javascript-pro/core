// /Users/goldlabel/GitHub/core/gl-core/cartridges/DesignSystem/components/NewContent.tsx
'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Typography, Alert, ButtonBase } from '@mui/material';
import { Icon, routeTo, useDispatch } from '../../../../gl-core';
import { useBySlug } from '../../Uberedux';
import { setDesignSystemKey } from '../../DesignSystem';

export interface INewContent {
  slug?: string;
}

export default function NewContent({ slug }: INewContent) {
  const content = useBySlug(slug || '');
  const dispatch = useDispatch();
  const router = useRouter();
  if (!content) return null;

  return (
    <ButtonBase
      sx={{
        textAlign: 'left',
        mb: 1,
        width: '100%',
      }}
      onClick={() => {
        dispatch(routeTo(slug as string, router));
        dispatch(setDesignSystemKey('dialog', null));
      }}
    >
      <Alert
        sx={{ width: '100%', border: 0 }}
        severity="success"
        icon={
          <Badge color="primary" badgeContent="New">
            <Icon icon={content.icon || 'home'} color="inherit" />
          </Badge>
        }
      >
        <Typography variant="body1">{content.title}</Typography>
        <Typography variant="body2" noWrap>
          {content.excerpt}
        </Typography>
      </Alert>
    </ButtonBase>
  );
}
