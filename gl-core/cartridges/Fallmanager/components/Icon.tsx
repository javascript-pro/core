'use client';
import * as React from 'react';
import { FallmanagerIcon } from '../svg';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ErrorIcon from '@mui/icons-material/ErrorOutlined';
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DogIcon from '@mui/icons-material/PetsOutlined';
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import WordIcon from '@mui/icons-material/Microsoft';
import PngIcon from '@mui/icons-material/ImageOutlined';
import JpgIcon from '@mui/icons-material/ImageOutlined';
import TxtIcon from '@mui/icons-material/TitleOutlined';
import MdIcon from '@mui/icons-material/DataArray';
import RtfIcon from '@mui/icons-material/TextFieldsOutlined';
import OdtIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/DownloadOutlined';
import ViewIcon from '@mui/icons-material/VisibilityOutlined';
import CloseIcon from '@mui/icons-material/CloseOutlined';
import LinkIcon from '@mui/icons-material/LinkOutlined';
import CopyIcon from '@mui/icons-material/CopyAllOutlined';
import LeftIcon from '@mui/icons-material/ArrowBack';
import UploadIcon from '@mui/icons-material/DocumentScanner';
import SignoutIcon from '@mui/icons-material/ExitToApp';
import CaseIcon from '@mui/icons-material/WorkOutlined';
import NewIcon from '@mui/icons-material/AddOutlined';

export type TIconNames =
  | 'home'
  | 'new' 
  | 'case'
  | 'cases'
  | 'uploads'
  | 'upload'
  | 'signout'
  | 'link'
  | 'copy'
  | 'left'
  | 'view'
  | 'close'
  | 'default'
  | 'fallmanager'
  | 'save'
  | 'download'
  | 'dog'
  | 'pdf'
  | 'word'
  | 'docx'
  | 'png'
  | 'jpg'
  | 'jpeg'
  | 'txt'
  | 'md'
  | 'rtf'
  | 'odt'
  | 'delete';

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
    case 'fallmanager':
      iconFragment = <FallmanagerIcon color={color} />;
      break;
    case 'new':
      iconFragment = <NewIcon color={color} />;
      break;
      case 'cases':
      iconFragment = <CaseIcon color={color} />;
      break;
    case 'case':
      iconFragment = <CaseIcon color={color} />;
      break;
    case 'uploads':
      iconFragment = <UploadIcon color={color} />;
      break;
          case 'upload':
      iconFragment = <UploadIcon color={color} />;
      break;
    case 'download':
      iconFragment = <DownloadIcon color={color} />;
      break;
    case 'signout':
      iconFragment = <SignoutIcon color={color} />;
      break;
    case 'default':
      iconFragment = <FallmanagerIcon color={color} />;
      break;
    case 'copy':
      iconFragment = <CopyIcon color={color} />;
      break;
    case 'left':
      iconFragment = <LeftIcon color={color} />;
      break;
    case 'link':
      iconFragment = <LinkIcon color={color} />;
      break;
    case 'view':
      iconFragment = <ViewIcon color={color} />;
      break;
    case 'md':
      iconFragment = <MdIcon color={color} />;
      break;
    case 'odt':
      iconFragment = <OdtIcon color={color} />;
      break;
    case 'rtf':
      iconFragment = <RtfIcon color={color} />;
      break;
    case 'txt':
      iconFragment = <TxtIcon color={color} />;
      break;
    case 'png':
      iconFragment = <PngIcon color={color} />;
      break;
    case 'docx':
      iconFragment = <WordIcon color={color} />;
      break;
    case 'word':
      iconFragment = <WordIcon color={color} />;
      break;
    case 'jpeg':
      iconFragment = <JpgIcon color={color} />;
      break;
    case 'jpg':
      iconFragment = <JpgIcon color={color} />;
      break;
    case 'pdf':
      iconFragment = <PdfIcon color={color} />;
      break;
    case 'save':
      iconFragment = <SaveIcon color={color} />;
      break;
    case 'close':
      iconFragment = <CloseIcon color={color} />;
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
