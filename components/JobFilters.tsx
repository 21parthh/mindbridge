'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'
import { Search, MapPin, Briefcase, X } from 'lucide-react'

export default function JobFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Initialize state from URL params
    const [query, setQuery] = useState(searchParams.get('query') || '')
    const [location, setLocation] = useState(searchParams.get('location') || '')
    const [type, setType] = useState(searchParams.get('type') || '')

    // Debounce function to avoid updating URL on every keystroke
    useEffect(() => {
        const timer = setTimeout(() => {
            updateFilters({ query, location, type })
        }, 500)

        return () => clearTimeout(timer)
    }, [query, location, type]) // eslint-disable-line react-hooks/exhaustive-deps

    const updateFilters = useCallback((filters: { query: string; location: string; type: string }) => {
        const params = new URLSearchParams(searchParams.toString())

        if (filters.query) params.set('query', filters.query)
        else params.delete('query')

        if (filters.location) params.set('location', filters.location)
        else params.delete('location')

        if (filters.type && filters.type !== 'All Types') params.set('type', filters.type)
        else params.delete('type')

        router.push(`/?${params.toString()}`, { scroll: false })
    }, [searchParams, router])

    const clearFilters = () => {
        setQuery('')
        setLocation('')
        setType('')
        router.push('/', { scroll: false })
    }

    const hasFilters = query || location || type

    return (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Search Term */}
                <div className="md:col-span-5 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by job title or keyword..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="block w-full rounded-xl border-0 py-3 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white"
                    />
                </div>

                {/* Location */}
                <div className="md:col-span-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Location (e.g. Remote, New York)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="block w-full rounded-xl border-0 py-3 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white"
                    />
                </div>

                {/* Job Type */}
                <div className="md:col-span-3 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-slate-400" />
                    </div>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="block w-full rounded-xl border-0 py-3 pl-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all bg-slate-50 focus:bg-white appearance-none cursor-pointer"
                    >
                        <option value="">All Types</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {hasFilters && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={clearFilters}
                        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors"
                    >
                        <X className="mr-1 h-4 w-4" />
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    )
}
