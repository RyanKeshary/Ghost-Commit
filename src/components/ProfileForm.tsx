'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, User, BookOpen, GraduationCap, Briefcase, Hash } from 'lucide-react'

const DEPARTMENTS = ['Computer Science', 'Electronic Engineering', 'Information Technology', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Aerospace Engineering', 'Business', 'Design', 'Mathematics']

export default function ProfileForm() {
    const [formData, setFormData] = useState({
        name: '',
        semester: '1',
        department: DEPARTMENTS[0],
        skills: '',
        interests: '',
        lookingFor: 'Frontend Developer',
        bio: ''
    })

    const ROLES = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer', 'Data Scientist', 'Product Manager', 'Co-founder']

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate loading state briefly
        const btn = document.getElementById('launch-btn')
        if (btn) btn.innerHTML = 'Analyzing Profile...'

        setTimeout(() => {
            if (btn) btn.innerHTML = 'Launch Profile'
            document.getElementById('match')?.scrollIntoView({ behavior: 'smooth' })
        }, 1000)
    }

    return (
        <div className="glass p-8 md:p-12 rounded-[2rem] max-w-4xl mx-auto border-t-2 border-white/10">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-neon-purple flex items-center justify-center neon-glow-purple">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">Build Your Identity</h2>
                    <p className="text-white/40">Tell the campus who you are and what you build.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                            <User className="w-3 h-3" /> Full Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="John Doe"
                            className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-purple"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                                <GraduationCap className="w-3 h-3" /> Semester
                            </label>
                            <select
                                className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none"
                                value={formData.semester}
                                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s} className="bg-gray-900 text-white">Semester {s}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                                <BookOpen className="w-3 h-3" /> Department
                            </label>
                            <select
                                className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            >
                                {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-gray-900 text-white">{d}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                            <Hash className="w-3 h-3" /> Skills (Comma separated)
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="React, Python, Figma..."
                            className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                            <Briefcase className="w-3 h-3" /> Looking For
                        </label>
                        <select
                            required
                            className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-pink"
                            value={formData.lookingFor}
                            onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                        >
                            {ROLES.map(r => <option key={r} value={r} className="bg-gray-900 text-white">{r}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/50">Short Bio</label>
                        <textarea
                            rows={4}
                            placeholder="I love building AI tools and participating in hackathons..."
                            className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/20 resize-none"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    <button
                        id="launch-btn"
                        type="submit"
                        className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-neon-purple hover:text-white transition-all transform hover:scale-[1.02]"
                    >
                        Launch Profile
                    </button>
                </div>
            </form>
        </div>
    )
}
