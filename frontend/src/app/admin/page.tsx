"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BarChart3, Database, Settings, Search, MoreVertical, Plus, Trash2, Edit2, Loader2, X } from 'lucide-react'
import { getUsers, getQuestions, getStats, deleteUser, deleteQuestion, upsertQuestion } from '@/lib/actions'

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview')
    const [stats, setStats] = useState({ totalStudents: 0, totalSessions: 0, avgScore: 0, completionRate: 92 })
    const [students, setStudents] = useState<any[]>([])
    const [questions, setQuestions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState<string | null>(null) // 'question' | null
    const [currentQuestion, setCurrentQuestion] = useState<any>(null)

    useEffect(() => {
        fetchData()
    }, [activeTab])

    const fetchData = async () => {
        setLoading(true)
        const [s, u, q] = await Promise.all([getStats(), getUsers(), getQuestions()])
        setStats(s)
        setStudents(u)
        setQuestions(q)
        setLoading(false)
    }

    const handleDeleteUser = async (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id)
            fetchData()
        }
    }

    const handleDeleteQuestion = async (id: string) => {
        if (confirm("Are you sure you want to delete this question?")) {
            await deleteQuestion(id)
            fetchData()
        }
    }

    const handleSaveQuestion = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const qData = {
            text: formData.get('text') as string,
            category: formData.get('category') as string,
            difficulty: formData.get('difficulty') as string
        }
        await upsertQuestion(currentQuestion?.id || null, qData)
        setShowModal(null)
        setCurrentQuestion(null)
        fetchData()
    }

    if (loading && activeTab === 'overview') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-glass-border glass p-6 flex flex-col gap-8 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold text-black">A</div>
                    <span className="font-bold tracking-tighter text-xl">ADMIN PANEL</span>
                </div>

                <nav className="space-y-2">
                    {[
                        { id: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
                        { id: 'students', label: 'Students', icon: <Users size={18} /> },
                        { id: 'questions', label: 'Questions', icon: <Database size={18} /> },
                        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground/60 hover:bg-white/5'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto glass p-4 rounded-xl border-white/5 bg-primary/5">
                    <p className="text-[10px] text-primary font-bold uppercase mb-1">System Health</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-xs">AI Server Online</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold capitalize">{activeTab} Dashboard</h1>
                        <p className="text-foreground/50">Manage your system and monitor student progress.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 glass bg-white/5 border-white/10 rounded-lg outline-none focus:border-primary w-64" />
                        </div>
                        {activeTab === 'questions' && (
                            <button onClick={() => { setCurrentQuestion(null); setShowModal('question') }} className="flex items-center gap-2 px-6">
                                <Plus size={18} />
                                Add Question
                            </button>
                        )}
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: "Total Students", value: stats.totalStudents, change: "+12%" },
                                { label: "Sessions", value: stats.totalSessions, change: "+8%" },
                                { label: "Avg. Score", value: `${stats.avgScore}%`, change: "+3%" },
                                { label: "Completion Rate", value: `${stats.completionRate}%`, change: "+5%" }
                            ].map((stat, idx) => (
                                <div key={idx} className="glass p-6 border-white/5">
                                    <p className="text-xs text-foreground/50 uppercase font-bold mb-2">{stat.label}</p>
                                    <div className="flex items-end gap-3">
                                        <span className="text-3xl font-bold">{stat.value}</span>
                                        <span className="text-success text-xs mb-1 font-bold">{stat.change}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="glass border-white/5 overflow-hidden">
                            <div className="p-6 border-b border-glass-border flex justify-between items-center">
                                <h3 className="font-bold">Recent Student Activity</h3>
                                <button onClick={() => setActiveTab('students')} className="text-xs text-primary font-bold uppercase">View All</button>
                            </div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 text-[10px] text-foreground/40 font-bold uppercase tracking-widest">
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Interviews</th>
                                        <th className="px-6 py-4">Avg. Score</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {students.slice(0, 5).map((student) => (
                                        <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">{student.name}</span>
                                                    <span className="text-xs text-foreground/40">{student.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono">{student.interviews.length}</td>
                                            <td className="px-6 py-4 text-sm font-mono font-bold">85%</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleDeleteUser(student.id)} className="p-1 hover:bg-error/20 rounded transition-colors text-foreground/40 hover:text-error">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'students' && (
                    <div className="glass border-white/5 overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 text-[10px] text-foreground/40 font-bold uppercase tracking-widest">
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Joined At</th>
                                    <th className="px-6 py-4">Sessions</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm">{student.name}</span>
                                                <span className="text-xs text-foreground/40">{student.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground/50">{new Date(student.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-sm font-mono">{student.interviews.length}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDeleteUser(student.id)} className="p-2 hover:bg-error/20 text-foreground/40 hover:text-error rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'questions' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {questions.map((q) => (
                                <div key={q.id} className="glass p-6 border-white/5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${q.category === 'technical' ? 'bg-purple-500/20 text-purple-400' :
                                                    q.category === 'hr' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                                                }`}>
                                                {q.category}
                                            </span>
                                            <div className="flex gap-2">
                                                <button onClick={() => { setCurrentQuestion(q); setShowModal('question') }} className="p-1 hover:bg-white/10 text-foreground/40 hover:text-primary rounded transition-colors">
                                                    <Edit2 size={14} />
                                                </button>
                                                <button onClick={() => handleDeleteQuestion(q.id)} className="p-1 hover:bg-error/10 text-foreground/40 hover:text-error rounded transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold leading-relaxed">{q.text}</p>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center">
                                        <span className="text-[10px] text-foreground/40 uppercase font-bold">Difficulty: {q.difficulty}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-2xl space-y-8">
                        <div className="glass p-8 border-white/5 space-y-6">
                            <h3 className="text-xl font-bold">Platform Settings</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold">Maintenance Mode</div>
                                        <div className="text-xs text-foreground/40">Disable student access for maintenance.</div>
                                    </div>
                                    <div className="w-12 h-6 bg-white/5 rounded-full relative cursor-pointer border border-white/10">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-foreground/40 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold">AI Feedback Verbosity</div>
                                        <div className="text-xs text-foreground/40">Control the level of detail in AI evaluation.</div>
                                    </div>
                                    <select className="glass bg-white/5 text-xs font-bold p-2 outline-none border-white/10 rounded-lg">
                                        <option>Detailed</option>
                                        <option>Concise</option>
                                        <option>Raw Stats Only</option>
                                    </select>
                                </div>
                            </div>
                            <button className="w-full py-3 mt-4">Save Configuration</button>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal */}
            <AnimatePresence>
                {showModal === 'question' && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass max-w-lg w-full p-8 border-white/10 relative z-10"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold">{currentQuestion ? 'Edit' : 'Add'} Question</h3>
                                <button onClick={() => setShowModal(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSaveQuestion} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-foreground/40">Question Text</label>
                                    <textarea
                                        name="text"
                                        defaultValue={currentQuestion?.text}
                                        required
                                        className="w-full h-32 glass bg-white/5 border-white/10 rounded-xl p-4 outline-none focus:border-primary transition-all text-sm leading-relaxed"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-foreground/40">Category</label>
                                        <select name="category" defaultValue={currentQuestion?.category || 'general'} className="w-full glass bg-white/5 border-white/10 rounded-xl p-3 outline-none focus:border-primary text-sm font-bold">
                                            <option value="general">General</option>
                                            <option value="technical">Technical</option>
                                            <option value="behavioral">Behavioral</option>
                                            <option value="hr">HR</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-foreground/40">Difficulty</label>
                                        <select name="difficulty" defaultValue={currentQuestion?.difficulty || 'Medium'} className="w-full glass bg-white/5 border-white/10 rounded-xl p-3 outline-none focus:border-primary text-sm font-bold">
                                            <option>Easy</option>
                                            <option>Medium</option>
                                            <option>Hard</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 mt-4 font-bold tracking-widest">
                                    SAVE QUESTION
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
