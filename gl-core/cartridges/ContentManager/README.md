## ContentManager

### Overview

We’re introducing a new cartridge called ContentManager. Its role is to provide a lightweight CMS inside Goldlabel Core, backed by Firebase. It should support CRUD operations on a Firestore collection (e.g., `content`), exposing reusable hooks and UI components that other cartridges can use.

This cartridge will live alongside Theme, Shortcodes, Paywall, etc., and must follow the same architectural patterns:

- isolated logic
- reusable components
- no tight coupling to any specific app

### Objectives (Phase 1)

1. Create cartridge structure

   - `cartridges/ContentManager/`
   - Include subfolders: `components`, `hooks`, `types`, and `utils`.

2. Define Firestore data model

   - Draft a `TContentDoc` TypeScript type.
   - Fields: `id`, `title`, `slug`, `body`, `updatedAt`, `createdAt`, optional fields for tags, images, status, etc.

3. Implement core hooks

   - `useContentDocs()` → fetch all docs in the collection.
   - `useContentDoc(id)` → fetch a single doc.
   - `createContentDoc(data)` → add new doc.
   - `updateContentDoc(id, data)` → update.
   - `deleteContentDoc(id)` → delete.

4. Build basic UI components

   - `<ContentList />` → table/grid of docs.
   - `<ContentEditor />` → form with title, slug, markdown editor (placeholder for now), save button.
   - `<ContentDeleteDialog />`.

   Components should use MUI and match existing cartridge conventions.

5. Integrate Firebase

   - Reuse existing Firebase config from Paywall.
   - Ensure all Firestore calls work in both Core (Next.js) and Pro (CRA).

6. Add route page for testing

   - A development-only page: `/dev/content-manager`.
   - Shows list, ability to open editor, create/delete items.

7. Prepare for future expansion

   - Versioning
   - Media uploads
   - Draft/published states

### First Steps for Developer

1. Scaffold `cartridges/ContentManager` with required folders.
2. Create `types.ts` with `TContentDoc`.
3. Implement hooks using Firestore (start with list + create).
4. Create a minimal `<ContentList />` and wire it to the hook.
5. Add a test page in `app/dev/content-manager/page.tsx` to verify functionality.
6. Submit PR with initial structure + list + create flow.
