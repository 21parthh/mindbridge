-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Jobs Table
create table public.jobs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  department text not null,
  location text not null,
  type text not null check (type in ('Full-time', 'Part-time', 'Contract')),
  status text not null default 'Draft' check (status in ('Draft', 'Published', 'Closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Candidates Table
create table public.candidates (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  linkedin_url text,
  resume_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Applications Table
create table public.applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  status text not null default 'Applied' check (status in ('Applied', 'Screening', 'Interview', 'Offer', 'Rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index idx_jobs_status on public.jobs(status);
create index idx_applications_job_id on public.applications(job_id);
create index idx_applications_candidate_id on public.applications(candidate_id);
create index idx_applications_status on public.applications(status);

-- RLS Policies

-- Jobs
alter table public.jobs enable row level security;

-- Public can view published jobs
create policy "Public jobs are viewable by everyone"
  on public.jobs for select
  using (status = 'Published');

-- Authenticated users (recruiters) can do everything with jobs
create policy "Recruiters can insert jobs"
  on public.jobs for insert
  to authenticated
  with check (true);

create policy "Recruiters can update jobs"
  on public.jobs for update
  to authenticated
  using (true);

create policy "Recruiters can view all jobs"
  on public.jobs for select
  to authenticated
  using (true);

-- Candidates
alter table public.candidates enable row level security;

-- Public can insert candidates (when applying)
create policy "Anyone can upload candidate info"
  on public.candidates for insert
  to anon, authenticated
  with check (true);

-- Recruiters can view candidates
create policy "Recruiters can view candidates"
  on public.candidates for select
  to authenticated
  using (true);

-- Applications
alter table public.applications enable row level security;

-- Public can insert applications
create policy "Anyone can apply"
  on public.applications for insert
  to anon, authenticated
  with check (true);

-- Recruiters can view/update applications
create policy "Recruiters can view applications"
  on public.applications for select
  to authenticated
  using (true);

create policy "Recruiters can update applications"
  on public.applications for update
  to authenticated
  using (true);


-- Storage Policies (Run this section to fix upload errors)

-- Ensure storage schema extension is available (usually is)
-- create extension if not exists "storage"; 

-- Enable RLS on objects (if not already)
-- alter table storage.objects enable row level security;

-- Allow public uploads to 'resumes' bucket
create policy "Public Resumes Upload"
  on storage.objects for insert
  to anon, authenticated
  with check ( bucket_id = 'resumes' ); 

-- Allow public reads of 'resumes' bucket
create policy "Public Resumes View"
  on storage.objects for select
  to anon, authenticated
  using ( bucket_id = 'resumes' );
