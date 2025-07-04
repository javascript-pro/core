// core/gl-core/cartridges/Fallmanager/README.md

## Proof of Concept

Demonstrates how we could streamline legal case preparation by combining AI-assisted document processing with a structured workflow.

When Kanzlei staff receive documents (e.g. insurance letters, client statements), they typically have to extract key details manually and enter them into a system. This POC shows how uploading those PDFs can trigger automatic extraction of structured data using a Large Language Model (LLM).

The system then pre-fills editable case fields, thus speeding up the process and reducing repetitive work — while still keeping the administrator fully in control.

#### [caseObj.tsx](./caseObj.tsx)

This file defines the **single source of truth** for the structure of a legal case (a `Fall`).

It exports two things:

- `CaseData` — the full TypeScript interface describing all fields of a case
- `emptyCase` — a blank template that can be used for initializing new cases or form defaults

##### Key Groups

The case object is grouped for UI and logic into the following domains:

| Group               | Fields                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **Client Info**     | `clientName`, `carRegistration`                                                               |
| **Case Metadata**   | `caseId`, `status`, `createdAt`, `updatedAt`                                                  |
| **Accident Info**   | `dateOfAccident`, `placeOfAccident`, `policeReportNumber`, `witnesses`                        |
| **Insurance Info**  | `insuranceCompany`, `policyNumber`, `claimNumber`, `opposingInsurance`, `opposingClaimNumber` |
| **Checklist Flags** | `accidentReport`, `damageAssessment`, `repairInvoiceReceived`, `settlementLetterReceived`     |
| **Documents**       | `documents[]` (type, filename, uploadedAt)                                                    |

##### Why This Matters

This object is used throughout the Fallmanager system for:

- LLM-based extraction
- Case editor UIs
- Firestore reads/writes
- Validation and transformation
- Workflow logic (e.g. flags and status updates)

Keeping it centralized makes the codebase easier to maintain and extend as we move toward a production-ready system.

## Example Case

```json
[
  {
    "clientName": "Alexandra St\u00f6ckel",
    "carRegistration": "SB-AT2008",
    "caseId": "case-001",
    "status": "in_review",
    "createdAt": "2025-06-17T10:00:00Z",
    "updatedAt": "2025-07-01T09:45:00Z",
    "dateOfAccident": "2025-06-16",
    "placeOfAccident": "Friedrichsthal",
    "policeReportNumber": "Pol-FTH-2025-0616-01",
    "witnesses": [],
    "insuranceCompany": "HUK COBURG Allgemeine",
    "policyNumber": "xxx",
    "claimNumber": "25-11-511/524665-U",
    "opposingInsurance": "Allianz",
    "opposingClaimNumber": "GH-85-2025",
    "accidentReport": true,
    "damageAssessment": true,
    "repairInvoiceReceived": false,
    "settlementLetterReceived": false,
    "documents": [
      {
        "type": "Gutachten",
        "filename": "gutachten-sv-weber.pdf",
        "uploadedAt": "2025-06-18T14:00:00Z"
      }
    ]
  }
]
```
