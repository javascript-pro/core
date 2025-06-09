# Fallmanager

https://verkehrsrecht-anwalt-saarland.de

**Fallmanager** ist ein modularer Software-Baustein (Cartridge) für die Fallverwaltung in deutschen Anwaltskanzleien. Die Anwendung dient zur strukturierten Erfassung, Verwaltung und Bearbeitung von Fällen – mit besonderem Fokus auf Verkehrsunfälle.

## Funktionen

- Strukturierte Datenerfassung von Mandanten, Gegnern und Versicherungen
- Automatische Extraktion und Archivierung von PDF-Inhalten
- Dokumentenvorbereitung auf Basis von Vorlagen
- Fristen- und Aufgabenverwaltung
- Integration in bestehende lokale Systeme

## Architektur

Fallmanager ist Teil eines modularen Systems (Goldlabel Cartridges). Das bedeutet:

- Kann eigenständig oder innerhalb einer größeren Anwendung betrieben werden
- Wiederverwendbare Logik und Komponenten
- Trennung von UI, Logik und Konfiguration

## Technologie

- TypeScript & React
- Modularer Aufbau nach dem Prinzip "Cartridges"
- Kompatibel mit lokaler sowie Cloud-basierter Infrastruktur

## Setup

```bash
git clone https://github.com/javascript-pro/fallmanager
cd fallmanager
yarn install
yarn dev
```

## Nächste Schritte

Diese Version ist ein Prototyp. In der weiteren Entwicklung folgen:

- Anbindung an lokale Windows-Datenbanken (z. B. Access oder SQL Server)
- Benutzer- und Rechteverwaltung
- Exportfunktionen und gerichtsfeste Dokumentation

## Hinweis

Dieses Projekt wurde im Auftrag einer deutschen Kanzlei für Verkehrsrecht entwickelt:  
👉 https://verkehrsrecht-anwalt-saarland.de

## Lizenz

Proprietär. Nutzung nur nach schriftlicher Vereinbarung.
