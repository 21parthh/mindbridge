'use client'

import { useState } from 'react'
import {
    DndContext,
    DragOverlay,
    useDraggable,
    useDroppable,
    DragEndEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import { updateApplicationStatus } from '../app/(admin)/dashboard/actions'
import CandidateModal from './CandidateModal'

type Candidate = {
    id: string
    status: string
    created_at: string
    candidate: {
        name: string
        email: string
        phone: string
        linkedin_url?: string
        resume_url: string
    }
    job: {
        title: string
    }
}

type KanbanProps = {
    initialData: Record<string, Candidate[]>
}

export default function KanbanBoard({ initialData }: KanbanProps) {
    const [columns, setColumns] = useState(initialData)
    const [activeId, setActiveId] = useState<string | null>(null)
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string // 'Applied', 'Screening', etc.

        // Find source column
        let sourceColumnKey = ''
        let activeItem: any = null

        for (const [key, items] of Object.entries(columns)) {
            const item = items.find((i) => i.id === activeId)
            if (item) {
                sourceColumnKey = key
                activeItem = item
                break
            }
        }

        if (!sourceColumnKey || !activeItem) return

        // If dropped in the same column, do nothing
        if (sourceColumnKey === overId) {
            setActiveId(null)
            return
        }

        // Optimistic Update
        setColumns((prev) => {
            const sourceList = prev[sourceColumnKey].filter((i) => i.id !== activeId)
            const destList = [...prev[overId], { ...activeItem, status: overId }]
            return {
                ...prev,
                [sourceColumnKey]: sourceList,
                [overId]: destList
            }
        })

        setActiveId(null)

        // Server Update
        try {
            await updateApplicationStatus(activeId, overId)
        } catch (error) {
            console.error("Failed to update status", error)
            // Revert on error (optional, simplified for now)
        }
    }

    return (
        <>
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex h-full gap-6 overflow-x-auto pb-4">
                    {Object.entries(columns).map(([columnId, items]) => (
                        <Column
                            key={columnId}
                            id={columnId}
                            title={columnId}
                            items={items}
                            onItemClick={(item) => setSelectedCandidate(item)}
                        />
                    ))}
                </div>
                {typeof document !== 'undefined' && createPortal(
                    <DragOverlay>
                        {activeId ? (
                            <div className="w-80 bg-white p-4 rounded-lg shadow-xl cursor-grabbing border-2 border-indigo-500 opacity-90 transform rotate-2">
                                Dragging...
                            </div>
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>

            <CandidateModal
                candidate={selectedCandidate}
                isOpen={!!selectedCandidate}
                onClose={() => setSelectedCandidate(null)}
            />
        </>
    )
}

function Column({ id, title, items, onItemClick }: { id: string; title: string; items: Candidate[]; onItemClick: (item: Candidate) => void }) {
    const { setNodeRef } = useDroppable({
        id: id,
    })

    return (
        <div
            ref={setNodeRef}
            className="flex h-full w-80 min-w-[20rem] flex-col rounded-xl bg-slate-100/50 border border-slate-200/60"
        >
            <div className="flex items-center justify-between p-4 border-b border-slate-200/60 bg-white/50 rounded-t-xl backdrop-blur-sm">
                <h3 className="font-semibold text-slate-700 text-sm tracking-wide uppercase">{title}</h3>
                <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                    {items.length}
                </span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {items.map((item) => (
                    <DraggableItem key={item.id} item={item} onClick={() => onItemClick(item)} />
                ))}
            </div>
        </div>
    )
}

function DraggableItem({ item, onClick }: { item: Candidate; onClick: () => void }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
        data: item,
    })

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-40 bg-indigo-50 p-4 rounded-xl border-2 border-dashed border-indigo-300 h-28 transform scale-105 shadow-xl rotate-2"
            />
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
            className="cursor-grab bg-white p-4 rounded-xl shadow-sm border border-slate-200 group hover:border-indigo-300 hover:shadow-md hover:ring-1 hover:ring-indigo-100 transition-all active:cursor-grabbing active:scale-[1.02]"
        >
            <h4 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {item.candidate.name}
            </h4>
            <p className="text-xs text-slate-500 mt-1 truncate font-medium">{item.job.title}</p>
            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono tracking-tight uppercase">
                    {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
            </div>
        </div>
    )
}
