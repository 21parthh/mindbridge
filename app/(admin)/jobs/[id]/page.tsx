import { getJob, deleteJob } from '../actions'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, Pencil, Trash2, MapPin, Briefcase, Clock, Calendar } from 'lucide-react'

export default async function JobDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const job = await getJob(id)

    if (!job) {
        notFound()
    }

    async function handleDelete() {
        'use server'
        await deleteJob(id)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <Link
                    href="/jobs"
                    className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Jobs
                </Link>
                <div className="flex items-center gap-3">
                    <Link
                        href={`/jobs/${id}/edit`}
                        className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
                    >
                        <Pencil className="mr-2 h-4 w-4 text-slate-400" />
                        Edit Job
                    </Link>
                    <form action={handleDelete}>
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-lg bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm ring-1 ring-inset ring-rose-100 hover:bg-rose-100 transition-colors"
                        // In a real app, add a JS confirmation via onClick or a modal
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:rounded-2xl overflow-hidden">
                <div className="px-6 py-8 sm:px-10 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-x-3 text-sm leading-6 text-slate-500 mb-4">
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
                        <span>•</span>
                        <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {job.title}
                    </h1>
                </div>

                <div className="px-6 py-8 sm:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-sm font-semibold leading-6 text-slate-900 mb-4 uppercase tracking-wide">Description</h3>
                            <div className="prose prose-slate prose-sm max-w-none text-slate-600 whitespace-pre-line leading-relaxed">
                                {job.description}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1 border-l border-slate-100 pl-8 space-y-8">
                        <div>
                            <h3 className="text-sm font-semibold leading-6 text-slate-900 mb-4 uppercase tracking-wide">Details</h3>
                            <ul className="space-y-4 text-sm text-slate-600">
                                <li className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <Briefcase className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <span className="font-medium">{job.department}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <MapPin className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <span className="font-medium">{job.location}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <Clock className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <span className="font-medium">{job.type}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
