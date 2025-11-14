// /Users/goldlabel/GitHub/core/gl-core/cartridges/Theme/components/StandardCard.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Collapse,
  Button,
  IconButton,
  CardActions,
  Typography,
} from '@mui/material';

import {
  Icon,
  routeTo,
  useContent,
  useDispatch,
  useIsMobile,
} from '../../../../gl-core';

export function StandardCard({ slug }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const content = useContent(slug);
  const [expanded, setExpanded] = React.useState(false);
  const isMobile = useIsMobile();

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
      onClick={() => dispatch(routeTo(slug, router))}
    >
      <CardHeader
        avatar={<Icon icon={icon as any} color="primary" />}
        title={
          <Typography
            variant="h6"
            noWrap
            sx={{
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        }
        subheader={
          <Typography
            variant="body2"
            noWrap
            sx={{
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: 0.8,
            }}
          >
            {description}
          </Typography>
        }
        action={
          <IconButton
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            edge="end"
            sx={{ ml: 1 }}
          >
            {expanded ? <Icon icon="up" /> : <Icon icon="down" />}
          </IconButton>
        }
        sx={{
          alignItems: 'center',
          '.MuiCardHeader-content': {
            minWidth: 0, // crucial for ellipsis to work in flex
          },
        }}
      />

      {!isMobile && image && (
        <CardMedia
          component="img"
          height="175"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {isMobile && image && (
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{ borderRadius: 2, mb: 1, objectFit: 'cover' }}
            />
          )}

          <Typography variant="body2" sx={{ mb: 2 }}>
            {excerpt}
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              dispatch(routeTo(slug, router));
            }}
          >
            Read more
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default StandardCard;
