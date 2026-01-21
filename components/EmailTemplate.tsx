import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    jobTitle: string;
}

export const CandidateEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    jobTitle,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
        <h1 style={{ color: '#4f46e5' }}>Application Received</h1>
        <p>Hi <strong>{name}</strong>,</p>
        <p>Thank you for applying to the <strong>{jobTitle}</strong> position at Mindbridge.</p>
        <p>We have received your application and our team will review it shortly. If your profile matches our requirements, we will reach out to schedule the next steps.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>The Mindbridge Recruiting Team</strong></p>
    </div>
);

export const RecruiterEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    jobTitle,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.5' }}>
        <h1 style={{ color: '#111827' }}>New Candidate Application</h1>
        <p><strong>Job:</strong> {jobTitle}</p>
        <p><strong>Candidate:</strong> {name}</p>
        <hr style={{ borderColor: '#e5e7eb', margin: '20px 0' }} />
        <p>A new candidate has applied. Please log in to the dashboard to review their resume and details.</p>
        <a href="http://localhost:3000/dashboard" style={{ display: 'inline-block', backgroundColor: '#4f46e5', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
            Go to Dashboard
        </a>
    </div>
);
