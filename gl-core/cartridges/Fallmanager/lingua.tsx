export type TLinguaCodes = 'en' | 'de';

/*
Record<
  TLinguaCodes,
  { title: string; description: string }
> 
*/
export const languages: any = {
  en: { title: 'English', description: 'Switch to English' },
  de: { title: 'Deutsch', description: 'Wechseln Sie zu Deutsch' },
};

export type LinguaKey =
  | 'ALL_FILES'
  | 'NO_FILES'
  | 'UPLOAD_FILE'
  | 'RESULT_NOT_OK'
  | 'APP_TITLE';

export type TranslationEntry = Record<TLinguaCodes, string>;
// Record<LinguaKey, TranslationEntry>
export const lingua: any = {
  RESULT_NOT_OK: {
    en: 'That is not OK',
    de: 'nein.',
  },
  UPLOAD_FILE: {
    en: 'Upload file',
    de: 'Datai hochladen',
  },
  NO_FILES: {
    en: 'No Files to display',
    de: 'Keine Datai',
  },
  ALL_FILES: {
    en: 'All Files',
    de: 'Alle Datai',
  },
  APP_TITLE: {
    en: 'Case Manager',
    de: 'Fallmanager',
  },
};
