export default function InterviewTips() {
    return (
        <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Interview Success Tips</h1>

            <div className="grid gap-8">
                <article className="glass p-8 rounded-2xl border-white/5">
                    <div className="text-primary font-bold text-xl mb-2">01. Use the STAR Method</div>
                    <p className="text-foreground/70 leading-relaxed">
                        When answering behavioral questions, structure your response using Situation, Task, Action, and Result. This ensures your stories are concise and impactful.
                    </p>
                </article>

                <article className="glass p-8 rounded-2xl border-white/5">
                    <div className="text-primary font-bold text-xl mb-2">02. Maintain Eye Contact</div>
                    <p className="text-foreground/70 leading-relaxed">
                        Even in remote interviews, looking at the camera (not the screen) simulates eye contact. Our AI tracks this metric to help you improve your engagement.
                    </p>
                </article>

                <article className="glass p-8 rounded-2xl border-white/5">
                    <div className="text-primary font-bold text-xl mb-2">03. Research the Company</div>
                    <p className="text-foreground/70 leading-relaxed">
                        Understand their values, products, and recent news. Tailor your answers to show how your skills align with their specific goals.
                    </p>
                </article>

                <article className="glass p-8 rounded-2xl border-white/5">
                    <div className="text-primary font-bold text-xl mb-2">04. Prepare Technical Basics</div>
                    <p className="text-foreground/70 leading-relaxed">
                        For technical roles, revisit core concepts. It's OK not to know everything, but explaining your thought process clearly is crucial.
                    </p>
                </article>
            </div>
        </div>
    )
}
