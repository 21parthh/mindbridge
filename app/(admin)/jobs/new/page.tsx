import { createJob } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewJobPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/jobs"
                    className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-4 transition-colors group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Jobs
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Post a New Job</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Create a new job opening to start receiving applications.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:rounded-2xl overflow-hidden">
                <form action={createJob} className="p-8 sm:p-10 space-y-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* Job Title */}
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-semibold leading-6 text-slate-900">
                                Job Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    placeholder="e.g. Senior Software Engineer"
                                    className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 bg-slate-50 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Department */}
                        <div className="sm:col-span-3">
                            <label htmlFor="department" className="block text-sm font-semibold leading-6 text-slate-900">
                                Department
                            </label>
                            <div className="mt-2">
                                <select
                                    id="department"
                                    name="department"
                                    required
                                    className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 bg-slate-50 focus:bg-white transition-all"
                                >
                                    <option value="">Select a department</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Operations">Operations</option>
                                    <option value="Design">Design</option>
                                    <option value="Product">Product</option>
                                </select>
                            </div>
                        </div>

                        {/* Employment Type */}
                        <div className="sm:col-span-3">
                            <label htmlFor="type" className="block text-sm font-semibold leading-6 text-slate-900">
                                Employment Type
                            </label>
                            <div className="mt-2">
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 bg-slate-50 focus:bg-white transition-all"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="sm:col-span-full">
                            <label htmlFor="location" className="block text-sm font-semibold leading-6 text-slate-900">
                                Location
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="location"
                                    id="location"
                                    required
                                    placeholder="e.g. San Francisco, CA (Remote)"
                                    className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 bg-slate-50 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-semibold leading-6 text-slate-900">
                                Initial Status
                            </label>
                            <div className="mt-2">
                                <select
                                    id="status"
                                    name="status"
                                    required
                                    className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-3 bg-slate-50 focus:bg-white transition-all"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-semibold leading-6 text-slate-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={6}
                                    required
                                    className="block w-full rounded-lg border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 bg-slate-50 focus:bg-white transition-all"
                                    placeholder="Describe the role responsibilities and requirements..."
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                You can use plain text. Markdown support coming soon.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-x-6 border-t border-slate-100 pt-8">
                        <Link href="/jobs" className="text-sm font-semibold leading-6 text-slate-900 hover:text-indigo-600">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:shadow-indigo-200 transform active:scale-[0.98]"
                        >
                            Save Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
