'use client'

import React, { useState } from 'react'
import { useDevelopers, Developer } from '@/lib/DevelopersContext'
import { Plus, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function TeammatesManagement() {
    const { developers, addDeveloper, removeDeveloper } = useDevelopers()
    const [showForm, setShowForm] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        semester: '1',
        department: 'Computer Science',
        role: 'Full Stack',
        skills: '',
        bio: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newDev: Developer = {
            id: Date.now().toString(),
            name: formData.name,
            semester: parseInt(formData.semester),
            department: formData.department,
            role: formData.role,
            skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
            bio: formData.bio
        }

        addDeveloper(newDev)
        setShowForm(false)
        setFormData({ name: '', semester: '1', department: 'Computer Science', role: 'Full Stack', skills: '', bio: '' })
    }

    return (
        <main className="min-h-screen relative px-6 py-24 max-w-5xl mx-auto">

            <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white font-bold flex items-center gap-2 group z-50">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Hub
            </Link>

            <div className="flex items-center justify-between mb-16 mt-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-4 uppercase italic">
                        <Users className="w-10 h-10 text-neon-cyan" /> Configure Teammates
                    </h1>
                    <p className="text-white/40 max-w-xl">
                        Add or remove available teammates here. Since this uses a global Context, any changes made here will instantly reflect on the main discovery Feed and the Swipe page.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="glass px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-white hover:text-black transition-all hover:scale-105"
                >
                    <Plus className={`w-5 h-5 transition-transform ${showForm ? 'rotate-45' : ''}`} />
                    {showForm ? 'Cancel' : 'Add Teammate'}
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.form
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginBottom: 48 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        onSubmit={handleSubmit}
                        className="glass p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <h2 className="md:col-span-2 text-2xl font-bold mb-4">New Teammate Profile</h2>

                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Name</label>
                            <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full glass bg-white/5 py-3 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-cyan" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Semester</label>
                                <select value={formData.semester} onChange={e => setFormData({ ...formData, semester: e.target.value })} className="w-full glass bg-[#0a0a0a] text-white py-3 px-4 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 appearance-none">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s} className="bg-gray-900 text-white">{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Department</label>
                                <select value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full glass bg-[#0a0a0a] text-white py-3 px-4 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-neon-cyan/50 appearance-none">
                                    {['Computer Science', 'Electronic Engineering', 'Information Technology', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Aerospace Engineering', 'Business', 'Design', 'Mathematics'].map(d => <option key={d} value={d} className="bg-gray-900 text-white">{d}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Primary Role</label>
                            <input required type="text" placeholder="e.g. Frontend Developer" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full glass bg-white/5 py-3 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-cyan" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Skills (Comma separated)</label>
                            <input required type="text" placeholder="React, Node.js, Python" value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} className="w-full glass bg-white/5 py-3 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-cyan" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Short Bio</label>
                            <textarea required rows={3} value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full glass bg-white/5 py-3 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-cyan" />
                        </div>

                        <div className="md:col-span-2 flex justify-end pt-4 border-t border-white/5">
                            <button type="submit" className="px-8 py-4 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                                Create Profile
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {developers.map(dev => (
                        <motion.div
                            key={dev.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className="glass p-6 rounded-2xl relative group hover:bg-white/5 transition-colors border border-white/10"
                        >
                            <button
                                onClick={() => removeDeveloper(dev.id)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all scale-90 hover:scale-110"
                                title="Remove Teammate"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="flex items-start gap-4 mb-4 pr-12">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center font-black text-xl flex-shrink-0">
                                    {dev.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold leading-tight">{dev.name}</h3>
                                    <p className="text-neon-cyan text-xs font-bold uppercase tracking-widest mt-1">{dev.role}</p>
                                </div>
                            </div>
                            <p className="text-white/40 text-sm mb-4 line-clamp-2">"{dev.bio}"</p>
                            <div className="flex flex-wrap gap-1">
                                {dev.skills.slice(0, 4).map(s => (
                                    <span key={s} className="px-2 py-1 bg-black/50 text-[10px] uppercase font-bold text-white/60 rounded">
                                        {s}
                                    </span>
                                ))}
                                {dev.skills.length > 4 && <span className="px-2 py-1 bg-black/50 text-[10px] uppercase font-bold text-white/40 rounded">+{dev.skills.length - 4}</span>}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {developers.length === 0 && (
                    <div className="col-span-full py-12 text-center text-white/40 border border-dashed border-white/10 rounded-3xl">
                        No teammates found. Add some above!
                    </div>
                )}
            </div>

        </main>
    )
}
