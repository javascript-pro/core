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

type LinguaKey =
  | 'APP_TITLE'
  | 'NEW_CASE'
  | 'NEW_CASE_HELP'
  | 'UPLOAD_PDF'
  | 'CLIENT_NAME'
  | 'CANCEL'
  | 'DELETE'
  | 'DELETE_CONFIRM'
  | 'CLIENT_NAME_TOO_SHORT'
  | 'SUBMIT';

type TranslationEntry = Record<TLinguaCodes, string>;

export const lingua: Record<LinguaKey, TranslationEntry> = {
  APP_TITLE: {
    en: 'Case Manager',
    de: 'Fallmanager',
    pt: 'Gestor de Casos',
    zh: '案件管理器',
  },
  DELETE: {
    en: 'Delete',
    de: '',
    pt: '',
    zh: '',
  },
  DELETE_CONFIRM:{
    en: 'Are you sure?',
    de: '',
    pt: '',
    zh: '',
  },
  CANCEL: {
    en: 'Cancel',
    de: 'Abbrechen',
    pt: 'Cancelar',
    zh: '取消',
  },
  CLIENT_NAME_TOO_SHORT: {
    en: 'Client name too short',
    de: 'Kundenname zu kurz',
    pt: 'Nome do cliente muito curto',
    zh: '客户名称太短',
  },
  SUBMIT: {
    en: 'Submit',
    de: 'Einreichen',
    pt: 'Submeter',
    zh: '提交',
  },
  CLIENT_NAME: {
    en: 'Client Name',
    de: 'Kundenname',
    pt: 'Nome do Cliente',
    zh: '客户名称',
  },
  NEW_CASE: {
    en: 'New Case',
    de: 'Neuer Fall',
    pt: 'Novo Caso',
    zh: '新案件',
  },
  NEW_CASE_HELP: {
    en: 'New cases must have a valid client name. Either enter it manually or upload the first file for this case and get the client name from it',
    de: 'Neue Fälle müssen einen gültigen Kundennamen haben. Geben Sie ihn entweder manuell ein oder laden Sie die erste Datei für diesen Fall hoch, um den Namen daraus zu übernehmen',
    pt: 'Novos casos devem ter um nome de cliente válido. Insira-o manualmente ou envie o primeiro ficheiro deste caso para extrair o nome',
    zh: '新案件必须有有效的客户名称。您可以手动输入，或上传此案件的首个文件以提取客户名称',
  },
  UPLOAD_PDF: {
    en: 'Upload PDF',
    de: 'PDF hochladen',
    pt: 'Enviar PDF',
    zh: '上传 PDF',
  },
};
