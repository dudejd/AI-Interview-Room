export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto text-foreground/80">
            <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
            <p className="mb-8 text-sm text-foreground/60">Last Updated: January 2026</p>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-bold text-primary">1. Information We Collect</h2>
                <p>
                    We collect information you provide directly to us, such as your name, email, and professional details during registration.
                    During interviews, we process video and audio data to provide feedback. This biometric data is processed in real-time.
                </p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-bold text-primary">2. How We Use Your Data</h2>
                <p>
                    Your data is used solely to functionality of the AI Interview Coach. We do not sell your personal data to third parties.
                    Aggregated, anonymized data may be used to improve our AI models.
                </p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-bold text-primary">3. Data Security</h2>
                <p>
                    We implement industry-standard security measures including 256-bit encryption for data in transit and at rest.
                    However, no method of transmission over the Internet is 100% secure.
                </p>
            </section>

            <section className="mb-8 space-y-4">
                <h2 className="text-2xl font-bold text-primary">4. Your Rights</h2>
                <p>
                    You have the right to request access to, correction of, or deletion of your personal data at any time.
                    You can manage these settings directly from your user dashboard.
                </p>
            </section>
        </div>
    )
}
