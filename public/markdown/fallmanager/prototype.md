---
title: Prototype
order: 15
slug: /fallmanager/prototype
description: Fallmanagement-System für eine deutsche Anwaltskanzlei
icon: fallmanager
image: /png/_clients_/fallmanager/fallmanager.png
bouncer: true
---

# Prototype

This section documents the early prototype of the _Fallmanager_ system developed for a German law firm specializing in accident claims.

## Purpose

The goal of the prototype is to validate core ideas before committing to full development. It serves as a proof of concept for both technical feasibility and workflow alignment.

## Key Features

- **Basic Case Record Entry**  
  A simple web form allows users to enter new cases, including client details, accident info, and case notes.

- **Database Integration**  
  Data is saved to a cloud database (Neon for now), but the prototype is designed to later connect to a local SQL Server instance in the client's office.

- **Document Upload (Planned)**  
  The prototype anticipates file upload capabilities, which are essential for document-heavy workflows in law firms.

- **Authentication (Planned)**  
  User login and role-based access will be integrated as part of the production system. For now, the prototype is open-access for simplicity.

## Tech Stack

- Frontend: Toolpad + Next.js
- Backend: Next.js API Routes
- Database: Neon PostgreSQL (temporary)
- Deployment: Vercel
- GitHub Repo: [fallmanager](https://github.com/javascript-pro/fallmanager)

## Limitations

This is not a production system. It is designed to test architecture, hosting setup, and initial data flow. It should not be used for real client data.

## Next Steps

- Evaluate the client’s existing infrastructure
- Finalize whether we connect to the local SQL Server or keep a cloud database
- Begin development of the production MVP

---lang[de]---

# Prototyp

Dieser Abschnitt dokumentiert den frühen Prototyp des _Fallmanager_-Systems, das für eine deutsche Anwaltskanzlei mit Schwerpunkt auf Verkehrsunfällen entwickelt wurde.

## Zweck

Das Ziel des Prototyps ist es, zentrale Ideen zu validieren, bevor eine vollständige Entwicklung beginnt. Er dient als Machbarkeitsnachweis für technische Umsetzung und Prozesskompatibilität.

## Hauptfunktionen

- **Einfache Fallanlage**  
  Ein einfaches Webformular ermöglicht die Eingabe neuer Fälle mit Mandantendaten, Unfalldetails und Notizen.

- **Datenbankanbindung**  
  Die Daten werden vorläufig in einer Cloud-Datenbank (Neon) gespeichert, das System ist jedoch so ausgelegt, dass es später mit einem lokalen SQL Server im Büro des Mandanten verbunden werden kann.

- **Dokumenten-Upload (geplant)**  
  Der Prototyp sieht die Möglichkeit vor, Dateien hochzuladen – ein essenzielles Feature für die dokumentenlastige Arbeit in Kanzleien.

- **Benutzerauthentifizierung (geplant)**  
  Eine Anmeldung mit rollenbasierter Zugriffskontrolle wird in der späteren Produktivversion integriert. Der Prototyp ist derzeit zur Vereinfachung offen zugänglich.

## Technologiestack

- Frontend: Toolpad + Next.js
- Backend: Next.js API-Routen
- Datenbank: Neon PostgreSQL (vorläufig)
- Deployment: Vercel
- GitHub-Repository: [fallmanager](https://github.com/javascript-pro/fallmanager)

## Einschränkungen

Dies ist kein produktives System. Es dient der Überprüfung von Architektur, Hosting und erster Datenverarbeitung. Es sollte nicht mit echten Mandantendaten verwendet werden.

## Nächste Schritte

- Bewertung der bestehenden IT-Infrastruktur des Mandanten
- Entscheidung zwischen lokaler SQL Server Anbindung oder Cloud-Datenbank
- Beginn der Entwicklung des produktiven MVP
