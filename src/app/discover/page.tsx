
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
    Search, SlidersHorizontal, Users, 
    X, Sparkles, Github,
    Ghost, Star,
    CheckCircle2, ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'

/* ── Types ─────────────────────────────────────────────────── */
interface Skill {
    name: string
    level: number
}

interface UserProfile {
    id: string
    name: string
    image: string | null
    headline: string | null
    bio: string | null
    semester: number | null
    department: string | null
    roles: string[]
    availability: number
    lookingFor: string | null
    interests: string[]
    skills: Skill[]
    socialLinks: Record<string, string>
    linkVisibility: Record<string, boolean>
    isFounding: boolean
    githubData?: string
    updatedAt: string
    matchScore?: number
}

import { LucideIcon } from 'lucide-react'

const VerificationBadge = ({ children, icon: Icon, color }: { children: React.ReactNode, icon: LucideIcon, color: string }) => (
    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[8px] font-bold tracking-tight uppercase border border-${color}/20 bg-${color}/10 text-${color} backdrop-blur-md`}>
        <Icon className="w-2.5 h-2.5" />
        {children}
    </div>
)

const DEPARTMENTS = [
    'Computer Science', 'Electronic Engineering', 'Information Technology', 
    'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 
    'Aerospace Engineering', 'Business', 'Design', 'Mathematics'
]

const ROLES = ['Frontend', 'Backend', 'Full-stack', 'UI/UX', 'Mobile', 'ML', 'DevOps', 'PM']

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]

export default function DiscoverPage() {
    const [users, setUsers] = useState<UserProfile[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    
    // Filters State
    const [filters, setFilters] = useState({
        semester: '',
        department: '',
        role: '',
        availability: '0',
        sort: 'best'
    })
    
    const [showFilters, setShowFilters] = useState(false)

    const fetchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (filters.semester) params.append('semester', filters.semester)
            if (filters.department) params.append('department', filters.department)
            if (filters.role) params.append('role', filters.role)
            if (filters.availability !== '0') params.append('availability', filters.availability)
            params.append('sort', filters.sort)
            
            const res = await fetch(`/api/discovery?${params.toString()}`)
            if (res.ok) {
                const data = await res.json()
                setUsers(data)
            }
        } catch (error) {
            console.error('Discovery error:', error)
        } finally {
            setLoading(false)
        }
    }, [filters])

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers()
        }, 300)
        return () => clearTimeout(timer)
    }, [fetchUsers])

    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
        return matchesSearch
    })

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* ─── Header ─── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/3 border border-white/8 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4"
                    >
                        <Sparkles className="w-3 h-3 text-tinder-coral" />
                        Explore Developers
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black tracking-tight"
                    >
                        Find your next <span className="gradient-text">Teammate</span>
                    </motion.h1>
                </div>

                {/* Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full md:w-96 group"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-tinder-coral transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by name, role, or skill..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/3 border border-white/8 hover:border-white/15 focus:border-tinder-coral/40 px-11 py-3.5 rounded-2xl focus:outline-none text-sm transition-all focus:ring-4 focus:ring-tinder-coral/5"
                    />
                </motion.div>
            </div>

            {/* ─── Filter Bar ─── */}
            <section className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            showFilters 
                            ? 'bg-tinder-coral/10 border-tinder-coral/30 text-tinder-coral' 
                            : 'bg-white/3 border-white/8 text-white/40 hover:bg-white/5'
                        }`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {Object.values(filters).filter(v => v !== '' && v !== '0' && v !== 'recent').length > 0 && (
                            <span className="w-5 h-5 rounded-full bg-tinder-coral text-white flex items-center justify-center text-[10px]">
                                {Object.values(filters).filter(v => v !== '' && v !== '0' && v !== 'recent').length}
                            </span>
                        )}
                    </button>

                    <div className="h-4 w-px bg-white/5 mx-2 hidden md:block" />

                    {/* Quick Sort */}
                    <div className="flex flex-wrap items-center gap-2">
                        <select 
                            value={filters.sort}
                            onChange={(e) => setFilters(f => ({ ...f, sort: e.target.value }))}
                            className="bg-transparent border-none text-xs font-bold text-white/40 focus:ring-0 cursor-pointer hover:text-white transition-colors outline-none"
                        >
                            <option value="best" className="bg-[#121212]">Sort: Best Match</option>
                            <option value="recent" className="bg-[#121212]">Sort: Recently Active</option>
                            <option value="availability" className="bg-[#121212]">Sort: High Availability</option>
                            <option value="name" className="bg-[#121212]">Sort: Name A-Z</option>
                        </select>
                    </div>

                    {/* Active Chips */}
                    <AnimatePresence>
                        {filters.department && (
                            <motion.button 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={() => setFilters(f => ({ ...f, department: '' }))}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tinder-coral/10 border border-tinder-coral/20 text-[10px] font-bold text-tinder-coral"
                            >
                                {filters.department} <X className="w-3 h-3" />
                            </motion.button>
                        )}
                        {filters.role && (
                            <motion.button 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={() => setFilters(f => ({ ...f, role: '' }))}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tinder-orange/10 border border-tinder-orange/20 text-[10px] font-bold text-tinder-orange"
                            >
                                {filters.role} <X className="w-3 h-3" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Expanded Filters Pane */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-10"
                        >
                            <div className="glass-strong rounded-3xl p-8 border border-white/8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {/* Semester */}
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Semester</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {SEMESTERS.map(s => (
                                                <button 
                                                    key={s}
                                                    onClick={() => setFilters(f => ({ ...f, semester: f.semester === s.toString() ? '' : s.toString() }))}
                                                    className={`w-9 h-9 rounded-xl border text-xs font-bold transition-all ${
                                                        filters.semester === s.toString() 
                                                        ? 'bg-tinder-coral border-tinder-coral text-white' 
                                                        : 'bg-white/3 border-white/8 text-white/40 hover:bg-white/6'
                                                    }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Department */}
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Department</h4>
                                        <select 
                                            value={filters.department}
                                            onChange={(e) => setFilters(f => ({ ...f, department: e.target.value }))}
                                            className="w-full bg-white/3 border border-white/8 px-4 py-2.5 rounded-xl text-xs text-white/60 focus:outline-none focus:border-tinder-coral/40 transition-all"
                                        >
                                            <option value="" className="bg-[#121212]">All Departments</option>
                                            {DEPARTMENTS.map(d => (
                                                <option key={d} value={d} className="bg-[#121212]">{d}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Role */}
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Primary Role</h4>
                                        <select 
                                            value={filters.role}
                                            onChange={(e) => setFilters(f => ({ ...f, role: e.target.value }))}
                                            className="w-full bg-white/3 border border-white/8 px-4 py-2.5 rounded-xl text-xs text-white/60 focus:outline-none focus:border-tinder-coral/40 transition-all"
                                        >
                                            <option value="" className="bg-[#121212]">All Roles</option>
                                            {ROLES.map(r => (
                                                <option key={r} value={r} className="bg-[#121212]">{r}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Availability */}
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4 flex justify-between items-center">
                                            Min Availability 
                                            <span className="text-tinder-coral">{filters.availability}+ hrs/week</span>
                                        </h4>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="40" 
                                            step="5"
                                            value={filters.availability}
                                            onChange={(e) => setFilters(f => ({ ...f, availability: e.target.value }))}
                                            className="w-full accent-tinder-coral opacity-70 hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                                    <button 
                                        onClick={() => setFilters({ semester: '', department: '', role: '', availability: '0', sort: 'recent' })}
                                        className="text-[10px] font-bold uppercase tracking-wider text-white/20 hover:text-white/40 transition-colors"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* ─── Grid ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={`skeleton-${i}`} className="glass rounded-3xl h-80 animate-pulse border border-white/5" />
                        ))
                    ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user, i) => (
                            <motion.div 
                                key={user.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative"
                            >
                                <Link href={`/u/${user.id}`} className="block h-full">
                                    <div className="glass-strong rounded-4xl p-6 h-full border border-white/8 hover:border-tinder-coral/30 hover:shadow-2xl hover:shadow-tinder-coral/5 transition-all duration-300 relative overflow-hidden flex flex-col">
                                        
                                        {/* Row 1: Avatar & Status */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group-hover:scale-105 transition-transform">
                                                    {user.image ? (
                                                        <Image src={user.image} alt={user.name} width={64} height={64} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Ghost className="w-6 h-6 text-white/20" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-background z-10 ${
                                                    new Date().getTime() - new Date(user.updatedAt).getTime() < 1000 * 60 * 60 * 24 
                                                    ? 'bg-green-500' 
                                                    : 'bg-white/10'
                                                }`} />
                                            </div>
                                            
                                            <div className="flex flex-col items-end gap-1.5">
                                                {filters.sort === 'best' && typeof user.matchScore === 'number' && (
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-tinder-coral/20 border border-tinder-coral/30 text-tinder-coral text-[9px] font-black tracking-widest uppercase mb-1">
                                                        <Sparkles className="w-2.5 h-2.5" />
                                                        {user.matchScore}% Match
                                                    </div>
                                                )}
                                                <div className="flex flex-col items-end gap-1.5 px-3 py-1 bg-white/5 rounded-xl">
                                                    {user.isFounding && (
                                                        <VerificationBadge icon={Star} color="tinder-orange">Founding</VerificationBadge>
                                                    )}
                                                    {(() => {
                                                        const isComplete = user.bio && user.skills.length > 0 && user.department && user.semester && user.roles.length > 0
                                                        return isComplete && (
                                                            <VerificationBadge icon={CheckCircle2} color="tinder-coral">Complete</VerificationBadge>
                                                        )
                                                    })()}
                                                    {user.githubData && (() => {
                                                        try {
                                                            const github = JSON.parse(user.githubData)
                                                            return (
                                                                <VerificationBadge icon={Github} color="white/30">{github.repos_count} Repos</VerificationBadge>
                                                            )
                                                        } catch { return null }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 2: Basic Info */}
                                        <div className="mb-4">
                                            <h3 className="text-lg font-bold truncate group-hover:text-tinder-coral transition-colors">{user.name}</h3>
                                            <p className="text-white/40 text-xs font-medium truncate mt-0.5">{user.headline || 'Developer'}</p>
                                        </div>

                                        {/* Row 3: Meta Badges */}
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {user.roles.slice(0, 2).map(role => (
                                                <span key={role} className="px-2 py-0.5 rounded-md bg-tinder-coral/10 border border-tinder-coral/15 text-[9px] font-bold text-tinder-coral tracking-tight">
                                                    {role}
                                                </span>
                                            ))}
                                            {user.semester && (
                                                <span className="px-2 py-0.5 rounded-md bg-white/4 border border-white/6 text-[9px] font-bold text-white/40">
                                                    S{user.semester}
                                                </span>
                                            )}
                                        </div>

                                        {/* Row 4: Top Skills */}
                                        <div className="flex-1">
                                            <div className="flex flex-wrap gap-1.5">
                                                {user.skills.sort((a,b) => b.level - a.level).slice(0, 3).map(skill => (
                                                    <span key={skill.name} className="px-2 py-1 rounded-lg bg-white/3 border border-white/5 text-[10px] text-white/30 font-semibold group-hover:border-white/10 transition-colors">
                                                        {skill.name}
                                                    </span>
                                                ))}
                                                {user.skills.length > 3 && (
                                                    <span className="text-[10px] text-white/15 font-bold pt-1">+{user.skills.length - 3}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Row 5: CTA (Hover only) */}
                                        <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            <span className="text-[10px] font-bold text-white/20">VIEW PROFILE</span>
                                            <ArrowRight className="w-4 h-4 text-tinder-coral" />
                                        </div>

                                        {/* Background Decor */}
                                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-tinder-coral opacity-[0.01] rounded-full blur-3xl group-hover:opacity-[0.03] transition-opacity" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="w-20 h-20 rounded-[2rem] bg-white/3 border border-white/8 flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-white/10" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No developers found</h3>
                            <p className="text-white/25 text-sm max-w-xs mx-auto">Try adjusting your filters or search query to find more teammates.</p>
                            <button 
                                onClick={() => setFilters({ semester: '', department: '', role: '', availability: '0', sort: 'recent' })}
                                className="mt-6 px-6 py-2 bg-white/3 hover:bg-white/6 border border-white/8 rounded-xl text-xs font-bold transition-all"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    )
}
