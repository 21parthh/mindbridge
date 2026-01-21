import ReactMarkdown from 'react-markdown'

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    )
}
