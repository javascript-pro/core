---
order: 20
title: Data Migration
description: Using Next, Python and SQL
slug: /work/expertise/data-migration
icon: info
image: https://live.staticflickr.com/65535/54688814017_148f57032c_o.jpg
tags: expertise, data migration, SQL, work, python, next
github: https://github.com/javascript-pro/data-migration
---

## Data Migration via RESTful API using Next, Python and SQL

[Github Repo](https://github.com/javascript-pro/data-migration)

> This service exposes a RESTful interface for cleaning, transforming, and migrating data from a raw source table to a cleaned, structured target table using SQLite. Designed for visibility, modularity, and control during data migration workflows.

#### 🧱 Architecture

- **Database:** SQLite (local file)
- **API:** Express.js (Node)
- **Data Flow:**  
  source_table → /api/clean → /api/transform → /api/migrate → users_clean

#### POST /api/clean

Cleans data in the source table:

- Trims whitespace
- Normalizes country names
- Removes rows with missing required fields (e.g. email IS NULL)

#### POST /api/transform

Transforms cleaned data into a new table users_clean:

- Creates target schema (if not exists)
- Applies transformations:
  - Uppercases names
  - Lowercases emails
  - Converts dates to ISO format

#### POST /api/migrate

Final migration step (placeholder for now):

- Can be used to copy users_clean to a production-ready table or external system

#### GET /api/migration/status

- Returns number of records successfully migrated.
