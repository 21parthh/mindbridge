import { X, Download, Mail, Phone, Linkedin } from 'lucide-react'

type CandidateModalProps = {
    candidate: any
    isOpen: boolean
    onClose: () => void
}

export default function CandidateModal({ candidate, isOpen, onClose }: CandidateModalProps) {
    if (!isOpen || !candidate) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm sm:p-6 animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between p-6 sm:p-8 border-b border-slate-100">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{candidate.candidate.name}</h2>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Applied for <span className="text-indigo-600">{candidate.job.title}</span></p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center space-x-3 text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm border border-slate-100">
                                <Mail className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium truncate">{candidate.candidate.email}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm border border-slate-100">
                                <Phone className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">{candidate.candidate.phone}</span>
                        </div>
                        {candidate.candidate.linkedin_url && (
                            <div className="flex items-center space-x-3 text-slate-600 col-span-full p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm border border-slate-100">
                                    <Linkedin className="h-4 w-4" />
                                </div>
                                <a
                                    href={candidate.candidate.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-indigo-600 hover:underline truncate"
                                >
                                    {candidate.candidate.linkedin_url}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Status & Timing */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-medium">Current Stage</span>
                            <span className="font-bold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200 text-xs uppercase tracking-wider">
                                {candidate.status}
                            </span>
                        </div>
                        <div className="h-px bg-slate-200"></div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-medium">Applied On</span>
                            <span className="font-semibold text-slate-900">
                                {new Date(candidate.created_at).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Resume */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Resume</h3>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-indigo-300 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                </div>
                                <div className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                                    {candidate.candidate.name}_Resume.pdf
                                </div>
                            </div>
                            <a
                                href={candidate.candidate.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors"
                            >
                                <Download className="h-4 w-4" />
                                Download
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all"
                    >
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    )
}
