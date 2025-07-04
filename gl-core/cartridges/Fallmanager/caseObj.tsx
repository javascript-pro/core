// core/gl-core/cartridges/Fallmanager/caseObj.tsx

/**
 * Defines the core data structure for a legal case ("Fall") within Fallmanager.
 * This is the single source of truth for what a case contains, and should be
 * imported wherever case shape, validation, or rendering is required.
 */

export interface Witness {
  name: string;
  contact: string;
}

export interface CaseDocument {
  type: string; // e.g. 'Gutachten', 'SV Rechnung', 'Abrechnungsschreiben'
  filename: string;
  uploadedAt: string; // ISO timestamp
}

export type CaseStatus = 'in_review' | 'in_progress' | 'completed' | 'archived';

export interface CaseData {
  /** Client information */
  clientName: string;
  carRegistration: string;

  /** Case metadata */
  caseId: string;
  status: CaseStatus;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp

  /** Accident details */
  dateOfAccident: string; // ISO date
  placeOfAccident: string;
  policeReportNumber?: string;
  witnesses?: Witness[];

  /** Insurance information */
  insuranceCompany: string;
  policyNumber: string;
  claimNumber: string;
  opposingInsurance?: string;
  opposingClaimNumber?: string;

  /** Checklist / workflow flags */
  accidentReport: boolean;
  damageAssessment: boolean;
  repairInvoiceReceived: boolean;
  settlementLetterReceived: boolean;

  /** Uploaded files */
  documents: CaseDocument[];
}

/**
 * A useful blank template that can be used for new cases or form defaults.
 */
export const emptyCase: CaseData = {
  clientName: '',
  carRegistration: '',

  caseId: '',
  status: 'in_progress',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),

  dateOfAccident: '',
  placeOfAccident: '',
  policeReportNumber: '',
  witnesses: [],

  insuranceCompany: '',
  policyNumber: '',
  claimNumber: '',
  opposingInsurance: '',
  opposingClaimNumber: '',

  accidentReport: false,
  damageAssessment: false,
  repairInvoiceReceived: false,
  settlementLetterReceived: false,

  documents: [],
};
