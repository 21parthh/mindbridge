'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createJob(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const department = formData.get('department') as string
    const location = formData.get('location') as string
    const type = formData.get('type') as string
    const description = formData.get('description') as string
    const status = formData.get('status') as string

    const { error } = await supabase.from('jobs').insert({
        title,
        department,
        location,
        type,
        description,
        status,
    })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/jobs')
    redirect('/jobs')
}

export async function getJobs() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function getJob(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        return null
    }

    return data
}

export async function updateJob(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const department = formData.get('department') as string
    const location = formData.get('location') as string
    const type = formData.get('type') as string
    const description = formData.get('description') as string
    const status = formData.get('status') as string

    const { error } = await supabase
        .from('jobs')
        .update({
            title,
            department,
            location,
            type,
            description,
            status,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/jobs')
    revalidatePath(`/jobs/${id}`)
    redirect(`/jobs/${id}`)
}

export async function deleteJob(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/jobs')
    redirect('/jobs')
}
