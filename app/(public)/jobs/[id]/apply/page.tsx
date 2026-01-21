import { getJobDetails } from '../../actions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ApplicationForm from '@/components/ApplicationForm'
import MarkdownRenderer from '@/components/MarkdownRenderer'

// Correct SearchParams handling for Next.js 15+ (if using that) or 14
// Using props params approach for dynamic route

export default async function JobApplicationPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const job = await getJobDetails(id)

    if (!job) {
        notFound()
    }

    if (job.status !== 'Published') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Job Not Available</h2>
                    <p className="mt-2 text-gray-600">This job posting is no longer accepting applications.</p>
                    <Link href="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">
                        Browse other jobs
                    </Link>
                </div>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-6 transition-colors group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Careers
                    </Link>

                    <div className="bg-white rounded-2xl p-8 shadow-xl shadow-indigo-100 ring-1 ring-slate-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{job.title}</h1>
                                <div className="mt-2 flex items-center gap-4 text-sm font-medium text-slate-500">
                                    <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full ring-1 ring-inset ring-indigo-700/10">
                                        {job.department}
                                    </span>
                                    <span>{job.location}</span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                        </div>

                        <MarkdownRenderer content={job.description} />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 ring-1 ring-slate-100 p-8 sm:p-10">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Apply for this position</h2>
                    <p className="text-slate-500 text-sm mb-8">Fill out the form below to submit your application.</p>
                    <ApplicationForm job={job} />
                </div>
            </div>
        </div>
    )
}
