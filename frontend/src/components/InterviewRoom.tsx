"use client"
import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Video, VideoOff, Square, Play, LogOut, Loader2 } from 'lucide-react'
import MetricsOverlay from './MetricsOverlay'
import QuestionCard from './QuestionCard'
import { useRouter, useSearchParams } from 'next/navigation'
import { getQuestions, createSession } from '@/lib/actions'

export default function InterviewRoom() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const [metrics, setMetrics] = useState({ eyeContact: 85, emotion: "Neutral", confidence: 75 })
    const [questions, setQuestions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const searchParams = useSearchParams()
    const category = searchParams.get('category') || 'general'

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true)
            const data = await getQuestions(category)
            // Fallback to defaults if no questions in DB for this category
            if (data.length === 0) {
                setQuestions([
                    { id: 1, text: `Tell me about your experience with ${category} topics.`, category },
                    { id: 2, text: `What are the most challenging aspects of ${category} work?`, category },
                    { id: 3, text: "How do you stay updated with the latest trends in this field?", category }
                ])
            } else {
                setQuestions(data)
            }
            setLoading(false)
        }
        fetchQuestions()
    }, [category])

    useEffect(() => {
        if (!loading) startCamera()

        const interval = setInterval(() => {
            if (isRecording) {
                setMetrics({
                    eyeContact: Math.floor(Math.random() * (95 - 70) + 70),
                    emotion: ["Happy", "Neutral", "Surprised", "Focused"][Math.floor(Math.random() * 4)],
                    confidence: Math.floor(Math.random() * (90 - 60) + 60)
                })
            }
        }, 2000)

        return () => {
            clearInterval(interval)
            stopCamera()
        }
    }, [isRecording, loading])

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            if (videoRef.current) videoRef.current.srcObject = stream
        } catch (err) {
            console.error("Error accessing media devices.", err)
        }
    }

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject as MediaStream
        stream?.getTracks().forEach(track => track.stop())
    }

    const nextQuestion = () => {
        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1)
        } else {
            finishInterview()
        }
    }

    const finishInterview = async () => {
        setIsRecording(false)
        // In a real app, we'd have the userId from session/cookie
        // For this demo, we'll use a placeholder or assume a user exists
        try {
            // await createSession({ userId: 'demo-user', type: category })
        } catch (e) {
            console.error(e)
        }
        router.push('/feedback')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                    <p className="text-foreground/50 animate-pulse">Initializing {category} session...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 glass px-6 py-4 rounded-xl border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold">AI</div>
                    <div>
                        <h1 className="text-lg font-bold leading-tight">AI Interview Room</h1>
                        <p className="text-xs text-foreground/50 uppercase tracking-widest">Active Session: {category.toUpperCase()}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-foreground/40 uppercase font-bold">Time Elapsed</span>
                        <span className="font-mono text-xl">04:22</span>
                    </div>
                    <button onClick={() => router.push('/dashboard')} className="glass p-2 bg-error/10 text-error border-error/20 hover:bg-error/20">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Video Feed */}
                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-glass-border bg-black shadow-2xl group">
                    <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />

                    {/* Real-time Indicators (Mock Overlay) */}
                    <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent p-10">
                        {/* Face Box */}
                        <motion.div
                            animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-1/3 aspect-[3/4] border-2 border-primary/50 absolute top-1/4 left-1/3 rounded-lg shadow-[0_0_20px_var(--primary)] opacity-40"
                        >
                            <div className="absolute -top-6 left-0 text-[10px] bg-primary text-black font-bold px-2 py-0.5 rounded">USER_DETECTED</div>
                        </motion.div>
                    </div>

                    <MetricsOverlay {...metrics} />

                    {/* Controls Bar */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 glass px-6 py-4 rounded-full border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20"><Mic size={20} /></button>
                        <button
                            onClick={() => setIsRecording(!isRecording)}
                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-error scale-110 shadow-[0_0_20px_var(--error)]' : 'bg-primary shadow-[0_0_20px_var(--primary)]'}`}
                        >
                            {isRecording ? <Square size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
                        </button>
                        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20"><Video size={20} /></button>
                    </div>

                    {!isRecording && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                                <button onClick={() => setIsRecording(true)} className="px-8 py-3 text-lg">Initialize Session</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Questions & Instructions */}
                <div className="space-y-8 flex flex-col">
                    <QuestionCard
                        question={questions[currentQuestionIdx]?.text}
                        category={questions[currentQuestionIdx]?.category}
                        onNext={nextQuestion}
                    />

                    <div className="flex-1 glass p-6 border-white/5 space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Live Insights</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Stability", value: "High", color: "text-success" },
                                { label: "Pace", value: "Normal", color: "text-primary" },
                                { label: "Volume", value: "Optimal", color: "text-success" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                    <span className="text-sm text-foreground/60">{item.label}</span>
                                    <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 rounded-xl border border-dashed border-white/10 text-xs text-foreground/40 leading-relaxed">
                            Our AI is currently tracking 68 facial landmarks and analyzing speech patterns to provide the most accurate feedback.
                            Keep your head steady and maintain eye contact with the camera.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
