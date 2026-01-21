import { getCandidates } from './actions'
import KanbanBoard from '@/components/KanbanBoard'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const candidates = await getCandidates()

    // Group by status
    const columns: Record<string, any[]> = {
        'Applied': [],
        'Screening': [],
        'Interview': [],
        'Offer': [],
        'Rejected': []
    }

    candidates.forEach(app => {
        if (columns[app.status]) {
            columns[app.status].push(app)
        }
    })

    return (
        <div className="h-full flex flex-col">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Candidate Pipeline</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage applications across different stages.</p>
                </div>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden -mx-4 px-4 pb-4">
                <KanbanBoard initialData={columns} />
            </div>
        </div>
    )
}
