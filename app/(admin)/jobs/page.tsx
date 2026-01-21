import Link from 'next/link'
import { getJobs } from './actions'
import { Plus, MapPin, Briefcase, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns' // Need to install date-fns

export default async function JobsPage() {
    const jobs = await getJobs()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Jobs</h2>
                    <p className="text-gray-500">Manage your job postings and applications.</p>
                </div>
                <Link
                    href="/jobs/new"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Job
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
                        <div className="bg-slate-50 p-4 rounded-full mb-4">
                            <Briefcase className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No jobs found</h3>
                        <p className="max-w-sm text-center mt-1">Get started by creating your first job posting to attract candidates.</p>
                        <Link
                            href="/jobs/new"
                            className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Job
                        </Link>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group"
                        >
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${job.status === 'Published'
                                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
                                            : job.status === 'Draft'
                                                ? 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-600/20'
                                                : 'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10'
                                            }`}
                                    >
                                        {job.status}
                                    </span>
                                </div>
                                <div className="space-y-3 text-sm text-slate-500">
                                    <div className="flex items-center">
                                        <Briefcase className="mr-2.5 h-4 w-4 text-slate-400" />
                                        {job.department}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="mr-2.5 h-4 w-4 text-slate-400" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="mr-2.5 h-4 w-4 text-slate-400" />
                                        {job.type}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-medium">
                                <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                                <Link href={`/jobs/${job.id}`} className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
