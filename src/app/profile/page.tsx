'use client'


import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User, Sparkles, BookOpen, GraduationCap, Briefcase,
    Hash, Save, Loader2, Link2, Github, Linkedin, Globe,
    Eye, EyeOff, Shield, Clock, Heart, Target, CheckCircle2,
    ChevronDown, X, Plus, ExternalLink, Copy, Check
} from 'lucide-react'

const DEPARTMENTS = [
    'Computer Science', 'Electronic Engineering', 'Information Technology',
    'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering',
    'Aerospace Engineering', 'Business', 'Design', 'Mathematics'
]

const ROLE_OPTIONS = [
    'Frontend', 'Backend', 'Full-stack', 'UI/UX', 'Mobile', 'ML', 'DevOps', 'PM'
]

const LOOKING_FOR_OPTIONS = ['teammates', 'project', 'both']

const SKILL_SUGGESTIONS = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Rust', 'Go',
    'Node.js', 'Express', 'FastAPI', 'Django', 'Flutter', 'Swift', 'Kotlin',
    'Tailwind CSS', 'Figma', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker',
    'Kubernetes', 'AWS', 'GCP', 'Azure', 'TensorFlow', 'PyTorch', 'GraphQL',
    'Prisma', 'Firebase', 'Supabase', 'Git', 'Linux', 'CI/CD'
]

const INTEREST_SUGGESTIONS = [
    'AI', 'Web3', 'Open Source', 'UI/UX', 'Cloud Computing', 'Cybersecurity',
    'Blockchain', 'Game Dev', 'Data Science', 'IoT', 'AR/VR', 'DevOps',
    'FinTech', 'HealthTech', 'EdTech', 'Sustainability', 'Robotics', 'SaaS'
]

interface SkillItem {
    name: string
    level: number
}

interface SocialLinks {
    github: string
    linkedin: string
    twitter: string
    portfolio: string
    other: string
}

interface LinkVisibility {
    github: boolean
    linkedin: boolean
    twitter: boolean
    portfolio: boolean
    other: boolean
}

interface ProfileData {
    name: string
    image: string
    headline: string
    bio: string
    semester: number
    department: string
    roles: string[]
    availability: number
    lookingFor: string
    interests: string[]
    skills: SkillItem[]
    socialLinks: SocialLinks
    linkVisibility: LinkVisibility
    profileVisibility: string
    isFounding: boolean
    githubData: string
}

const defaultProfile: ProfileData = {
    name: '',
    image: '',
    headline: '',
    bio: '',
    semester: 1,
    department: DEPARTMENTS[0],
    roles: [],
    availability: 10,
    lookingFor: 'both',
    interests: [],
    skills: [],
    socialLinks: { github: '', linkedin: '', twitter: '', portfolio: '', other: '' },
    linkVisibility: { github: true, linkedin: true, twitter: true, portfolio: true, other: true },
    profileVisibility: 'public',
    isFounding: false,
    githubData: '',
}

