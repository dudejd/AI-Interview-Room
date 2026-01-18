import WebcamAuth from "@/components/WebcamAuth"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-2 tracking-tighter">Identity <span className="text-primary glow">Verification</span></h1>
                <p className="text-foreground/50 mb-12">Secure biometric access for AI Interview Room</p>
                <WebcamAuth />

                <div className="mt-8 text-center text-sm">
                    <p className="text-foreground/50">New to AI Interview Room?</p>
                    <a href="/register" className="text-primary hover:underline font-bold">Create an account</a>
                </div>

                <div className="mt-12 text-sm text-foreground/40 flex items-center gap-4">
                    <span className="flex items-center gap-2 border-r border-glass-border pr-4">256-bit encryption</span>
                    <span className="flex items-center gap-2">Biometric secure-link</span>
                </div>
            </div>
        </div>
    )
}
