import Link from 'next/link'
import { Briefcase, Key, ArrowRight, Search, MapPin, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Mindbridge - Find Your Future',
  description: 'Connect with top companies and find your dream job today.',
}

export default async function Home() {
  const supabase = await createClient()
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'Published')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">

              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Mindbridge
              </span>
            </div>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              <Key className="h-4 w-4" />
              Recruiter Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
              Discover opportunities that <span className="text-indigo-600">match your potential</span>
            </h1>
            <p className="text-md sm:text-lg leading-8 text-slate-600 mb-8">
              Mindbridge connects talent with forward-thinking companies.
              Browse our curated job listings and take the next step in your career.
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <a
                href="#jobs"
                className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all flex items-center gap-2"
              >
                Browse Jobs <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/login" className="text-sm font-semibold leading-6 text-slate-900 hover:text-indigo-600 transition-colors">
                Post a Job <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>



      {/* Job Listings */}
      <main id="jobs" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Open Positions</h2>
            <p className="mt-2 text-lg leading-8 text-slate-600">
              Find the role that fits you perfectly.
            </p>
          </div>

          {!jobs || jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm mx-auto max-w-2xl">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">No jobs found</h3>
              <p className="mt-1 text-sm text-slate-500">We're currently updating our listings. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}/apply`}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-indigo-100 group"
                >
                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-x-3 mb-4">
                      <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-6 text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-slate-600 line-clamp-3">
                      {job.description}
                    </p>
                  </div>
                  <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:bg-indigo-50/50 transition-colors">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">© 2024 Mindbridge Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-semibold text-slate-600">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
