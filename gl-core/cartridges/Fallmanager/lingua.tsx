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

export type LinguaKey =
  | 'APP_TITLE'
  | 'NEW_CASE'
  | 'NEW_CASE_HELP'
  | 'UPLOAD_PDF'
  | 'CLIENT_NAME'
  | 'CAR_REGISTRATION'
  | 'PLACE_OF_ACCIDENT'
  | 'DATE_OF_ACCIDENT'
  | 'INSURANCE_COMPANY'
  | 'POLICY_NUMBER'
  | 'CLAIM_NUMBER'
  | 'CANCEL'
  | 'DELETE'
  | 'DELETE_CONFIRM'
  | 'CLIENT_NAME_TOO_SHORT'
  | 'NOT_FOUND'
  | 'SEED_DATABASE'
  | 'FIRST_CASE'
  | 'SUBMIT'
  | 'STATUS'
  | 'STATUS_IN_REVIEW'
  | 'STATUS_IN_PROGRESS'
  | 'STATUS_COMPLETED'
  | 'STATUS_ARCHIVED'
  | 'COMPLETION';

export type TranslationEntry = Record<TLinguaCodes, string>;

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
  CLIENT_NAME: {
    en: 'Client Name',
    de: 'Kundenname',
    pt: 'Nome do Cliente',
    zh: '客户名称',
  },
  CAR_REGISTRATION: {
    en: 'Car Registration',
    de: 'Kennzeichen',
    pt: 'Matrícula',
    zh: '车牌号码',
  },
  PLACE_OF_ACCIDENT: {
    en: 'Place of Accident',
    de: 'Unfallort',
    pt: 'Local do Acidente',
    zh: '事故地点',
  },
  DATE_OF_ACCIDENT: {
    en: 'Date of Accident',
    de: 'Unfalldatum',
    pt: 'Data do Acidente',
    zh: '事故日期',
  },
  INSURANCE_COMPANY: {
    en: 'Insurance Company',
    de: 'Versicherungsgesellschaft',
    pt: 'Seguradora',
    zh: '保险公司',
  },
  POLICY_NUMBER: {
    en: 'Policy Number',
    de: 'Versicherungsscheinnummer',
    pt: 'Número da Apólice',
    zh: '保单号',
  },
  CLAIM_NUMBER: {
    en: 'Claim Number',
    de: 'Schadensnummer',
    pt: 'Número do Sinistro',
    zh: '理赔编号',
  },
  CANCEL: {
    en: 'Cancel',
    de: 'Abbrechen',
    pt: 'Cancelar',
    zh: '取消',
  },
  DELETE: {
    en: 'Delete',
    de: 'Löschen',
    pt: 'Eliminar',
    zh: '删除',
  },
  DELETE_CONFIRM: {
    en: 'Are you sure?',
    de: 'Sind Sie sicher?',
    pt: 'Tem a certeza?',
    zh: '你确定吗？',
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
  NOT_FOUND: {
    en: 'Nothing to see here :(',
    de: 'Hier gibt’s nichts zu sehen :(',
    pt: 'Nada para ver aqui :(',
    zh: '这里什么都没有 :(',
  },
  SEED_DATABASE: {
    en: 'Seed database',
    de: 'Datenbank befüllen',
    pt: 'Popular base de dados',
    zh: '填充数据库',
  },
  FIRST_CASE: {
    en: 'Create first Case',
    de: 'Ersten Fall anlegen',
    pt: 'Criar primeiro caso',
    zh: '创建第一个案件',
  },
  STATUS: {
    en: 'Status',
    de: 'Status',
    pt: 'Estado',
    zh: '状态',
  },
  STATUS_IN_REVIEW: {
    en: 'In Review',
    de: 'In Prüfung',
    pt: 'Em análise',
    zh: '审核中',
  },
  STATUS_IN_PROGRESS: {
    en: 'In Progress',
    de: 'In Bearbeitung',
    pt: 'Em andamento',
    zh: '进行中',
  },
  STATUS_COMPLETED: {
    en: 'Completed',
    de: 'Abgeschlossen',
    pt: 'Concluído',
    zh: '已完成',
  },
  STATUS_ARCHIVED: {
    en: 'Archived',
    de: 'Archiviert',
    pt: 'Arquivado',
    zh: '已归档',
  },
  COMPLETION: {
    en: 'Completion',
    de: 'Fertigstellung',
    pt: 'Conclusão',
    zh: '完成度',
  },
};
