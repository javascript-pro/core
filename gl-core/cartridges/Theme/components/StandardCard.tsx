// /Users/goldlabel/GitHub/core/gl-core/cartridges/Theme/components/StandardCard.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Icon, routeTo, useContent, useDispatch } from '../../../../gl-core';

export type TStandardCards = {
  slug: string;
};

export function StandardCard({ slug }: TStandardCards) {
  const router = useRouter();
  const dispatch = useDispatch();
  const content = useContent(slug);
  const [expanded, setExpanded] = React.useState(false);

  if (!content) return null;

  const { title, excerpt, image, icon, description } = content;

  return (
    <Card
      sx={{
        width: '100%',
        cursor: 'pointer',
        borderRadius: 3,
        overflow: 'hidden',
      }}
      variant="outlined"
      onClick={() => {
        dispatch(routeTo(slug, router));
      }}
    >
      <CardHeader
        avatar={<Icon icon={icon as any} color="primary" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="h6">{title}</Typography>}
        subheader={
          <Typography variant="caption" noWrap>
            {description}
          </Typography>
        }
      />

      {image && (
        <CardMedia
          component="img"
          height="175"
          image={image}
          alt={title}
          sx={{
            objectFit: 'cover',
          }}
        />
      )}

      <CardActions disableSpacing>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">{excerpt}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default StandardCard;
