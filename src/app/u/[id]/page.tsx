'use client'

import Image from 'next/image'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    User, BookOpen, GraduationCap, Clock, Heart,
    Github, Linkedin, Globe, Link2, Star,
    Ghost, Loader2, ShieldX, ArrowLeft, Sparkles, Flag, ShieldAlert
} from 'lucide-react'
import Logo from '@/components/Logo'

interface GithubRepo {
    name: string
    url: string
    stars: number
    lang?: string
}

import { LucideIcon } from 'lucide-react'

interface SkillItem {
    name: string
    level: number
}

interface PublicProfile {
    id: string
    name: string
    image: string
    headline: string
    bio: string
    semester: number
    department: string
    roles: string
    availability: number
    lookingFor: string
    interests: string
    skills: string
    socialLinks: string
    profileVisibility: string
    isFounding: boolean
    githubData?: string
    createdAt: string
}

const Badge = ({ children, icon: Icon, color }: { children: React.ReactNode, icon: LucideIcon, color: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-${color}/20 bg-${color}/10 text-${color} backdrop-blur-md self-start`}
    >
        <Icon className="w-3 h-3" />
        {children}
    </motion.div>
)

export default function PublicProfilePage() {
    const params = useParams()
    const id = params.id as string
    const [profile, setProfile] = useState<PublicProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [reporting, setReporting] = useState(false)
    const [reportReason, setReportReason] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isBlocked, setIsBlocked] = useState(false)

    useEffect(() => {
        fetch(`/api/profile/${id}`)
            .then(r => {
                if (!r.ok) throw new Error(r.status === 403 ? 'private' : 'notfound')
                return r.json()
            })
            .then(data => {
                setProfile(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [id])

    const handleReport = async (block = false) => {
        if (!profile || (!reportReason && !block)) return
        
        setIsSubmitting(true)
        try {
            if (reportReason) {
                await fetch('/api/user/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        reportedId: profile.id,
                        reason: reportReason
                    })
                })
            }

            if (block) {
                await fetch('/api/user/block', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ blockedId: profile.id })
                })
                setIsBlocked(true)
            }

            setReporting(false)
            setReportReason('')
        } catch (error) {
            console.error('Action failed:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-tinder-coral" />
                    <p className="text-white/30 text-sm">Loading profile...</p>
                </motion.div>
            </div>
        )
    }

    if (error === 'private' || isBlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                        <ShieldX className="w-10 h-10 text-red-400" />
                    </div>
                    <h1 className="text-2xl font-black mb-2">{isBlocked ? 'User Blocked' : 'Private Profile'}</h1>
                    <p className="text-white/30 text-sm mb-6">
                        {isBlocked ? "You have blocked this user. They will no longer appear in your feed." : "This user has set their profile to private."}
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-all text-sm font-semibold text-white/50 hover:text-white">
                        <ArrowLeft className="w-4 h-4" /> Go Home
                    </Link>
                </motion.div>
            </div>
        )
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                        <Ghost className="w-10 h-10 text-white/15" />
                    </div>
                    <h1 className="text-2xl font-black mb-2">Profile Not Found</h1>
                    <p className="text-white/30 text-sm mb-6">This user doesn&apos;t exist or has been removed.</p>
                    <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] transition-all text-sm font-semibold text-white/50 hover:text-white">
                        <ArrowLeft className="w-4 h-4" /> Go Home
                    </Link>
                </motion.div>
            </div>
        )
    }

    const roles: string[] = profile.roles ? JSON.parse(profile.roles) : []
    const skills: SkillItem[] = profile.skills ? JSON.parse(profile.skills) : []
    const interests: string[] = profile.interests ? JSON.parse(profile.interests) : []
    const socialLinks: Record<string, string> = profile.socialLinks ? JSON.parse(profile.socialLinks) : {}

    const memberSince = new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-32 -left-64 w-96 h-96 rounded-full bg-tinder-coral/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-32 -right-64 w-96 h-96 rounded-full bg-tinder-orange/5 blur-[200px] pointer-events-none" />

            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="glass-strong rounded-2xl overflow-hidden">
                        {/* Banner */}
                        <div className="h-36 bg-linear-to-br from-tinder-coral/25 via-tinder-orange/15 to-tinder-pink/25 relative">
                            {/* Mesh gradient overlay */}
                            <div className="absolute inset-0" style={{
                                background: 'radial-gradient(circle at 30% 50%, rgba(254,60,114,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(255,107,74,0.15) 0%, transparent 60%)'
                            }} />
                            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
                        </div>

                        <div className="px-8 pb-8 -mt-14 relative">
                            {/* Avatar */}
                            <div className="flex items-end gap-5 mb-6">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative"
                                >
                                    <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-background bg-white/5 shadow-2xl relative">
                                        {profile.image ? (
                                            <Image src={profile.image} alt={profile.name || 'User'} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-tinder-coral/20 to-tinder-orange/20">
                                                <User className="w-12 h-12 text-white/15" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-tinder-coral to-tinder-orange flex items-center justify-center shadow-lg shadow-tinder-coral/30">
                                        <Sparkles className="w-3.5 h-3.5 text-white" />
                                    </div>
                                </motion.div>

                                <div className="pb-2 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h1 className="text-3xl font-black tracking-tight">{profile.name || 'Anonymous'}</h1>
                                            {profile.headline && (
                                                <p className="text-sm text-white/35 mt-0.5">{profile.headline}</p>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => setReporting(true)}
                                            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all group"
                                            title="Report or Block"
                                        >
                                            <Flag className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-white/15 mt-1 uppercase tracking-wider font-semibold">Member since {memberSince}</p>
                                </div>
                            </div>

                            {/* Verification Signals */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {profile.isFounding && (
                                    <Badge icon={Star} color="tinder-orange">Founding Member</Badge>
                                )}
                                {(() => {
                                    const isComplete = profile.bio && profile.skills && profile.department && profile.semester && profile.roles
                                    return isComplete && (
                                        <Badge icon={Sparkles} color="tinder-coral">Profile Complete</Badge>
                                    )
                                })()}
                                {profile.githubData && (() => {
                                    try {
                                        const github = JSON.parse(profile.githubData)
                                        return (
                                            <>
                                                <Badge icon={Github} color="white/40">
                                                    {github.repos_count} Repos
                                                </Badge>
                                                <Badge icon={User} color="white/30">
                                                    {github.followers} Followers
                                                </Badge>
                                            </>
                                        )
                                    } catch { return null }
                                })()}
                            </div>

                            {profile.githubData && (() => {
                                try {
                                    const github = JSON.parse(profile.githubData)
                                    if (!github.top_repos || github.top_repos.length === 0) return null
                                    return (
                                        <div className="mb-8">
                                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3 flex items-center gap-2">
                                                <Github className="w-3 h-3" /> Top Repositories
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {github.top_repos.map((repo: GithubRepo) => (
                                                    <a 
                                                        key={repo.name} 
                                                        href={repo.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="group p-3 rounded-xl bg-white/2 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
                                                    >
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="text-sm font-bold text-white/70 group-hover:text-blue-400 truncate">{repo.name}</span>
                                                            <div className="flex items-center gap-1 text-[10px] text-white/20">
                                                                <Star className="w-2.5 h-2.5 fill-tinder-gold text-tinder-gold" /> {repo.stars}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {repo.lang && (
                                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/40">{repo.lang}</span>
                                                            )}
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                } catch { return null }
                            })()}

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
                                {profile.availability && profile.availability > 0 && (
                                    <span className="badge">
                                        <Clock className="w-3 h-3" /> {profile.availability}h/week
                                    </span>
                                )}
                                {profile.lookingFor && (
                                    <span className="badge !border-tinder-coral/20 !text-tinder-coral/60">
                                        <Heart className="w-3 h-3" /> Looking for {profile.lookingFor}
                                    </span>
                                )}
                            </div>

                            {/* Bio */}
                            {profile.bio && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-8 bg-white/2 border border-white/4 rounded-xl p-4"
                                >
                                    <p className="text-sm text-white/45 leading-relaxed">{profile.bio}</p>
                                </motion.div>
                            )}

                            {/* Roles */}
                            {roles.length > 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mb-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Roles</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {roles.map((role: string) => (
                                            <span key={role} className="px-3 py-1.5 rounded-lg bg-tinder-coral/10 border border-tinder-coral/15 text-xs font-semibold text-tinder-coral/70">
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Skills */}
                            {skills.length > 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Skills</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {skills.map((skill: SkillItem) => (
                                            <div key={skill.name} className="flex items-center justify-between bg-white/2 border border-white/5 rounded-lg px-3 py-2">
                                                <span className="text-xs font-medium text-white/60">{skill.name}</span>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(l => (
                                                        <Star key={l} className={`w-2.5 h-2.5 ${l <= skill.level ? 'text-tinder-gold fill-tinder-gold' : 'text-white/10'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Interests */}
                            {interests.length > 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mb-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Interests</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {interests.map((interest: string) => (
                                            <span key={interest} className="px-3 py-1.5 rounded-lg bg-tinder-gold/8 border border-tinder-gold/15 text-xs font-semibold text-tinder-gold/70">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Social Links */}
                            {Object.values(socialLinks).some(Boolean) && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">Links</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {socialLinks.github && (
                                            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-200">
                                                <Github className="w-4 h-4" /> GitHub
                                            </a>
                                        )}
                                        {socialLinks.linkedin && (
                                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-200">
                                                <Linkedin className="w-4 h-4" /> LinkedIn
                                            </a>
                                        )}
                                        {socialLinks.twitter && (
                                            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-200">
                                                <span className="text-xs font-black">𝕏</span> Twitter
                                            </a>
                                        )}
                                        {socialLinks.portfolio && (
                                            <a href={socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-200">
                                                <Globe className="w-4 h-4" /> Portfolio
                                            </a>
                                        )}
                                        {socialLinks.other && (
                                            <a href={socialLinks.other} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all duration-200">
                                                <Link2 className="w-4 h-4" /> Other
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/" className="inline-flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                            <Logo size="sm" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Report Modal */}
            <AnimatePresence>
                {reporting && profile && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setReporting(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-tinder-coral" />
                            
                            <div className="flex items-center gap-3 mb-6 text-red-400">
                                <ShieldAlert className="w-6 h-6" />
                                <h3 className="text-xl font-black tracking-tight">Report User</h3>
                            </div>

                            <p className="text-white/60 text-sm mb-6">
                                Help us keep GhostCommit safe. Why are you reporting <span className="text-white font-bold">{profile.name}</span>?
                            </p>

                            <div className="space-y-3 mb-8">
                                {[
                                    'False or Misleading Information',
                                    'Impersonation (Fake Profile)',
                                    'Inappropriate Behavior or Harassment',
                                    'Spam or Commercial Activity',
                                    'Other'
                                ].map(reason => (
                                    <button
                                        key={reason}
                                        onClick={() => setReportReason(reason)}
                                        className={`w-full text-left px-5 py-4 rounded-2xl border transition-all ${
                                            reportReason === reason 
                                            ? 'bg-red-500/10 border-red-500/50 text-red-400' 
                                            : 'bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/[0.06]'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold">{reason}</span>
                                            {reportReason === reason && <div className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleReport()}
                                    disabled={!reportReason || isSubmitting}
                                    className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30"
                                >
                                    Report Only
                                </button>
                                <button
                                    onClick={() => handleReport(true)}
                                    disabled={isSubmitting}
                                    className="flex-1 py-4 rounded-2xl bg-red-500 text-black text-xs font-black uppercase tracking-widest hover:bg-red-400 transition-all shadow-[0_4px_15px_rgba(239,68,68,0.3)] disabled:opacity-30"
                                >
                                    Block & Report
                                </button>
                            </div>

                            <button
                                onClick={() => setReporting(false)}
                                className="w-full mt-4 py-2 text-[10px] font-bold text-white/20 hover:text-white/40 uppercase tracking-widest transition-colors"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
