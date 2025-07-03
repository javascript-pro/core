export type TLinguaCodes = 'en' | 'de' | 'pt' | 'zh';

export const languages: Record<
  TLinguaCodes,
  { title: string; description: string }
> = {
  en: {
    title: 'English',
    description: 'Switch to English',
  },
  de: {
    title: 'Deutsch',
    description: 'Wechseln Sie zu Deutsch',
  },
  pt: {
    title: 'Português',
    description: 'Mudar para Português',
  },
  zh: {
    title: '中文',
    description: '切换到中文',
  },
};

type LinguaKey = 'APP_TITLE' | 'NEW_CASE' | 'UPLOAD_PDF';

type TranslationEntry = Record<TLinguaCodes, string>;

export const lingua: Record<LinguaKey, TranslationEntry> = {
  APP_TITLE: {
    en: 'Case Manager',
    de: 'Fallmanager',
    pt: 'Gestor de Casos',
    zh: '案件管理器',
  },
  NEW_CASE: {
    en: 'New Case',
    de: 'Neuer Fall',
    pt: 'Novo Caso',
    zh: '新案件',
  },
  UPLOAD_PDF: {
    en: 'Upload PDF',
    de: 'PDF hochladen',
    pt: 'Enviar PDF',
    zh: '上传 PDF',
  },
};
