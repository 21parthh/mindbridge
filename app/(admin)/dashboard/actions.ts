'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCandidates() {
    const supabase = await createClient()

    // Fetch candidates with job details
    const { data, error } = await supabase
        .from('applications')
        .select(`
      id,
      status,
      created_at,
      candidate:candidates (
        id,
        name,
        email,
        resume_url
      ),
      job:jobs (
        id,
        title
      )
    `)
        .order('created_at', { ascending: false })

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function updateApplicationStatus(applicationId: string, newStatus: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/dashboard')
}
