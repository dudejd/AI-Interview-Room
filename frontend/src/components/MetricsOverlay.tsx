"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Smile, Zap, Activity } from 'lucide-react'

interface MetricsProps {
    eyeContact: number
    emotion: string
    confidence: number
}

export default function MetricsOverlay({ eyeContact, emotion, confidence }: MetricsProps) {
    return (
        <div className="absolute top-6 right-6 w-64 space-y-4 z-40 pointer-events-none">
            {/* Eye Contact Meter */}
            <div className="glass p-4 border-primary/20">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-tighter">
                        <Eye size={14} /> Eye Contact
                    </span>
                    <span className="text-sm font-mono">{eyeContact}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${eyeContact}%` }}
                        className="h-full bg-primary glow"
                    />
                </div>
            </div>

            {/* Emotion Indicator */}
            <div className="glass p-4 border-secondary/20">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-secondary flex items-center gap-2 uppercase tracking-tighter">
                        <Smile size={14} /> Current Mood
                    </span>
                </div>
                <div className="text-xl font-bold text-white capitalize flex items-center gap-2">
                    <Activity size={18} className="text-secondary animate-pulse" />
                    {emotion}
                </div>
            </div>

            {/* Confidence Meter */}
            <div className="glass p-4 border-accent/20">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-accent flex items-center gap-2 uppercase tracking-tighter">
                        <Zap size={14} /> Confidence
                    </span>
                    <span className="text-sm font-mono">{confidence}%</span>
                </div>
                <div className="h-6 bg-white/10 rounded overflow-hidden relative">
                    <motion.div
                        animate={{ width: `${confidence}%` }}
                        className="h-full bg-accent/40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                        {confidence > 70 ? "OPTIMAL" : confidence > 40 ? "STABLE" : "IMPROVE"}
                    </div>
                </div>
            </div>

            {/* Live AI Status */}
            <div className="mt-4 flex items-center gap-2 text-[10px] text-foreground/40 font-mono uppercase bg-black/40 px-3 py-1 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                AI Engine: Core-V1.2 Active
            </div>
        </div>
    )
}