export default function ProfilePage() {
    const { data: session, status, update: updateSession } = useSession()
    const router = useRouter()
    const [profile, setProfile] = useState<ProfileData>(defaultProfile)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
    const [newInterest, setNewInterest] = useState('')
    const [newSkillName, setNewSkillName] = useState('')
    const [showSkillSuggestions, setShowSkillSuggestions] = useState(false)
    const [copied, setCopied] = useState(false)

    // Redirect if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth')
        }
    }, [status, router])

    const hasLoaded = React.useRef(false)

    // Fetch profile data
    useEffect(() => {
        if (status === 'authenticated' && !hasLoaded.current) {
            hasLoaded.current = true
            fetch('/api/profile')
                .then(r => r.json())
                .then(data => {
                    setProfile({
                        name: data.name || session?.user?.name || '',
                        image: data.image || session?.user?.image || '',
                        headline: data.headline || (session?.user as any)?.headline || '',
                        bio: data.bio || (session?.user as any)?.bio || '',
                        semester: data.semester || 1,
                        department: data.department || DEPARTMENTS[0],
                        roles: data.roles ? JSON.parse(data.roles) : [],
                        availability: data.availability || 10,
                        lookingFor: data.lookingFor || 'both',
                        interests: data.interests ? JSON.parse(data.interests) : [],
                        skills: data.skills ? JSON.parse(data.skills) : [],
                        socialLinks: data.socialLinks ? JSON.parse(data.socialLinks) : ((session?.user as any)?.socialLinks ? JSON.parse((session?.user as any).socialLinks) : defaultProfile.socialLinks),
                        linkVisibility: data.linkVisibility ? JSON.parse(data.linkVisibility) : defaultProfile.linkVisibility,
                        profileVisibility: data.profileVisibility || 'public',
                        isFounding: data.isFounding || false,
                        githubData: data.githubData || '',
                    })
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [status, session])

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: profile.name,
                    image: profile.image,
                    headline: profile.headline,
                    bio: profile.bio,
                    semester: profile.semester,
                    department: profile.department,
                    roles: JSON.stringify(profile.roles),
                    availability: profile.availability,
                    lookingFor: profile.lookingFor,
                    interests: JSON.stringify(profile.interests),
                    skills: JSON.stringify(profile.skills),
                    socialLinks: JSON.stringify(profile.socialLinks),
                    linkVisibility: JSON.stringify(profile.linkVisibility),
                    profileVisibility: profile.profileVisibility,
                    isFounding: profile.isFounding,
                    githubData: profile.githubData,
                }),
            })
            
            if (res.ok) {
                // Refresh the session so the Navbar updates (name, image)
                await updateSession()
                setSaved(true)
                setTimeout(() => setSaved(false), 2000)
            }
        } catch (err) {
            console.error('Save error:', err)
        }
        setSaving(false)
    }

    const addSkill = useCallback((name: string) => {
        if (name.trim() && !profile.skills.some(s => s.name.toLowerCase() === name.trim().toLowerCase())) {
            setProfile(p => ({ ...p, skills: [...p.skills, { name: name.trim(), level: 2 }] }))
        }
        setNewSkillName('')
        setShowSkillSuggestions(false)
    }, [profile.skills])

    const removeSkill = (name: string) => {
        setProfile(p => ({ ...p, skills: p.skills.filter(s => s.name !== name) }))
    }

    const updateSkillLevel = (name: string, level: number) => {
        setProfile(p => ({
            ...p,
            skills: p.skills.map(s => s.name === name ? { ...s, level } : s)
        }))
    }

    const toggleRole = (role: string) => {
        setProfile(p => ({
            ...p,
            roles: p.roles.includes(role) ? p.roles.filter(r => r !== role) : [...p.roles, role]
        }))
    }

    const addInterest = () => {
        if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
            setProfile(p => ({ ...p, interests: [...p.interests, newInterest.trim()] }))
            setNewInterest('')
        }
    }

    const removeInterest = (interest: string) => {
        setProfile(p => ({ ...p, interests: p.interests.filter(i => i !== interest) }))
    }

    // Profile completeness calculation
    const completenessFields = [
        !!profile.name,
        !!profile.headline,
        !!profile.bio,
        !!profile.semester,
        !!profile.department,
        profile.roles.length > 0,
        profile.skills.length > 0,
        profile.interests.length > 0,
        !!profile.socialLinks.github || !!profile.socialLinks.linkedin,
        !!profile.image,
    ]
    const completeness = Math.round((completenessFields.filter(Boolean).length / completenessFields.length) * 100)

    const profileUrl = typeof window !== 'undefined' ?
        `${window.location.origin}/u/${session?.user?.id}` : ''

    const copyProfileUrl = () => {
        navigator.clipboard.writeText(profileUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const inputClasses = "w-full bg-white/3 border border-white/6 px-4 py-3.5 rounded-xl focus:outline-none text-sm transition-all duration-300 placeholder:text-white/15 focus:border-tinder-coral/40 focus:ring-1 focus:ring-tinder-coral/20 focus:bg-white/5 hover:border-white/10"
    const labelClasses = "text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 flex items-center gap-1.5"

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <Loader2 className="w-8 h-8 animate-spin text-tinder-coral" />
                    <p className="text-white/30 text-sm">Loading your profile...</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-32 -left-64 w-96 h-96 rounded-full bg-tinder-coral/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-32 -right-64 w-96 h-96 rounded-full bg-tinder-orange/5 blur-[200px] pointer-events-none" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
                                Your <span className="gradient-text">Profile</span>
                            </h1>
                            <p className="text-white/30 text-sm">Craft your campus identity. Everything auto-saves to the cloud.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Tab switcher */}
                            <div className="flex items-center bg-white/3 rounded-full p-1 border border-white/6">
                                {(['edit', 'preview'] as const).map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeTab === tab
                                            ? 'bg-white/10 text-white'
                                            : 'text-white/30 hover:text-white/50'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-tinder-coral to-tinder-orange rounded-xl text-sm font-bold text-white shadow-lg shadow-tinder-coral/25 hover:shadow-tinder-coral/40 hover:brightness-110 active:scale-[0.97] transition-all duration-200 disabled:opacity-50"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : saved ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
                            </button>
                        </div>
                    </div>

                    {/* Completeness Meter */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-6 glass rounded-xl p-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                                <Target className="w-3 h-3" /> Profile Completeness
                            </span>
                            <span className={`text-sm font-black ${completeness === 100 ? 'text-green-400' : completeness >= 60 ? 'text-tinder-gold' : 'text-tinder-coral'}`}>
                                {completeness}%
                            </span>
                        </div>
                        <div className="h-1.5 bg-white/4 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${completeness}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                className={`h-full rounded-full ${completeness === 100
                                    ? 'bg-linear-to-r from-green-400 to-green-500'
                                    : 'bg-linear-to-r from-tinder-coral to-tinder-orange'
                                    }`}
                            />
                        </div>
                        {completeness < 100 && (
                            <p className="text-[10px] text-white/20 mt-2">
                                {!profile.headline && '• Add a headline  '}
                                {!profile.bio && '• Write a bio  '}
                                {profile.skills.length === 0 && '• Add your skills  '}
                                {profile.roles.length === 0 && '• Select your roles  '}
                                {(!profile.socialLinks.github && !profile.socialLinks.linkedin) && '• Add social links'}
                            </p>
                        )}
                    </motion.div>

                    {/* Share URL */}
                    {session?.user?.id && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-3 flex items-center gap-2"
                        >
                            <div className="flex-1 flex items-center gap-2 bg-white/2 border border-white/5 rounded-lg px-3 py-2">
                                <ExternalLink className="w-3.5 h-3.5 text-white/20 shrink-0" />
                                <span className="text-xs text-white/30 truncate font-mono">{profileUrl}</span>
                            </div>
                            <button
                                onClick={copyProfileUrl}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/4 border border-white/6 hover:bg-white/8 transition-all text-xs font-semibold text-white/40 hover:text-white/70 shrink-0"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </motion.div>
                    )}
                </motion.div>

                <AnimatePresence mode="wait">
                    {activeTab === 'edit' ? (
                        <motion.div
                            key="edit"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        >
                            {/* ─── Left Column ─── */}
                            <div className="space-y-6">
                                {/* Basic Info Card */}
                                <div className="glass-strong rounded-2xl overflow-hidden">
                                    <div className="h-[2px] bg-linear-to-r from-tinder-coral via-tinder-orange to-tinder-pink" />
                                    <div className="p-6 space-y-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-tinder-coral/30 to-tinder-pink/30 flex items-center justify-center border border-tinder-coral/20">
                                                <User className="w-4 h-4 text-tinder-coral" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">Basic Info</h3>
                                                <p className="text-[11px] text-white/25">The essentials</p>
                                            </div>
                                        </div>

                                        {/* Avatar */}
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/8 bg-white/3">
                                                    {profile.image ? (
                                                        <Image src={profile.image} alt="Avatar" width={64} height={64} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <User className="w-6 h-6 text-white/20" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-linear-to-br from-tinder-coral to-tinder-orange flex items-center justify-center">
                                                    <Sparkles className="w-2.5 h-2.5 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <label className={labelClasses}>Avatar URL</label>
                                                <input
                                                    type="url"
                                                    placeholder="https://..."
                                                    className={`${inputClasses} mt-1`}
                                                    value={profile.image}
                                                    onChange={e => setProfile(p => ({ ...p, image: e.target.value }))}
                                                />
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}><User className="w-2.5 h-2.5" /> Display Name</label>
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                className={inputClasses}
                                                value={profile.name}
                                                onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                                            />
                                        </div>

                                        {/* Headline */}
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}><Sparkles className="w-2.5 h-2.5" /> Headline</label>
                                            <input
                                                type="text"
                                                placeholder="Full-stack dev • Sem 5 CSE"
                                                className={inputClasses}
                                                value={profile.headline}
                                                onChange={e => setProfile(p => ({ ...p, headline: e.target.value }))}
                                            />
                                        </div>

                                        {/* Bio */}
                                        <div className="space-y-1.5">
                                            <label className={labelClasses}>Bio</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Write a short introduction about yourself..."
                                                className={`${inputClasses} resize-none`}
                                                maxLength={300}
                                                value={profile.bio}
                                                onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                                            />
                                            <p className="text-[10px] text-white/15 text-right">{profile.bio.length}/300</p>
                                        </div>

                                        {/* Semester + Department */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label className={labelClasses}><GraduationCap className="w-2.5 h-2.5" /> Semester</label>
                                                <select
                                                    className={inputClasses}
                                                    value={profile.semester}
                                                    onChange={e => setProfile(p => ({ ...p, semester: parseInt(e.target.value) }))}
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                                        <option key={s} value={s} className="bg-[#111] text-white">Semester {s}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={labelClasses}><BookOpen className="w-2.5 h-2.5" /> Department</label>
                                                <select
                                                    className={inputClasses}
                                                    value={profile.department}
                                                    onChange={e => setProfile(p => ({ ...p, department: e.target.value }))}
                                                >
                                                    {DEPARTMENTS.map(d => (
                                                        <option key={d} value={d} className="bg-[#111] text-white">{d}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Roles & Availability Card */}
                                <div className="glass-strong rounded-2xl overflow-hidden">
                                    <div className="h-[2px] bg-linear-to-r from-tinder-orange via-tinder-gold to-tinder-orange" />
                                    <div className="p-6 space-y-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-tinder-orange/30 to-tinder-gold/30 flex items-center justify-center border border-tinder-orange/20">
                                                <Briefcase className="w-4 h-4 text-tinder-orange" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">Roles & Availability</h3>
                                                <p className="text-[11px] text-white/25">What you do & when</p>
                                            </div>
                                        </div>

                                        {/* Roles multi-select */}
                                        <div className="space-y-2">
                                            <label className={labelClasses}><Briefcase className="w-2.5 h-2.5" /> Roles (multi-select)</label>
                                            <div className="flex flex-wrap gap-2">
                                                {ROLE_OPTIONS.map(role => (
                                                    <button
                                                        key={role}
                                                        type="button"
                                                        onClick={() => toggleRole(role)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${profile.roles.includes(role)
                                                            ? 'bg-tinder-coral/15 border-tinder-coral/30 text-tinder-coral'
                                                            : 'bg-white/2 border-white/6 text-white/30 hover:text-white/50 hover:border-white/10'
                                                            }`}
                                                    >
                                                        {profile.roles.includes(role) && <span className="mr-1">✓</span>}
                                                        {role}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Availability */}
                                        <div className="space-y-2">
                                            <label className={labelClasses}>
                                                <Clock className="w-2.5 h-2.5" /> Availability
                                                <span className="ml-2 text-tinder-coral/60 normal-case tracking-normal">{profile.availability} hrs/week</span>
                                            </label>
                                            <input
                                                type="range"
                                                min={1}
                                                max={40}
                                                value={profile.availability}
                                                onChange={e => setProfile(p => ({ ...p, availability: parseInt(e.target.value) }))}
                                                className="w-full h-1.5 bg-white/6 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-tinder-coral [&::-webkit-slider-thumb]:to-tinder-orange [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-tinder-coral/30"
                                            />
                                            <div className="flex justify-between text-[9px] text-white/15">
                                                <span>1h</span><span>10h</span><span>20h</span><span>30h</span><span>40h</span>
                                            </div>
                                        </div>

                                        {/* Looking For */}
                                        <div className="space-y-2">
                                            <label className={labelClasses}><Heart className="w-2.5 h-2.5" /> Looking For</label>
                                            <div className="flex gap-2">
                                                {LOOKING_FOR_OPTIONS.map(opt => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => setProfile(p => ({ ...p, lookingFor: opt }))}
                                                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${profile.lookingFor === opt
                                                            ? 'bg-tinder-coral/15 border-tinder-coral/30 text-tinder-coral'
                                                            : 'bg-white/2 border-white/6 text-white/30 hover:text-white/50'
                                                            }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ─── Right Column ─── */}
                            <div className="space-y-6">
                                {/* Skills Card */}
                                <div className="glass-strong rounded-2xl overflow-hidden">
                                    <div className="h-[2px] bg-linear-to-r from-tinder-pink via-tinder-coral to-tinder-pink" />
                                    <div className="p-6 space-y-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-tinder-pink/30 to-tinder-coral/30 flex items-center justify-center border border-tinder-pink/20">
                                                <Hash className="w-4 h-4 text-tinder-pink" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">Skills & Proficiency</h3>
                                                <p className="text-[11px] text-white/25">Rate yourself honestly</p>
                                            </div>
                                        </div>

                                        {/* Add skill input */}
                                        <div className="relative">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Add a skill (e.g., React)"
                                                    className={`${inputClasses} flex-1`}
                                                    value={newSkillName}
                                                    onChange={e => {
                                                        setNewSkillName(e.target.value)
                                                        setShowSkillSuggestions(e.target.value.length > 0)
                                                    }}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault()
                                                            addSkill(newSkillName)
                                                        }
                                                    }}
                                                    onFocus={() => newSkillName.length > 0 && setShowSkillSuggestions(true)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => addSkill(newSkillName)}
                                                    className="px-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all text-white/40 hover:text-white"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                             {/* Suggestions dropdown */}
                                            <AnimatePresence>
                                                {showSkillSuggestions && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -4 }}
                                                        className="absolute z-20 top-full left-0 right-12 mt-1 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl shadow-black/50 max-h-40 overflow-y-auto"
                                                    >
                                                        {SKILL_SUGGESTIONS
                                                            .filter(s =>
                                                                s.toLowerCase().includes(newSkillName.toLowerCase()) &&
                                                                !profile.skills.some(ps => ps.name.toLowerCase() === s.toLowerCase())
                                                            )
                                                            .slice(0, 6)
                                                            .map(s => (
                                                                <button
                                                                    key={s}
                                                                    type="button"
                                                                    onClick={() => addSkill(s)}
                                                                    className="w-full px-4 py-2 text-sm text-left text-white/50 hover:bg-white/5 hover:text-white transition-colors"
                                                                >
                                                                    {s}
                                                                </button>
                                                            ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Quick add skills from start */}
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest px-1">Quick Add</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {SKILL_SUGGESTIONS
                                                    .filter(s => !profile.skills.some(ps => ps.name.toLowerCase() === s.toLowerCase()))
                                                    .slice(0, 8)
                                                    .map(s => (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            onClick={() => addSkill(s)}
                                                            className="px-2 py-1 rounded-lg bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/10 text-[10px] text-white/30 hover:text-white/60 transition-all"
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>

                                        {/* Skills list with proficiency */}
                                        <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                                            <AnimatePresence>
                                                {profile.skills.map(skill => (
                                                    <motion.div
                                                        key={skill.name}
                                                        layout
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, x: 20 }}
                                                        className="flex items-center gap-3 bg-white/2 border border-white/5 rounded-xl px-3 py-2"
                                                    >
                                                        <span className="text-sm font-medium text-white/70 flex-1 truncate">{skill.name}</span>
                                                        {/* Star rating */}
                                                        <div className="flex gap-1">
                                                            {[
                                                                { l: 1, n: 'Beg' },
                                                                { l: 2, n: 'Int' },
                                                                { l: 3, n: 'Adv' }
                                                            ].map(({ l, n }) => (
                                                                <button
                                                                    key={l}
                                                                    type="button"
                                                                    onClick={() => updateSkillLevel(skill.name, l)}
                                                                    className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider transition-all border ${skill.level === l
                                                                        ? 'bg-tinder-gold/20 border-tinder-gold text-tinder-gold'
                                                                        : 'bg-white/2 border-white/5 text-white/20 hover:text-white/40'
                                                                        }`}
                                                                >
                                                                    {n}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSkill(skill.name)}
                                                            className="p-1 rounded-lg hover:bg-white/5 text-white/20 hover:text-red-400 transition-all"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                            {profile.skills.length === 0 && (
                                                <p className="text-center text-white/15 text-xs py-6">No skills added yet. Start typing above!</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Interests Card */}
                                <div className="glass-strong rounded-2xl overflow-hidden">
                                    <div className="h-[2px] bg-linear-to-r from-tinder-gold via-tinder-orange to-tinder-gold" />
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-tinder-gold/30 to-tinder-orange/30 flex items-center justify-center border border-tinder-gold/20">
                                                <Sparkles className="w-4 h-4 text-tinder-gold" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">Interests</h3>
                                                <p className="text-[11px] text-white/25">What excites you</p>
                                            </div>
                                        </div>

                                         <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="AI, Web3, Open-source..."
                                                className={`${inputClasses} flex-1`}
                                                value={newInterest}
                                                onChange={e => setNewInterest(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addInterest() } }}
                                            />
                                            <button
                                                type="button"
                                                onClick={addInterest}
                                                className="px-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all text-white/40 hover:text-white"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Quick add interests */}
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest px-1">Trending</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {INTEREST_SUGGESTIONS
                                                    .filter(i => !profile.interests.includes(i))
                                                    .slice(0, 8)
                                                    .map(i => (
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            onClick={() => {
                                                                if (!profile.interests.includes(i)) {
                                                                    setProfile(p => ({ ...p, interests: [...p.interests, i] }))
                                                                }
                                                            }}
                                                            className="px-2 py-1 rounded-lg bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/10 text-[10px] text-white/30 hover:text-white/60 transition-all"
                                                        >
                                                            {i}
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <AnimatePresence>
                                                {profile.interests.map(interest => (
                                                    <motion.span
                                                        key={interest}
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tinder-gold/10 border border-tinder-gold/20 text-xs font-semibold text-tinder-gold/80"
                                                    >
                                                        {interest}
                                                        <button type="button" onClick={() => removeInterest(interest)} className="hover:text-red-400 transition-colors">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </motion.span>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links Card */}
                                <div className="glass-strong rounded-2xl overflow-hidden">
                                    <div className="h-[2px] bg-linear-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30" />
                                    <div className="p-6 space-y-5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-500/20">
                                                <Link2 className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">Social & Links</h3>
                                                <p className="text-[11px] text-white/25">Proof of work · toggle each link</p>
                                            </div>
                                        </div>

                                        {([
                                            { key: 'github' as const, icon: Github, placeholder: 'https://github.com/username' },
                                            { key: 'linkedin' as const, icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
                                            { key: 'twitter' as const, icon: () => <span className="text-sm font-black">𝕏</span>, placeholder: 'https://x.com/username' },
                                            { key: 'portfolio' as const, icon: Globe, placeholder: 'https://yourportfolio.com' },
                                            { key: 'other' as const, icon: Link2, placeholder: 'https://...' },
                                        ]).map(({ key, icon: Icon, placeholder }) => (
                                            <div key={key} className="flex flex-col gap-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white/3 border border-white/6 flex items-center justify-center text-white/30 shrink-0">
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <input
                                                        type="url"
                                                        placeholder={placeholder}
                                                        className={`${inputClasses} flex-1 text-xs`}
                                                        value={profile.socialLinks[key]}
                                                        onChange={e => setProfile(p => ({
                                                            ...p,
                                                            socialLinks: { ...p.socialLinks, [key]: e.target.value }
                                                        }))}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setProfile(p => ({
                                                            ...p,
                                                            linkVisibility: { ...p.linkVisibility, [key]: !p.linkVisibility[key] }
                                                        }))}
                                                        className={`p-2 rounded-lg border transition-all shrink-0 ${profile.linkVisibility[key]
                                                            ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                                            : 'bg-white/2 border-white/6 text-white/20'
                                                            }`}
                                                        title={profile.linkVisibility[key] ? 'Visible on public profile' : 'Hidden from public profile'}
                                                    >
                                                        {profile.linkVisibility[key] ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                                    </button>
                                                </div>
                                                {key === 'github' && profile.socialLinks.github && (
                                                    <motion.button
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        onClick={async () => {
                                                            const username = profile.socialLinks.github.split('/').pop()
                                                            if (!username) return
                                                            try {
                                                                const userRes = await fetch(`https://api.github.com/users/${username}`)
                                                                if (!userRes.ok) return
                                                                const userData = await userRes.json()
                                                                
                                                                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=3`)
                                                                const reposData = reposRes.ok ? await reposRes.json() : []
                                                                
                                                                const top_repos = reposData.map((r: { name: string, html_url: string, stargazers_count: number, language?: string }) => ({
                                                                    name: r.name,
                                                                    url: r.html_url,
                                                                    stars: r.stargazers_count,
                                                                    lang: r.language
                                                                }))

                                                                setProfile(p => ({
                                                                    ...p,
                                                                    name: p.name || userData.name || p.name,
                                                                    bio: p.bio || userData.bio || p.bio,
                                                                    headline: p.headline || userData.company || (userData.bio ? userData.bio.slice(0, 50) : p.headline),
                                                                    socialLinks: {
                                                                        ...p.socialLinks,
                                                                        portfolio: p.socialLinks.portfolio || userData.blog || p.socialLinks.portfolio,
                                                                        twitter: p.socialLinks.twitter || (userData.twitter_username ? `https://x.com/${userData.twitter_username}` : p.socialLinks.twitter)
                                                                    },
                                                                    githubData: JSON.stringify({
                                                                        repos_count: userData.public_repos,
                                                                        followers: userData.followers,
                                                                        following: userData.following,
                                                                        top_repos
                                                                    })
                                                                }))
                                                                handleSave()
                                                            } catch (err) {
                                                                console.error('GitHub fetch error:', err)
                                                            }
                                                        }}
                                                        className="ml-11 text-[9px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest flex items-center gap-1"
                                                    >
                                                        <Github className="w-2.5 h-2.5" /> Verify & Fetch Data
                                                    </motion.button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Privacy Card */}
                                <div className="glass-strong rounded-2xl overflow-hidden">
                                    <div className="h-[2px] bg-linear-to-r from-white/5 via-white/10 to-white/5" />
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/8">
                                                <Shield className="w-4 h-4 text-white/40" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">Privacy</h3>
                                                <p className="text-[11px] text-white/25">Control who sees your profile</p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setProfile(p => ({
                                                ...p,
                                                profileVisibility: p.profileVisibility === 'public' ? 'private' : 'public'
                                            }))}
                                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-300 ${profile.profileVisibility === 'public'
                                                ? 'bg-green-500/8 border-green-500/20'
                                                : 'bg-red-500/8 border-red-500/20'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {profile.profileVisibility === 'public' ? (
                                                    <Eye className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4 text-red-400" />
                                                )}
                                                <div className="text-left">
                                                    <div className="text-sm font-semibold">
                                                        {profile.profileVisibility === 'public' ? 'Public Profile' : 'Private Profile'}
                                                    </div>
                                                    <div className="text-[10px] text-white/25">
                                                        {profile.profileVisibility === 'public' ? 'Visible to everyone on campus' : 'Only you can see your profile'}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronDown className={`w-4 h-4 text-white/20 transition-transform ${profile.profileVisibility === 'public' ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ─── Preview Mode ─── */
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProfilePreview profile={profile} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   Profile Preview Component
   ───────────────────────────────────────────────────────────── */
function ProfilePreview({ profile }: { profile: ProfileData }) {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="glass-strong rounded-2xl overflow-hidden">
                {/* Banner */}
                <div className="h-32 bg-linear-to-br from-tinder-coral/20 via-tinder-orange/10 to-tinder-pink/20 relative">
                    <div className="absolute inset-0 bg-linear-to-t from-[#121212] to-transparent" />
                </div>

                <div className="px-8 pb-8 -mt-12 relative">
                    {/* Avatar */}
                    <div className="flex items-end gap-4 mb-6">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#121212] bg-white/5 shadow-xl">
                            {profile.image ? (
                                <Image src={profile.image} alt="Avatar" width={96} height={96} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <User className="w-10 h-10 text-white/15" />
                                </div>
                            )}
                        </div>
                        <div className="pb-1">
                            <h2 className="text-2xl font-black tracking-tight">{profile.name || 'Your Name'}</h2>
                            {profile.headline && (
                                <p className="text-sm text-white/40 mt-0.5">{profile.headline}</p>
                            )}
                        </div>
                    </div>

                    {/* Info badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {profile.department && (
                            <span className="badge">
                                <BookOpen className="w-3 h-3" /> {profile.department}
                            </span>
                        )}
                        {profile.semester && (
                            <span className="badge">
                                <GraduationCap className="w-3 h-3" /> Semester {profile.semester}
                            </span>
                        )}
                        {profile.availability > 0 && (
                            <span className="badge">
                                <Clock className="w-3 h-3" /> {profile.availability}h/week
                            </span>
                        )}
                        {profile.lookingFor && (
                            <span className="badge border-tinder-coral/20! text-tinder-coral/60!">
                                <Heart className="w-3 h-3" /> Looking for {profile.lookingFor}
                            </span>
                        )}
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <div className="mb-6">
                            <p className="text-sm text-white/50 leading-relaxed">{profile.bio}</p>
                        </div>
                    )}

                    {/* Roles */}
                    {profile.roles.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Roles</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.roles.map(role => (
                                    <span key={role} className="px-3 py-1.5 rounded-lg bg-tinder-coral/10 border border-tinder-coral/15 text-xs font-semibold text-tinder-coral/70">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {profile.skills.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Skills</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {profile.skills.map(skill => (
                                    <div key={skill.name} className="flex items-center justify-between bg-white/2 border border-white/5 rounded-lg px-3 py-2">
                                        <span className="text-xs font-medium text-white/60">{skill.name}</span>
                                        <span className="text-[9px] font-bold text-tinder-gold/60 uppercase tracking-widest leading-none">
                                            {skill.level === 1 ? 'Beginner' : skill.level === 2 ? 'Intermediate' : 'Advanced'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interests */}
                    {profile.interests.length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Interests</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.interests.map(interest => (
                                    <span key={interest} className="px-3 py-1.5 rounded-lg bg-tinder-gold/8 border border-tinder-gold/15 text-xs font-semibold text-tinder-gold/70">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Social Links */}
                    {Object.values(profile.socialLinks).some(Boolean) && (
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Links</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.socialLinks.github && profile.linkVisibility.github && (
                                    <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/6 text-xs text-white/40 hover:text-white hover:bg-white/6 transition-all">
                                        <Github className="w-3.5 h-3.5" /> GitHub
                                    </a>
                                )}
                                {profile.socialLinks.linkedin && profile.linkVisibility.linkedin && (
                                    <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/6 text-xs text-white/40 hover:text-white hover:bg-white/6 transition-all">
                                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                                    </a>
                                )}
                                {profile.socialLinks.twitter && profile.linkVisibility.twitter && (
                                    <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/6 text-xs text-white/40 hover:text-white hover:bg-white/6 transition-all">
                                        <span className="text-xs font-black">𝕏</span> Twitter
                                    </a>
                                )}
                                {profile.socialLinks.portfolio && profile.linkVisibility.portfolio && (
                                    <a href={profile.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/6 text-xs text-white/40 hover:text-white hover:bg-white/6 transition-all">
                                        <Globe className="w-3.5 h-3.5" /> Portfolio
                                    </a>
                                )}
                                {profile.socialLinks.other && profile.linkVisibility.other && (
                                    <a href={profile.socialLinks.other} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/6 text-xs text-white/40 hover:text-white hover:bg-white/6 transition-all">
                                        <Link2 className="w-3.5 h-3.5" /> Other
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
