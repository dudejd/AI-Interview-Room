"use client"
import React from 'react'
import { motion } from 'framer-motion'
import {
    Briefcase,
    Code,
    MessageSquare,
    UserCheck,
    History,
    TrendingUp,
    Award,
    Play
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const INTERVIEW_CATEGORIES = [
    {
        id: 'technical',
        title: 'Technical Interview',
        description: 'Deep dive into coding, system design, and problem-solving.',
        icon: <Code className="text-purple-400" />,
        color: 'from-purple-500/20 to-purple-600/20',
        borderColor: 'border-purple-500/30'
    },
    {
        id: 'general',
        title: 'General Interview',
        description: 'Standard behavioral and common questions for any role.',
        icon: <MessageSquare className="text-blue-400" />,
        color: 'from-blue-500/20 to-blue-600/20',
        borderColor: 'border-blue-500/30'
    },
    {
        id: 'custom',
        title: 'Custom Interview',
        description: 'User-defined topics and specific question sets.',
        icon: <Award className="text-red-400" />,
        color: 'from-red-500/20 to-red-600/20',
        borderColor: 'border-red-500/30'
    },
    {
        id: 'behavioral',
        title: 'Behavioral Interview',
        description: 'Competency-based questions following the STAR method.',
        icon: <UserCheck className="text-green-400" />,
        color: 'from-green-500/20 to-green-600/20',
        borderColor: 'border-green-500/30'
    },
    {
        id: 'hr',
        title: 'HR / Communication Interview',
        description: 'Cultural fit, soft skills, and effective communication.',
        icon: <Briefcase className="text-orange-400" />,
        color: 'from-orange-500/20 to-orange-600/20',
        borderColor: 'border-orange-500/30'
    }
]

export default function StudentDashboard() {
    const router = useRouter()

    const startInterview = (category: string) => {
        router.push(`/interview?category=${category}`)
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 lg:p-12 overflow-x-hidden">
            <header className="mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-bold tracking-tighter mb-2">
                        Student <span className="text-primary glow">Dashboard</span>
                    </h1>
                    <p className="text-foreground/50">Welcome back, Ishan. Ready to sharpen your skills?</p>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Stats Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-6 border-white/5 bg-primary/5">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="text-primary" size={20} />
                            <h3 className="font-bold text-sm uppercase tracking-widest text-primary">Performance</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-foreground/50">Overall Score</span>
                                    <span className="font-bold">78%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '78%' }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="text-2xl font-bold">12</div>
                                    <div className="text-[10px] text-foreground/40 uppercase font-bold">Sessions</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="text-2xl font-bold">8.4</div>
                                    <div className="text-[10px] text-foreground/40 uppercase font-bold">Avg Clarity</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-6 border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <Award className="text-accent" size={20} />
                            <h3 className="font-bold text-sm uppercase tracking-widest text-accent">Recent Badges</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success border border-success/30" title="Fluent Speaker">🗣️</div>
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30" title="Fast Learner">⚡</div>
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/30" title="Technical Pro">💻</div>
                        </div>
                    </div>
                </div>

                {/* Interview Selection Section */}
                <div className="lg:col-span-3">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <Play className="text-primary fill-primary" size={20} />
                        Select Interview Type
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {INTERVIEW_CATEGORIES.map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => startInterview(cat.id)}
                                className={`glass p-8 border-2 ${cat.borderColor} bg-gradient-to-br ${cat.color} cursor-pointer hover:scale-[1.02] transition-all group relative overflow-hidden`}
                            >
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {cat.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 tracking-tighter">{cat.title}</h3>
                                    <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                                        {cat.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                                        Start Session <Play size={10} className="fill-primary" />
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} rotate-45 translate-x-16 -translate-y-16 blur-3xl opacity-50`} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <History className="text-foreground/40" size={20} />
                            Recent Sessions
                        </h2>
                        <div className="space-y-4">
                            {[
                                { date: 'Today', type: 'Technical', score: 88, status: 'Completed' },
                                { date: 'Yesterday', type: 'HR', score: 72, status: 'Completed' },
                                { date: '3 days ago', type: 'General', score: 0, status: 'Abandoned' }
                            ].map((session, idx) => (
                                <div key={idx} className="glass px-6 py-4 border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${session.score > 80 ? 'bg-success' : session.score > 0 ? 'bg-warning' : 'bg-error'}`} />
                                        <div>
                                            <div className="font-bold text-sm">{session.type} Interview</div>
                                            <div className="text-[10px] text-foreground/40 uppercase">{session.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <div className="text-sm font-bold font-mono">{session.score}%</div>
                                            <div className="text-[10px] text-foreground/30 uppercase">Score</div>
                                        </div>
                                        <button className="text-xs font-bold uppercase text-primary/60 hover:text-primary transition-colors">Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
