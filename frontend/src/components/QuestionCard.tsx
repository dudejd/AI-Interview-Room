"use client"
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, HelpCircle } from 'lucide-react'

interface QuestionProps {
    question: string
    category: string
    onNext: () => void
}

export default function QuestionCard({ question, category, onNext }: QuestionProps) {
    return (
        <div className="glass-white p-8 border-white/5 relative bg-white/5 backdrop-blur-md rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <HelpCircle size={20} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">{category} Question</span>
            </div>

            <AnimatePresence mode="wait">
                <motion.h2
                    key={question}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-2xl md:text-3xl font-medium leading-tight mb-10 min-h-[100px]"
                >
                    &quot;{question}&quot;
                </motion.h2>
            </AnimatePresence>

            <div className="flex justify-between items-center">
                <div className="text-xs text-foreground/40 italic">
                    AI is listening for your response...
                </div>
                <button
                    onClick={onNext}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/5"
                >
                    Next Question
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Decorative pulse */}
            <div className="absolute -bottom-1 -left-1 -right-1 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
    )
}
