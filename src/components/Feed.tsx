'use client'

import React, { useState } from 'react'
import { Search, Filter, MessageSquare, User, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDevelopers } from '@/lib/DevelopersContext'

const DEPARTMENTS = ['Computer Science', 'Electronic Engineering', 'Information Technology', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Aerospace Engineering', 'Business', 'Design', 'Mathematics']
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]
const ROLES = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UI/UX Designer', 'Data Scientist', 'Product Manager', 'Co-founder']

export default function Feed() {
    const [filterDept, setFilterDept] = useState('')
    const [filterSem, setFilterSem] = useState('')
    const [filterRole, setFilterRole] = useState('')
    const [searchSkill, setSearchSkill] = useState('')
    const [requestedMatches, setRequestedMatches] = useState<string[]>([])

    // Consume global state instead of static placeholder
    const { developers } = useDevelopers()

    const handleConnect = (id: string, name: string) => {
        setRequestedMatches(prev => [...prev, id])
        // Simulate adding to inbox or toast
    }

    const filteredDevs = developers.filter(dev => {
        return (filterDept === '' || dev.department === filterDept) &&
            (filterSem === '' || dev.semester.toString() === filterSem) &&
            (filterRole === '' || dev.role === filterRole) &&
            (searchSkill === '' || dev.skills.some(s => s.toLowerCase().includes(searchSkill.toLowerCase())))
    })

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-4xl font-bold mb-2">Discover Teammates</h2>
                    <p className="text-white/50 text-lg">Filter through the brightest minds in campus.</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search skills..."
                            className="glass pl-10 pr-4 py-2 rounded-lg bg-white/5 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 w-full"
                            value={searchSkill}
                            onChange={(e) => setSearchSkill(e.target.value)}
                        />
                    </div>
                    <select
                        className="glass px-4 py-2 rounded-lg bg-white/5 focus:outline-none"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    >
                        <option value="" className="bg-gray-900 text-white">All Roles</option>
                        {ROLES.map(r => <option key={r} value={r} className="bg-gray-900 text-white">{r}</option>)}
                    </select>
                    <select
                        className="glass px-4 py-2 rounded-lg bg-white/5 focus:outline-none"
                        value={filterDept}
                        onChange={(e) => setFilterDept(e.target.value)}
                    >
                        <option value="" className="bg-gray-900 text-white">All Departments</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-gray-900 text-white">{d}</option>)}
                    </select>
                    <select
                        className="glass px-4 py-2 rounded-lg bg-white/5 focus:outline-none"
                        value={filterSem}
                        onChange={(e) => setFilterSem(e.target.value)}
                    >
                        <option value="" className="bg-gray-900 text-white">All Semesters</option>
                        {SEMESTERS.map(s => <option key={s} value={s} className="bg-gray-900 text-white">Semester {s}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredDevs.map((dev, index) => (
                        <motion.div
                            key={dev.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-6 rounded-2xl group relative overflow-hidden flex flex-col h-full"
                        >
                            {/* Background Glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-purple/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center font-bold text-xl">
                                        {dev.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl">{dev.name}</h3>
                                        <p className="text-white/40 text-sm">Sem {dev.semester} • {dev.department}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-white/70 line-clamp-2 text-sm italic">"{dev.bio}"</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6 h-fit">
                                {dev.skills.map(skill => (
                                    <span key={skill} className="px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold bg-white/10 text-white/80 border border-white/5 group-hover:border-neon-purple/50 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
                                    <Briefcase className="w-3 h-3" />
                                    <span>Role: <span className="text-neon-cyan font-bold">{dev.role}</span></span>
                                </div>

                                <button
                                    onClick={() => alert(`Connection request sent to ${dev.name}!`)}
                                    className="w-full glass py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neon-purple group/btn transition-colors overflow-hidden relative"
                                >
                                    <span className="relative z-10">Match & Connect</span>
                                    <motion.div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredDevs.length === 0 && (
                <div className="text-center py-24 glass rounded-3xl">
                    <p className="text-white/40 text-xl italic text-glow">No teammates found matching these criteria.</p>
                </div>
            )}
        </section>
    )
}
