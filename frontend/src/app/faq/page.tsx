export default function FAQ() {
    return (
        <div className="min-h-screen pt-24 px-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Frequently Asked Questions</h1>

            <div className="space-y-6">
                <div className="glass p-6 rounded-xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-2">How accurate is the AI feedback?</h3>
                    <p className="text-foreground/70 text-sm">Our AI uses Google's latest Gemini models combined with advanced computer vision. While highly accurate for coaching, it serves as a preparation tool rather than a final judgment of your hireability.</p>
                </div>

                <div className="glass p-6 rounded-xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-2">Is my video data recorded?</h3>
                    <p className="text-foreground/70 text-sm">For the "Starter" plan, video data is processed in real-time and not stored. "Pro" and "Ultimate" plans offer the option to save recordings for your own review, but you have full control to delete them.</p>
                </div>

                <div className="glass p-6 rounded-xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-2">Can I customize the questions?</h3>
                    <p className="text-foreground/70 text-sm">Yes! The "Custom Interview" mode allows you to input specific job descriptions or topics, and the AI will generate relevant questions for that context.</p>
                </div>

                <div className="glass p-6 rounded-xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-2">Do you support other languages?</h3>
                    <p className="text-foreground/70 text-sm">Currently, the platform is optimized for English interviews. We are actively working on adding support for Spanish, French, and German in the next update.</p>
                </div>
            </div>
        </div>
    )
}
