'use client';
import * as React from 'react';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DogIcon from '@mui/icons-material/PetsOutlined';

export type TIconNames = 'home' | 'dog' | 'save' | 'delete';

export type TIcon = {
  color?: any;
  icon: TIconNames;
};

export default function Icon({ icon, color }: TIcon) {
  if (!color) color = 'inherit';
  let iconFragment = <React.Fragment />;

  switch (icon) {
    case 'home':
      iconFragment = <HomeIcon color={color} />;
      break;
    case 'save':
      iconFragment = <SaveIcon color={color} />;
      break;
    case 'delete':
      iconFragment = <DeleteIcon color={color} />;
      break;
    case 'dog':
      iconFragment = <DogIcon color={color} />;
      break;

    default:
      iconFragment = <ErrorIcon color={'error'} />;
  }
  return <>{iconFragment}</>;
}
