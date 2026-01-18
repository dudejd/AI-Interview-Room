"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, TrendingUp, AlertTriangle, Download, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

export default function FeedbackDashboard() {
    const scores = [
        { label: "Confidence", value: 78, color: "var(--primary)" },
        { label: "Communication", value: 85, color: "var(--secondary)" },
        { label: "Accuracy", value: 65, color: "var(--accent)" }
    ]

    return (
        <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-12">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Interview <span className="text-primary glow">Report</span></h1>
                    <p className="text-foreground/50">Comprehensive analysis of your performance on Jan 17, 2026</p>
                </div>
                <button className="flex items-center gap-2">
                    <Download size={18} />
                    Download PDF
                </button>
            </header>

            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {scores.map((score, idx) => (
                    <div key={idx} className="glass p-8 flex flex-col items-center text-center border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Animated Circle */}
                        <div className="relative w-32 h-32 mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                <motion.circle
                                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                                    strokeDasharray={364}
                                    initial={{ strokeDashoffset: 364 }}
                                    animate={{ strokeDashoffset: 364 - (364 * score.value) / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    style={{ color: score.color }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold font-mono">
                                {score.value}%
                            </div>
                        </div>

                        <h3 className="text-lg font-bold mb-1">{score.label}</h3>
                        <p className="text-xs text-foreground/40 uppercase tracking-widest">Performance Score</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Strengths */}
                <div className="glass p-8 border-success/10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-success">
                        <CheckCircle size={20} /> Key Strengths
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Strong eye contact throughout the technical section.",
                            "Clear articulation of complex programming concepts.",
                            "Maintained a positive and professional facial expression."
                        ].map((s, i) => (
                            <li key={i} className="flex gap-4 text-foreground/80 bg-success/5 p-4 rounded-xl border border-success/10">
                                <span className="text-success font-bold">0{i + 1}</span>
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Areas to Improve */}
                <div className="glass p-8 border-warning/10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-warning">
                        <AlertTriangle size={20} /> Areas for Growth
                    </h3>
                    <ul className="space-y-4">
                        {[
                            "Pace was slightly too fast during the self-introduction.",
                            "Confidence dipped during the 'closures' question.",
                            "Use fewer filler words like 'um' and 'basically'."
                        ].map((s, i) => (
                            <li key={i} className="flex gap-4 text-foreground/80 bg-warning/5 p-4 rounded-xl border border-warning/10">
                                <span className="text-warning font-bold">0{i + 1}</span>
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Personalized Tips */}
            <div className="glass p-8 border-primary/10 bg-primary/5">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                    <TrendingUp size={20} /> Personalized Tips
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-6">
                    Based on your performance, we recommend practicing your 'Elevator Pitch' more slowly.
                    Your technical knowledge is solid, but remember to breathe and pause between points to build more authority.
                </p>
                <div className="flex gap-4">
                    <Link href="/interview" className="flex-1">
                        <button className="w-full">Retake Interview</button>
                    </Link>
                    <Link href="/admin" className="flex-1">
                        <button className="w-full glass bg-transparent border-white/10 text-white">Go to Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
