# Applicant Tracking System (ATS)

## Project Overview

This project is a **basic Applicant Tracking System (ATS)** built using **Next.js 14 and Supabase**. It enables recruiters to create and manage job postings, track candidates through a hiring pipeline, and review applications via a Kanban-style dashboard. Public users can apply to jobs without authentication, while recruiters manage everything through protected routes.

The goal of this project is to demonstrate **production-ready SaaS architecture**, including authentication, secure file uploads, database relationships, Row Level Security (RLS), and efficient data fetching using modern Next.js App Router patterns.

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript (strict)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Backend / BaaS:** Supabase
  - PostgreSQL Database
  - Supabase Auth (Email/Password)
  - Supabase Storage (Resume uploads)
- **Architecture:**
  - Server Components
  - Server Actions for mutations
  - Minimal client-side state

---

## Features

### <span style="color:#16a34a;">🎁 Bonus Feature: Email Update Notifications</span>
- Automated email notifications sent to candidates using resend

### Job Management
- Create, edit, and view job postings
- Fields:
  - Job title
  - Description
  - Department
  - Location
  - Employment type
  - Status (Draft, Published, Closed)
- Job listing view with:
  - Filter by department and status
  - Search by job title
  - Click to view/edit individual jobs

### Candidate Pipeline
- Public job application form at `/jobs/[jobId]/apply`
- Fields:
  - Full name
  - Email
  - Phone
  - LinkedIn URL (optional)
  - Resume upload (PDF, max 5MB)
- Automatic creation of candidate in **Applied** stage
- Recruiter dashboard with Kanban board:
  - Applied → Screening → Interview → Offer → Rejected
- Drag-and-drop candidates between stages
- Candidate detail view:
  - Full candidate information
  - Resume preview/download
  - Stage movement controls
  - Application timestamp and stage history

### Authentication & Access Control
- Recruiter authentication using Supabase Auth
- Protected routes for dashboard and job management
- Public access for job application pages
- Proper session handling across the app

---

## Setup Instructions (Local)

### 1. Clone the Repository
```bash
git clone https://github.com/21parthh/mindbridge
cd mindbridge
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Edit the `.env.local` file with your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.
```

### 5. Database Setup

Paste Schema.sql file content in your Supabase project's SQL Editor and run it.

Create a new storage bucket named `resumes` in your Supabase project's Storage section.

Conect Supabase with Url and Key

