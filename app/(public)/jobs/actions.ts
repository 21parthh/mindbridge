'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { CandidateEmailTemplate, RecruiterEmailTemplate } from '@/components/EmailTemplate'

// Renamed from submitApplication and removed file upload logic
export async function saveApplicationData(formData: FormData, resumeUrl: string) {
    const supabase = await createClient()

    const jobId = formData.get('jobId') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const linkedinUrl = formData.get('linkedinUrl') as string

    // Fetch Job Details for Email
    const { data: job } = await supabase
        .from('jobs')
        .select('title')
        .eq('id', jobId)
        .single()

    const jobTitle = job?.title || 'Job Application'

    // 2. Create Candidate (Manual UUID to avoid RLS Select issue)
    const candidateId = crypto.randomUUID()

    // We don't need to select() back because we generated the ID
    const { error: candidateError } = await supabase
        .from('candidates')
        .insert({
            id: candidateId,
            name,
            email,
            phone,
            linkedin_url: linkedinUrl,
            resume_url: resumeUrl,
        })

    if (candidateError) {
        console.error('Candidate Error:', candidateError)
        throw new Error('Failed to save candidate info')
    }

    // 3. Create Application
    const { error: applicationError } = await supabase
        .from('applications')
        .insert({
            job_id: jobId,
            candidate_id: candidateId,
            status: 'Applied',
        })

    if (applicationError) {
        console.error('Application Error:', applicationError)
        throw new Error('Failed to submit application')
    }

    // 4. Send Emails (Resend)
    // Instantiate Resend lazily to prevent module-level errors if API key is missing
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
        const resend = new Resend(resendApiKey)
        try {
            // Email to Candidate
            const { error: candidateError } = await resend.emails.send({
                from: 'Mindbridge Recruiting <connect@templeadsinfotech.com>',
                to: [email],
                subject: `Application Received: ${jobTitle}`,
                react: CandidateEmailTemplate({ name, jobTitle }) as any,
            })

            if (candidateError) {
                console.error('Resend Candidate Error:', candidateError)
            } else {
                console.log('Candidate email sent successfully')
            }

            // Email to Recruiter
            const { error: recruiterError } = await resend.emails.send({
                from: 'Mindbridge Recruiting <connect@templeadsinfotech.com>',
                to: ['connect@templeadsinfotech.com'],
                subject: `New Candidate: ${name} for ${jobTitle}`,
                react: RecruiterEmailTemplate({ name, jobTitle }) as any,
            })

            if (recruiterError) {
                console.error('Resend Recruiter Error:', recruiterError)
            } else {
                console.log('Recruiter email sent successfully')
            }
        } catch (emailError) {
            console.error('Unexpected Email Error:', emailError)
            // We do NOT throw here, as the application itself was successful.
        }
    } else {
        console.warn('RESEND_API_KEY is missing. Email notifications were skipped.')
    }

    redirect(`/jobs/${jobId}/apply/success`)
}

export async function getJobDetails(jobId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single()

    if (error) {
        // Return null if not found
        return null
    }
    return data
}
