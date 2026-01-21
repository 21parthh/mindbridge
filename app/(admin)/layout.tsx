import Link from 'next/link'
import { signout } from '@/app/login/actions'
import { LayoutDashboard, Briefcase, LogOut } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="bg-indigo-500 p-1.5 rounded-lg shadow-lg shadow-indigo-900/50">
                            <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Mindbridge</h1>
                    </div>
                    <p className="text-xs text-slate-400 pl-9">Recruiter Dashboard</p>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group"
                    >
                        <LayoutDashboard className="mr-3 h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                        Dashboard
                    </Link>
                    <Link
                        href="/jobs"
                        className="flex items-center px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group"
                    >
                        <Briefcase className="mr-3 h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                        Jobs
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <form action={signout}>
                        <button
                            type="submit"
                            className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-slate-50">
                <div className="h-full w-full max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
