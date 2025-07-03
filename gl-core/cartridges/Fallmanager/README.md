# ❗ Fallmanager Proof of Concept

This Proof of Concept (POC) demonstrates how **Fallmanager** can streamline legal case preparation by combining AI-assisted document processing with a structured workflow.

## 💡 Core Concept

When Kanzlei staff receive documents (e.g. insurance letters, client statements), they typically have to extract key details manually and enter them into a system. This POC shows how **uploading those PDFs can trigger automatic extraction of structured data** using a Large Language Model (LLM).

The system then **pre-fills editable case fields**, speeding up the process and reducing repetitive work — while still keeping the administrator fully in control.

## ✅ What This POC Does

- Starts a **new case** in Firestore with a unique ID
- Lets the user upload **PDF documents**
- Automatically extracts structured case data using an LLM
- Pre-fills relevant fields for review and manual correction
- Allows generation of a **summary PDF letter**
- Closes the case when complete

## 🔐 About Login and Infrastructure

This POC is built on the **Goldlabel framework**, which includes reusable cartridges for rapid prototyping:

- `Bouncer` provides authentication — not as part of Fallmanager’s business logic, but to ensure data privacy from the start
- `Uberedux` provides state management
- `Theme` gives us consistent design out of the box

These modules are deliberately separated from the Fallmanager domain logic so we can focus development time on the things that matter most to the Kanzlei — automating admin and accelerating case handling.
