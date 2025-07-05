export type TLinguaCodes = 'en' | 'de' | 'pt' | 'zh' | 'fr';

export const languages: Record<
  TLinguaCodes,
  { title: string; description: string }
> = {
  en: { title: 'English', description: 'Switch to English' },
  de: { title: 'Deutsch', description: 'Wechseln Sie zu Deutsch' },
  pt: { title: 'Português', description: 'Mudar para Português' },
  zh: { title: '中文', description: '切换到中文' },
  fr: { title: 'Français', description: 'Passer en français' },
};

export type LinguaKey =
  | 'APP_TITLE'
  | 'NEW_CASE'
  | 'NEW_CASE_HELP_MANUAL'
  | 'NEW_CASE_HELP_AI'
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
  | 'SAVED'
  | 'NEW_WORD'
  | 'COMPLETED'
  | 'COMPLETION'
  | 'SECTION_BASIC_INFO'
  | 'SECTION_ACCIDENT_INSURANCE'
  | 'SECTION_DOCUMENTS'
  | 'SECTION_WITNESSES'
  | 'POLICE_REPORT_NUMBER'
  | 'OPPOSING_INSURANCE'
  | 'OPPOSING_CLAIM_NUMBER'
  | 'ACCIDENT_REPORT'
  | 'FIND_CASE'
  | 'DAMAGE_ASSESSMENT'
  | 'REPAIR_INVOICE'
  | 'NEW_AI_CASE'
  | 'SEARCH'
  | 'NEW_WITH_AI'
  | 'SAVE_AND_CLOSE'
  | 'SECTION_ACCIDENT_DETAILS'
  | 'SECTION_OPPOSING_PARTY'
  | 'SECTION_SETTLEMENT'
  | 'SETTLEMENT_LETTER';

export type TranslationEntry = Record<TLinguaCodes, string>;

