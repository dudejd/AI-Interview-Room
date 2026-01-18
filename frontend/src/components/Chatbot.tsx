"use client"
import React, { useState } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
        { role: 'model', text: "Hello! I'm your AI assistant. How can I help you today?" }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isOpen])

    const handleSend = async () => {
        if (!input.trim() || loading) return

        const userMessage = input.trim()
        setMessages(prev => [...prev, { role: 'user', text: userMessage }])
        setInput('')
        setLoading(true)

        try {
            // Import dynamically or use server action pattern if converting component to use server actions directly isn't possible here without substantial refactor. 
            // Since this is a client component, we should import the server action.
            // Assuming chatWithAI is a server action from 'lib/gemini'
            const { chatWithAI } = await import('@/lib/gemini')

            // Format history for the API
            const history = messages.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [m.text]
            }))

            const response = await chatWithAI(userMessage, history)
            setMessages(prev => [...prev, { role: 'model', text: response }])
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error." }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="glass mb-4 w-80 h-96 flex flex-col shadow-2xl overflow-hidden rounded-xl border border-white/20"
                    >
                        <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex justify-between items-center">
                            <span className="font-bold flex items-center gap-2"><MessageSquare size={16} /> AI Assistant</span>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/40" ref={scrollRef}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-br-none'
                                            : 'bg-white/10 text-foreground rounded-bl-none border border-white/5'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-xl rounded-bl-none flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-3 border-t border-white/10 bg-black/20 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 bg-white/5 p-2 rounded-lg text-sm outline-none border border-white/10 focus:border-primary/50 text-foreground placeholder:text-foreground/30 transition-colors"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="p-2 aspect-square flex items-center justify-center bg-primary rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg relative glow z-50"
            >
                {isOpen ? <X color="white" /> : <MessageSquare color="white" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-background" />
                )}
            </motion.button>
        </div>
    )
}
