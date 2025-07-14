# Fallmanager – AI-gestützter Dokumenten-Workflow für Verkehrsunfälle

**Fallmanager** ist eine moderne Webanwendung zur Unterstützung von Kanzleien bei der digitalen Fallbearbeitung von Verkehrsunfällen. Sie kombiniert **Firebase**, **Next.js** und **LLM-basierte Dokumentenanalyse**, um eingehende Dokumente strukturiert aufzubereiten und den manuellen Aufwand signifikant zu reduzieren – ohne dabei die Kontrolle aus der Hand zu geben.

---

## 🔧 Zielsetzung

- Automatisiertes Auslesen juristisch relevanter Inhalte aus PDFs (z. B. Gutachten, Versicherungsschreiben)
- Vorschlagsbasierte Vorbefüllung einer digitalen Fallakte
- Mandantenfreundliche und strukturierte Benutzeroberfläche für Kanzleipersonal
- Realtime-Synchronisierung und einfache Erweiterbarkeit durch Firebase-Integration

---

## 🧠 Funktionsweise

1. **Upload eines Dokuments** (z. B. per Drag & Drop)
2. **Extraktion strukturierter Daten** über ein Large Language Model (LLM)
3. **Validierung und Bearbeitung** der Felder durch die Sachbearbeitung
4. **Speicherung der Fallakte** als strukturiertes Objekt in Firestore

---

## 🧾 Datenstruktur: `caseObj.tsx`

Die zentrale Datei `caseObj.tsx` definiert die Struktur jeder Fallakte (`Fall`) – inkl. UI-Gruppierung und typisierter Validierung.

Sie exportiert:

- `CaseData` — TypeScript-Interface mit allen Feldern
- `emptyCase` — Vorlage zur Initialisierung neuer Fälle

| Gruppe            | Felder                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **Mandant**       | `clientName`, `carRegistration`                                                               |
| **Metadaten**     | `caseId`, `status`, `createdAt`, `updatedAt`                                                  |
| **Unfallhergang** | `dateOfAccident`, `placeOfAccident`, `policeReportNumber`, `witnesses`                        |
| **Versicherung**  | `insuranceCompany`, `policyNumber`, `claimNumber`, `opposingInsurance`, `opposingClaimNumber` |
| **Checkliste**    | `accidentReport`, `damageAssessment`, `repairInvoiceReceived`, `settlementLetterReceived`     |
| **Dokumente**     | `documents[]` – inklusive Typ, Dateiname, Upload-Zeitpunkt                                    |

Diese Struktur ist die Grundlage für:

- das LLM-Parsing,
- Formularfelder im UI,
- Speicherung und Abruf in Firestore,
- Status-Logik und Workflows.
