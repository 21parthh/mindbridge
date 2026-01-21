import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                <p className="text-gray-600 mb-8">
                    Thank you for applying. We have received your application and will review it shortly.
                </p>
                <Link
                    href="/"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Back to Careers
                </Link>
            </div>
        </div>
    )
}
