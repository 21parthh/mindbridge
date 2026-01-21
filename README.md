# Mindbridge - Job Management & Candidate Pipeline

A full-stack Next.js application for managing job postings and tracking candidates through a recruitment pipeline.

## Features

- **Job Management**: Create, edit, and publish job postings.
- **Candidate Pipeline**: Kanban board to drag-and-drop candidates between stages (Applied, Screening, Interview, etc.).
- **Public Application**: Public-facing pages for candidates to view jobs and apply with resumes.
- **Authentication**: Secure recruiter access using Supabase Auth.
- **Resume Storage**: Secure PDF upload and storage using Supabase Storage.

## Setup Instructions

### 1. Prerequisites

- Node.js 18+
- Supabase Account

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Configuration

1.  **Run SQL Schema**: Go to your Supabase project's SQL Editor and run the contents of [`supabase/schema.sql`](./supabase/schema.sql). This will create:
    -   Tables: `jobs`, `candidates`, `applications`
    -   RLS Policies
    -   Indexes

2.  **Create Storage Bucket**:
    -   Go to Storage > Buckets
    -   Create a new public bucket named `resumes`.
    -   Alternatively, run this SQL if your permissions allow:
        ```sql
        insert into storage.buckets (id, name, public) values ('resumes', 'resumes', true);
        ```

3.  **Create Test User**:
    -   Go to Authentication > Users
    -   Add a user (e.g., `recruiter@example.com` / `password123`)

### 4. Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.
