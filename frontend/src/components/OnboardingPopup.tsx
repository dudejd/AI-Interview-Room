"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, CheckCircle, Video, Cpu, X } from 'lucide-react'

export default function OnboardingPopup() {
    const [isVisible, setIsVisible] = useState(false)
    const [step, setStep] = useState(1)

    useEffect(() => {
        const hasSeen = localStorage.getItem('onboarding_seen')
        if (!hasSeen) {
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const finish = () => {
        localStorage.setItem('onboarding_seen', 'true')
        setIsVisible(false)
    }

    const steps = [
        {
            title: "Welcome to AI Interview Room",
            content: "Experience the future of interview preparation. Our AI evaluates your body language, eye contact, and communication skills in real-time.",
            icon: <Info className="text-primary" size={32} />
        },
        {
            title: "Real-time Analysis",
            content: "During your interview, we track your facial expressions and eye contact using advanced computer vision models.",
            icon: <Video className="text-secondary" size={32} />
        },
        {
            title: "Gemini AI Feedback",
            content: "After each session, Google Gemini 1.5 Flash analyzes your responses to provide high-quality feedback and scores.",
            icon: <Cpu className="text-accent" size={32} />
        }
    ]

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="glass max-w-md w-full p-8 relative shadow-2xl border-primary/20"
                    >
                        <button
                            onClick={finish}
                            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 p-4 rounded-full bg-white/5 glow">
                                {steps[step - 1].icon}
                            </div>

                            <h2 className="text-2xl font-bold mb-4">{steps[step - 1].title}</h2>
                            <p className="text-foreground/70 mb-8 leading-relaxed">
                                {steps[step - 1].content}
                            </p>

                            <div className="flex items-center gap-2 mb-8">
                                {steps.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx + 1 === step ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => step < steps.length ? setStep(step + 1) : finish()}
                                className="w-full flex items-center justify-center gap-2"
                            >
                                {step === steps.length ? "Get Started" : "Next Step"}
                                {step === steps.length && <CheckCircle size={18} />}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
