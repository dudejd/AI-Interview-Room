import { Check } from "lucide-react";

export default function Pricing() {
    return (
        <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Simple, Transparent Pricing</h1>
            <p className="text-foreground/60 mb-12 text-lg">Invest in your career with plans designed for success.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {/* Free Plan */}
                <div className="glass p-8 rounded-2xl border-white/5 hover:border-primary/30 transition-colors relative flex flex-col">
                    <h3 className="text-xl font-bold text-foreground/80 mb-2">Starter</h3>
                    <div className="text-3xl font-bold mb-6">$0</div>
                    <ul className="space-y-4 mb-8 flex-1 text-sm text-foreground/70">
                        <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5" /> 3 Interviews per month</li>
                        <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5" /> Basic Feedback</li>
                        <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5" /> General Questions</li>
                    </ul>
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg">Current Plan</button>
                </div>

                {/* Pro Plan */}
                <div className="glass p-8 rounded-2xl border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] relative flex flex-col transform scale-105">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
                    <h3 className="text-xl font-bold text-primary mb-2">Pro</h3>
                    <div className="text-3xl font-bold mb-6">$19<span className="text-lg font-normal text-foreground/50">/mo</span></div>
                    <ul className="space-y-4 mb-8 flex-1 text-sm text-foreground/80">
                        <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5" /> Unlimited Interviews</li>
                        <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5" /> Advanced AI Analytics</li>
                        <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5" /> Technical & Behavioral Sets</li>
                        <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5" /> Session Recordings</li>
                    </ul>
                    <button className="w-full py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">Upgrade Now</button>
                </div>

                {/* Enterprise Plan */}
                <div className="glass p-8 rounded-2xl border-white/5 hover:border-secondary/30 transition-colors relative flex flex-col">
                    <h3 className="text-xl font-bold text-foreground/80 mb-2">Ultimate</h3>
                    <div className="text-3xl font-bold mb-6">$49<span className="text-lg font-normal text-foreground/50">/mo</span></div>
                    <ul className="space-y-4 mb-8 flex-1 text-sm text-foreground/70">
                        <li className="flex items-center gap-3"><Check className="text-secondary w-5 h-5" /> Everything in Pro</li>
                        <li className="flex items-center gap-3"><Check className="text-secondary w-5 h-5" /> Custom Question Banks</li>
                        <li className="flex items-center gap-3"><Check className="text-secondary w-5 h-5" /> HR Dashboard Access</li>
                        <li className="flex items-center gap-3"><Check className="text-secondary w-5 h-5" /> Priority Support</li>
                    </ul>
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg">Contact Sales</button>
                </div>
            </div>
        </div>
    )
}
