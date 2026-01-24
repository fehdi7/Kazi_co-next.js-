# Deployment Fix - Prisma Database Connection Issue

## Problem

During `next build`, Next.js tries to statically generate pages that make Prisma database calls. The PostgreSQL database at `127.0.0.1:5432` isn't reachable during deployment.

## Solution

Use Cloudinary as the primary data source for project pages since images are already organized by category and project folder structure.

## Tasks

### 1. Create Cloudinary utility functions

- [x] Create `src/lib/cloudinary-data.ts` with functions to:
  - `getAllCategories()` - Discover categories from Cloudinary folder structure
  - `getProjectsByCategory(category)` - Get all projects in a category folder
  - `getProjectDetails(category, project)` - Get project metadata and images

### 2. Update app/our_projects/page.tsx

- [x] Add `export const dynamic = 'force-dynamic'`
- [x] Import and use Cloudinary data functions instead of Prisma
- [x] Remove Prisma import

### 3. Update app/our_projects/[category]/page.tsx

- [x] Add `export const dynamic = 'force-dynamic'`
- [x] Import and use Cloudinary data functions instead of Prisma
- [x] Update `generateMetadata` to use Cloudinary data
- [x] Remove Prisma import

### 4. Update app/our_projects/[category]/[site]/page.tsx

- [x] Add `export const dynamic = 'force-dynamic'`
- [x] Import and use Cloudinary data functions instead of Prisma
- [x] Update `generateMetadata` to use Cloudinary data
- [x] Remove Prisma import

### 5. Test build

- [x] Run `npm run build` to verify the fix works

## Build Result

✅ Build completed successfully! Routes `/our_projects`, `/our_projects/[category]`, and `/our_projects/[category]/[site]` are now marked as Dynamic (ƒ) and won't try to connect to the database during static generation.
