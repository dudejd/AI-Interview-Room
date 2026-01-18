"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/actions'
import { User, Mail, Briefcase, Clock, ArrowRight, Loader2, Sparkles, Camera, CheckCircle, RefreshCcw } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [faceCaptured, setFaceCaptured] = useState(false)
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        experience: '',
        faceImage: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            setVideoStream(stream)
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (err) {
            setError("Could not access camera. Please allow permissions.")
        }
    }

    const captureFace = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas")
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0)
            const imageSrc = canvas.toDataURL("image/jpeg")
            setFormData(prev => ({ ...prev, faceImage: imageSrc }))
            setFaceCaptured(true)
            stopCamera()
        }
    }

    const stopCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop())
            setVideoStream(null)
        }
    }

    const retakePhoto = () => {
        setFaceCaptured(false)
        setFormData(prev => ({ ...prev, faceImage: '' }))
        startCamera()
    }

    useEffect(() => {
        if (step === 2) {
            startCamera()
        }
        return () => stopCamera()
    }, [step])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (step === 1) {
            setStep(2)
            return
        }

        if (!faceCaptured) return

        setLoading(true)
        setError('')

        try {
            const result = await registerUser(formData)
            if (result.success) {
                router.push('/dashboard')
            } else {
                setError(result.error || 'Registration failed')
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass p-8 rounded-2xl border-white/10 shadow-2xl relative">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-4 glass rounded-full border border-white/10 shadow-xl">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>

                    <div className="text-center mb-8 mt-6">
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-foreground/60 text-sm">Join the future of interview preparation</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center gap-2 mb-6">
                        <div className={`h-1.5 w-12 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-primary/20'}`} />
                        <div className={`h-1.5 w-12 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-primary/20'}`} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-foreground/50 ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                            <input
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="Ishan Jadhav"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-foreground/50 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                            <input
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="ishan@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase text-foreground/50 ml-1">Target Role</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                                <input
                                                    name="role"
                                                    type="text"
                                                    required
                                                    placeholder="Software Eng."
                                                    value={formData.role}
                                                    onChange={handleChange}
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase text-foreground/50 ml-1">Experience</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                                                <select
                                                    name="experience"
                                                    required
                                                    value={formData.experience}
                                                    onChange={handleChange}
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                                                >
                                                    <option value="" disabled>Select</option>
                                                    <option value="Student">Student</option>
                                                    <option value="0-2 Years">0-2 Years</option>
                                                    <option value="3-5 Years">3-5 Years</option>
                                                    <option value="5+ Years">5+ Years</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4 text-center"
                                >
                                    <div className="text-lg font-semibold mb-2 text-primary">Biometric Setup</div>
                                    <p className="text-xs text-foreground/60 mb-4">Capture your face for secure AI-powered login.</p>

                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 border-2 border-primary/30 mx-auto shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                                        {!faceCaptured ? (
                                            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={formData.faceImage} alt="Captured Face" className="w-full h-full object-cover" />
                                        )}

                                        {!faceCaptured && (
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-32 h-40 border-2 border-primary/50 rounded-full dashed opacity-50"></div>
                                            </div>
                                        )}
                                    </div>

                                    {!faceCaptured ? (
                                        <button
                                            type="button"
                                            onClick={captureFace}
                                            className="px-6 py-2 rounded-full bg-white text-black font-bold flex items-center gap-2 mx-auto hover:bg-gray-200 transition-colors"
                                        >
                                            <Camera size={18} /> Capture
                                        </button>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="text-success flex items-center gap-2 text-sm font-bold bg-success/10 px-4 py-2 rounded-full border border-success/20">
                                                <CheckCircle size={16} /> Face Captured
                                            </div>
                                            <button
                                                type="button"
                                                onClick={retakePhoto}
                                                className="text-xs text-foreground/50 hover:text-white flex items-center gap-1"
                                            >
                                                <RefreshCcw size={12} /> Retake Photo
                                            </button>
                                        </div>
                                    )}

                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center mt-4">
                                {error}
                            </div>
                        )}

                        <div className="pt-4">
                            {step === 1 ? (
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-primary/20 border border-primary/50 rounded-lg font-bold text-primary hover:bg-primary/30 transition-all flex items-center justify-center gap-2"
                                >
                                    Next Step <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading || !faceCaptured}
                                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Complete Registration'}
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm text-foreground/40">
                        Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
