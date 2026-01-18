"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Shield, LayoutDashboard } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10"
            >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow">Interviews</span> <br />
                    with Real-Time AI
                </h1>
                <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 mx-auto">
                    AI Interview Room provides realistic simulations with computer vision and emotion AI to evaluate your verbal and non-verbal performance.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link href="/login">
                        <button className="flex items-center gap-2 text-lg px-8 py-4">
                            <Play fill="currentColor" size={20} />
                            Start Practice
                        </button>
                    </Link>

                    <Link href="/login">
                        <button className="glass flex items-center gap-2 text-lg px-8 py-4 bg-transparent border-primary/50 text-primary hover:bg-primary/10">
                            <Shield size={20} />
                            Login / Register
                        </button>
                    </Link>

                    <Link href="/admin">
                        <button className="glass flex items-center gap-2 text-lg px-8 py-4 bg-transparent border-secondary/50 text-secondary hover:bg-secondary/10">
                            <LayoutDashboard size={20} />
                            Admin Panel
                        </button>
                    </Link>
                </div>
            </motion.div>

            {/* Floating features */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl w-full"
            >
                {[
                    { title: "Emotion AI", desc: "Real-time facial expression and mood tracking" },
                    { title: "Eye Contact", desc: "Precision tracking of your gaze and engagement" },
                    { title: "Smarter Feedback", desc: "Comprehensive analysis by Google's Gemini AI" }
                ].map((feature, idx) => (
                    <div key={idx} className="glass p-6 text-left border-white/5 hover:border-primary/30 transition-colors group">
                        <h3 className="text-primary font-bold mb-2 group-hover:glow">{feature.title}</h3>
                        <p className="text-sm text-foreground/60">{feature.desc}</p>
                    </div>
                ))}
            </motion.div>
        </section>
    )
}
