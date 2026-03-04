'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Clock, Users, Tag, Trash2 } from 'lucide-react'

export default function ProjectBoard() {
    const [showPostForm, setShowPostForm] = useState(false)

    const [projects, setProjects] = useState([
        { id: '1', title: 'Campus Navigation App', desc: 'AR-based app to help freshmen find classrooms.', skills: ['Flutter', 'Unity', 'Firebase'], status: 'Open', owner: 'Ryan Gosling', time: '2h ago' },
        { id: '2', title: 'AI Resume Screener', desc: 'Tool for our college placement cell to rank resumes.', skills: ['Python', 'OpenAI', 'Next.js'], status: 'Open', owner: 'Emma Stone', time: '5h ago' },
        { id: '3', title: 'Smart Canteen System', desc: 'Eliminate queues with pre-order and digital payments.', skills: ['React', 'Node.js', 'Stripe'], status: 'Open', owner: 'Tom Holland', time: '1d ago' },
    ])
    const [appliedIds, setAppliedIds] = useState<string[]>([])
    const [newProjTitle, setNewProjTitle] = useState('')

    const handleApply = (id: string) => {
        setAppliedIds(prev => [...prev, id])
    }

    const handleDelete = (id: string) => {
        setProjects(prev => prev.filter(p => p.id !== id))
    }

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newProjTitle.trim()) return
        const newProj = {
            id: Date.now().toString(),
            title: newProjTitle,
            desc: 'A new brilliant idea looking for a team.',
            skills: ['React', 'Next.js'],
            status: 'Open',
            owner: 'You',
            time: 'Just now'
        }
        setProjects(prev => [newProj, ...prev])
        setNewProjTitle('')
        setShowPostForm(false)
    }

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-4xl font-bold mb-2 text-glow">Help Wanted</h2>
                    <p className="text-white/40">Find projects looking for your specific expertise.</p>
                </div>
                <button
                    onClick={() => setShowPostForm(!showPostForm)}
                    className="glass px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-neon-cyan hover:text-black transition-all"
                >
                    <Plus className={`w-5 h-5 transition-transform ${showPostForm ? 'rotate-45' : ''}`} />
                    {showPostForm ? 'Cancel' : 'Post Project'}
                </button>
            </div>

            <AnimatePresence>
                {showPostForm && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handlePost}
                        className="mb-12 glass p-6 rounded-2xl flex items-center gap-4"
                    >
                        <input
                            required
                            type="text"
                            placeholder="Project Title..."
                            value={newProjTitle}
                            onChange={(e) => setNewProjTitle(e.target.value)}
                            className="flex-1 glass bg-white/5 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                        />
                        <button type="submit" className="px-6 py-3 bg-neon-cyan text-black font-bold rounded-xl hover:scale-105 transition-transform">
                            Publish
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group glass p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:bg-white/5 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-4 flex items-center gap-2 z-10">
                            {project.owner === 'You' && (
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-1.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    title="Delete Project"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                            <span className="px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-[10px] font-bold uppercase tracking-widest border border-neon-cyan/30">
                                {project.status}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                            <p className="text-white/50 mb-6 leading-relaxed">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.skills.map(s => (
                                    <div key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold">
                                        <Tag className="w-3 h-3 text-white/40" />
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold uppercase">
                                    {project.owner[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{project.owner}</p>
                                    <p className="text-[10px] text-white/30 flex items-center gap-1">
                                        <Clock className="w-2.5 h-2.5" /> {project.time}
                                    </p>
                                </div>
                            </div>

                            {appliedIds.includes(project.id) ? (
                                <button disabled className="text-sm font-bold text-neon-cyan flex items-center gap-2 opacity-50 cursor-not-allowed">
                                    Applied ✓
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleApply(project.id)}
                                    className="text-sm font-bold text-white/60 hover:text-white flex items-center gap-2 group/apply"
                                >
                                    Apply to Join <Plus className="w-4 h-4 group-hover/apply:rotate-90 transition-transform" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
