'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveApplicationData } from '@/app/(public)/jobs/actions'
import { Upload, Loader2, CheckCircle } from 'lucide-react'

export default function ApplicationForm({ job }: { job: any }) {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsUploading(true)
        setError('')
        setUploadStatus('Uploading resume...')

        const formData = new FormData(event.currentTarget)
        const resumeFile = formData.get('resume') as File
        const name = formData.get('name') as string

        if (!resumeFile || resumeFile.size === 0) {
            setError('Please select a resume file.')
            setIsUploading(false)
            return
        }

        try {
            const supabase = createClient()

            // 1. Upload Resume via Client
            const fileExt = resumeFile.name.split('.').pop()
            const fileName = `${Date.now()}-${name.replace(/\s/g, '_')}.${fileExt}`
            const filePath = `applications/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, resumeFile)

            if (uploadError) {
                throw new Error(`Upload failed: ${uploadError.message}`)
            }

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath)

            setUploadStatus('Saving application...')

            // 2. Save Data via Server Action
            await saveApplicationData(formData, publicUrl)

        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Something went wrong. Please try again.')
            setIsUploading(false)
            setUploadStatus('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="jobId" value={job.id} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900">Full Name</label>
                    <input type="text" name="name" id="name" required className="mt-2 block w-full rounded-lg border-0 px-3 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white" placeholder="Jane Doe" />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-slate-900">Phone Number</label>
                    <input type="tel" name="phone" id="phone" required className="mt-2 block w-full rounded-lg border-0 px-3 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="col-span-2">
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">Email Address</label>
                    <input type="email" name="email" id="email" required className="mt-2 block w-full rounded-lg border-0 px-3 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white" placeholder="jane@example.com" />
                </div>

                <div className="col-span-2">
                    <label htmlFor="linkedinUrl" className="block text-sm font-semibold leading-6 text-slate-900">LinkedIn URL <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input type="url" name="linkedinUrl" id="linkedinUrl" className="mt-2 block w-full rounded-lg border-0 px-3 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white" placeholder="https://linkedin.com/in/jane-doe" />
                </div>
            </div>

            <div>
                <label htmlFor="resume" className="block text-sm font-semibold leading-6 text-slate-900">Resume/CV</label>
                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-slate-300 px-6 py-10 bg-slate-50/50 hover:bg-slate-50 transition-colors group">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 text-slate-300 bg-white rounded-full flex items-center justify-center shadow-sm ring-1 ring-slate-200 group-hover:ring-indigo-200 group-hover:text-indigo-500 transition-all">
                            <Upload className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="mt-4 flex text-sm leading-6 text-slate-600 text-center justify-center">
                            <label
                                htmlFor="resume"
                                className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input id="resume" name="resume" type="file" accept=".pdf" className="sr-only" required />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-slate-500">PDF up to 5MB</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-100 flex items-start gap-3">
                    <div className="flex-shrink-0 text-red-500">🚫</div>
                    <div className="text-sm text-red-700 font-medium">{error}</div>
                </div>
            )}

            {isUploading && (
                <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100 flex items-center gap-3">
                    <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
                    <div>
                        <p className="text-sm font-semibold text-indigo-900">Processing Application</p>
                        <p className="text-xs text-indigo-700">{uploadStatus}</p>
                    </div>
                </div>
            )}

            <div>
                <button
                    type="submit"
                    disabled={isUploading}
                    className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 hover:shadow-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                >
                    {isUploading ? 'Submitting...' : 'Submit Application'}
                </button>
            </div>
        </form>
    )
}
