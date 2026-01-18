export default function HowItWorks() {
    return (
        <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">How It Works</h1>
            <div className="space-y-12">
                <section className="glass p-8 rounded-2xl border-white/5">
                    <h2 className="text-2xl font-bold mb-4 text-primary">1. Create Your Profile</h2>
                    <p className="text-foreground/70">Sign up and tell us about your target role and experience level. Our AI customizes the interview difficulty based on your profile.</p>
                </section>
                <section className="glass p-8 rounded-2xl border-white/5">
                    <h2 className="text-2xl font-bold mb-4 text-primary">2. Select Interview Type</h2>
                    <p className="text-foreground/70">Choose between General, Technical, Behavioral, or HR interviews. You can also create custom sessions tailored to specific job descriptions.</p>
                </section>
                <section className="glass p-8 rounded-2xl border-white/5">
                    <h2 className="text-2xl font-bold mb-4 text-primary">3. Start the Simulation</h2>
                    <p className="text-foreground/70">Enter the AI Interview Room. Our system uses your camera and microphone to track your emotions, eye contact, and verbal responses in real-time.</p>
                </section>
                <section className="glass p-8 rounded-2xl border-white/5">
                    <h2 className="text-2xl font-bold mb-4 text-primary">4. Get Instant Feedback</h2>
                    <p className="text-foreground/70">Receive a detailed report card immediately after the session. We analyze your confidence, answer clarity, and technical accuracy to help you improve.</p>
                </section>
            </div>
        </div>
    )
}
