import { TLanguageCode } from './types';

export const translations: Record<string, Record<TLanguageCode, string>> = {
  saveClose: {
    en: 'Save & Close',
    de: 'Speichern & Schließen',
  },

  caseTitle: {
    en: 'Case Title',
    de: 'Falldaten Titel',
  },

  uploading: {
    en: 'Uploading PDF',
    de: 'PDF wird hochgeladen',
  },

  newPDF: {
    en: 'Upload New PDF',
    de: 'Neues PDF hochladen',
  },
  back: {
    en: 'Back',
    de: 'Zurück',
  },

  caseEdit: {
    en: 'Edit Case',
    de: 'Fall bearbeiten',
  },

  caseList: {
    en: 'Cases',
    de: 'Fälle',
  },

  caseView: {
    en: 'View Case',
    de: 'Fallansicht',
  },

  noDescription: {
    en: 'No description available',
    de: 'Kein Beschreibungstext verfügbar',
  },

  notFound: {
    en: 'Not found',
    de: 'Nicht gefunden',
  },

  uploadPdf: {
    en: 'Upload PDF',
    de: 'PDF hochladen',
  },

  uploadedFiles: {
    en: 'Uploaded Files',
    de: 'Hochgeladene Dateien',
  },
};