export const lingua: Record<LinguaKey, TranslationEntry> = {
  APP_TITLE: {
    en: 'Case Manager',
    de: 'Fallmanager',
    pt: 'Gestor de Casos',
    zh: '案件管理器',
    fr: 'Gestionnaire de dossiers',
  },
  SECTION_SETTLEMENT: {
    en: 'Settlement',
    de: 'Abrechnung',
    pt: 'Liquidação',
    zh: '结算',
    fr: 'Règlement',
  },

  SECTION_ACCIDENT_DETAILS: {
    en: 'Accident Details',
    de: 'Unfalldetails',
    pt: 'Detalhes do Acidente',
    zh: '事故详情',
    fr: "Détails de l'accident",
  },
  SECTION_OPPOSING_PARTY: {
    en: 'Opposing Party',
    de: 'Gegnerische Partei',
    pt: 'Parte Adversa',
    zh: '对方当事人',
    fr: 'Partie adverse',
  },

  SAVE_AND_CLOSE: {
    en: 'Save and Close',
    de: 'Speichern und Schließen',
    pt: 'Guardar e Fechar',
    zh: '保存并关闭',
    fr: 'Enregistrer et fermer',
  },
  NEW_CASE: {
    en: 'New Manual Case',
    de: 'Neuer manueller Fall',
    pt: 'Novo Caso Manual',
    zh: '新建手动案件',
    fr: 'Nouveau dossier manuel',
  },

  NEW_AI_CASE: {
    en: 'New AI Assisted Case',
    de: 'Neuer KI-gestützter Fall',
    pt: 'Novo Caso com Assistência de IA',
    zh: '新建 AI 辅助案件',
    fr: 'Nouveau dossier assisté par IA',
  },

  NEW_CASE_HELP_MANUAL: {
    en: 'This is the manual case creation workflow. It begins with just one required field — the client’s name — and allows you to enter all other case details by hand.',
    de: 'Dies ist der manuelle Arbeitsablauf zur Fallanlage. Er beginnt mit nur einem Pflichtfeld – dem Namen des Mandanten – und ermöglicht es Ihnen, alle weiteren Falldaten manuell einzugeben.',
    pt: 'Este é o fluxo de criação manual de casos. Começa com apenas um campo obrigatório — o nome do cliente — e permite inserir todos os outros dados manualmente.',
    zh: '这是手动创建案件的流程。您只需填写一个必填字段 —— 客户姓名 —— 然后手动录入其余的案件信息。',
    fr: 'Il s’agit du processus de création de dossier manuel. Il commence par un seul champ obligatoire — le nom du client — et vous permet de saisir manuellement toutes les autres informations du dossier.',
  },

  NEW_CASE_HELP_AI: {
    en: 'This is the AI-assisted workflow. Upload any document, and the AI will analyse it, extract relevant information, and create a case that’s already mostly filled in.',
    de: 'Dies ist der KI-gestützte Arbeitsablauf. Laden Sie ein beliebiges Dokument hoch – die KI analysiert es, extrahiert relevante Informationen und erstellt einen weitgehend vorausgefüllten Fall.',
    pt: 'Este é o fluxo assistido por IA. Carregue qualquer documento e a IA irá analisá-lo, extrair informações relevantes e criar um caso já em grande parte preenchido.',
    zh: '这是由人工智能辅助的流程。上传任意文档，AI 会分析内容、提取关键信息，并创建一个已大部分填好的案件。',
    fr: 'Il s’agit du processus assisté par l’IA. Téléversez un document, et l’IA l’analysera, extraira les informations pertinentes et créera un dossier déjà largement rempli.',
  },

  UPLOAD_PDF: {
    en: 'Upload PDF',
    de: 'PDF hochladen',
    pt: 'Enviar PDF',
    zh: '上传 PDF',
    fr: 'Téléverser un PDF',
  },
  CLIENT_NAME: {
    en: 'Client Name',
    de: 'Kundenname',
    pt: 'Nome do Cliente',
    zh: '客户名称',
    fr: 'Nom du client',
  },
  CAR_REGISTRATION: {
    en: 'Car Registration',
    de: 'Kennzeichen',
    pt: 'Matrícula',
    zh: '车牌号码',
    fr: 'Immatriculation',
  },
  PLACE_OF_ACCIDENT: {
    en: 'Place of Accident',
    de: 'Unfallort',
    pt: 'Local do Acidente',
    zh: '事故地点',
    fr: "Lieu de l'accident",
  },
  DATE_OF_ACCIDENT: {
    en: 'Date of Accident',
    de: 'Unfalldatum',
    pt: 'Data do Acidente',
    zh: '事故日期',
    fr: "Date de l'accident",
  },
  INSURANCE_COMPANY: {
    en: 'Insurance Company',
    de: 'Versicherungsgesellschaft',
    pt: 'Seguradora',
    zh: '保险公司',
    fr: "Compagnie d'assurance",
  },
  POLICY_NUMBER: {
    en: 'Policy Number',
    de: 'Versicherungsscheinnummer',
    pt: 'Número da Apólice',
    zh: '保单号',
    fr: 'Numéro de police',
  },
  CLAIM_NUMBER: {
    en: 'Claim Number',
    de: 'Schadensnummer',
    pt: 'Número do Sinistro',
    zh: '理赔编号',
    fr: 'Numéro de sinistre',
  },
  NEW_WITH_AI: {
    en: 'New with AI',
    de: 'Neu mit KI',
    pt: 'Novo com IA',
    zh: '使用 AI 新建',
    fr: 'Nouveau avec IA',
  },
  FIND_CASE: {
    en: 'Find case',
    de: 'Fall finden',
    pt: 'Encontrar caso',
    zh: '查找案件',
    fr: 'Rechercher un dossier',
  },

  SEARCH: {
    en: 'Search',
    de: 'Suche',
    pt: 'Pesquisar',
    zh: '搜索',
    fr: 'Rechercher',
  },
  CANCEL: {
    en: 'Cancel',
    de: 'Abbrechen',
    pt: 'Cancelar',
    zh: '取消',
    fr: 'Annuler',
  },
  DELETE: {
    en: 'Delete',
    de: 'Löschen',
    pt: 'Eliminar',
    zh: '删除',
    fr: 'Supprimer',
  },
  DELETE_CONFIRM: {
    en: 'Are you sure?',
    de: 'Sind Sie sicher?',
    pt: 'Tem a certeza?',
    zh: '你确定吗？',
    fr: 'Êtes-vous sûr ?',
  },
  CLIENT_NAME_TOO_SHORT: {
    en: 'Client name too short',
    de: 'Kundenname zu kurz',
    pt: 'Nome do cliente muito curto',
    zh: '客户名称太短',
    fr: 'Nom du client trop court',
  },
  SUBMIT: {
    en: 'Submit',
    de: 'Einreichen',
    pt: 'Submeter',
    zh: '提交',
    fr: 'Soumettre',
  },
  NOT_FOUND: {
    en: 'Nothing to see here :(',
    de: 'Hier gibt’s nichts zu sehen :(',
    pt: 'Nada para ver aqui :(',
    zh: '这里什么都没有 :(',
    fr: 'Rien à voir ici :(',
  },
  SEED_DATABASE: {
    en: 'Seed database',
    de: 'Datenbank befüllen',
    pt: 'Popular base de dados',
    zh: '填充数据库',
    fr: 'Remplir la base de données',
  },
  FIRST_CASE: {
    en: 'Create first Case',
    de: 'Ersten Fall anlegen',
    pt: 'Criar primeiro caso',
    zh: '创建第一个案件',
    fr: 'Créer un premier dossier',
  },
  STATUS: {
    en: 'Status',
    de: 'Status',
    pt: 'Estado',
    zh: '状态',
    fr: 'Statut',
  },
  STATUS_IN_REVIEW: {
    en: 'In Review',
    de: 'In Prüfung',
    pt: 'Em análise',
    zh: '审核中',
    fr: 'En cours de révision',
  },
  STATUS_IN_PROGRESS: {
    en: 'In Progress',
    de: 'In Bearbeitung',
    pt: 'Em andamento',
    zh: '进行中',
    fr: 'En cours',
  },
  STATUS_COMPLETED: {
    en: 'Completed',
    de: 'Abgeschlossen',
    pt: 'Concluído',
    zh: '已完成',
    fr: 'Terminé',
  },
  STATUS_ARCHIVED: {
    en: 'Archived',
    de: 'Archiviert',
    pt: 'Arquivado',
    zh: '已归档',
    fr: 'Archivé',
  },
  COMPLETED: {
    en: 'Completed',
    de: 'Abgeschlossen',
    pt: 'Concluído',
    zh: '已完成',
    fr: 'Terminé',
  },
  COMPLETION: {
    en: 'Completion',
    de: 'Fertigstellung',
    pt: 'Conclusão',
    zh: '完成度',
    fr: 'Avancement',
  },
  SAVED: {
    en: 'Saved',
    de: 'Gespeichert',
    pt: 'Guardado',
    zh: '已保存',
    fr: 'Enregistré',
  },
  NEW_WORD: {
    en: 'New Word',
    de: 'Neues Wort',
    pt: 'Nova Palavra',
    zh: '新词',
    fr: 'Nouveau mot',
  },
  SECTION_BASIC_INFO: {
    en: 'Basic Information',
    de: 'Grunddaten',
    pt: 'Informações Básicas',
    zh: '基本信息',
    fr: 'Informations de base',
  },
  SECTION_ACCIDENT_INSURANCE: {
    en: 'Accident & Insurance',
    de: 'Unfall & Versicherung',
    pt: 'Acidente e Seguro',
    zh: '事故与保险',
    fr: 'Accident et assurance',
  },
  SECTION_DOCUMENTS: {
    en: 'Documents',
    de: 'Dokumente',
    pt: 'Documentos',
    zh: '文档',
    fr: 'Documents',
  },
  SECTION_WITNESSES: {
    en: 'Witnesses',
    de: 'Zeugen',
    pt: 'Testemunhas',
    zh: '证人',
    fr: 'Témoins',
  },
  POLICE_REPORT_NUMBER: {
    en: 'Police Report Number',
    de: 'Polizeiberichtnummer',
    pt: 'Número do Relatório Policial',
    zh: '警方报告编号',
    fr: 'Numéro du rapport de police',
  },
  OPPOSING_INSURANCE: {
    en: 'Opposing Insurance',
    de: 'Gegnerische Versicherung',
    pt: 'Seguradora Adversa',
    zh: '对方保险公司',
    fr: 'Assurance adverse',
  },
  OPPOSING_CLAIM_NUMBER: {
    en: 'Opposing Claim Number',
    de: 'Gegnerische Schadensnummer',
    pt: 'Número de Sinistro da Parte Adversa',
    zh: '对方理赔编号',
    fr: 'Numéro de sinistre adverse',
  },
  ACCIDENT_REPORT: {
    en: 'Accident Report Received',
    de: 'Unfallbericht erhalten',
    pt: 'Relatório de Acidente Recebido',
    zh: '收到事故报告',
    fr: "Rapport d'accident reçu",
  },
  DAMAGE_ASSESSMENT: {
    en: 'Damage Assessment Received',
    de: 'Schadensgutachten erhalten',
    pt: 'Avaliação de Danos Recebida',
    zh: '收到损坏评估',
    fr: 'Évaluation des dommages reçue',
  },
  REPAIR_INVOICE: {
    en: 'Repair Invoice Received',
    de: 'Reparaturrechnung erhalten',
    pt: 'Fatura de Reparação Recebida',
    zh: '收到维修发票',
    fr: 'Facture de réparation reçue',
  },
  SETTLEMENT_LETTER: {
    en: 'Settlement Letter Received',
    de: 'Abrechnungsschreiben erhalten',
    pt: 'Carta de Liquidação Recebida',
    zh: '收到结算函',
    fr: 'Lettre de règlement reçue',
  },
};
