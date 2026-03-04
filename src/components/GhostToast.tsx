'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Ghost, Compass, Heart, Users, MessageSquare, Sparkles, Zap, Star, Info, Skull } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════
   TOAST DATA — Two pools:
   1. Guidance toasts  (shown first, helpful tips about the site)
   2. Easter egg toasts (rare, funny, teamerrorists vibes)
   ═══════════════════════════════════════════════════════════════════ */

type ToastType = 'guidance' | 'easter'

interface ToastData {
    id: string
    type: ToastType
    icon: typeof Ghost
    title: string
    message: string
    color: string       // tailwind gradient from
    duration?: number   // show time in ms
}

const GUIDANCE_TOASTS: Omit<ToastData, 'id'>[] = [
    // ── Core feature tips ──
    {
        type: 'guidance',
        icon: Compass,
        title: 'Discover Devs',
        message: 'Swipe right on developers you vibe with. Left to pass. It\'s that simple.',
        color: '#FF6B4A',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Heart,
        title: 'Match Made',
        message: 'When both of you swipe right — boom! You\'re matched. Start building together.',
        color: '#FE3C72',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Users,
        title: 'Build Your Squad',
        message: 'Head to the Team tab to manage your teammates and track project progress.',
        color: '#FF85A2',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: MessageSquare,
        title: 'Check Your Inbox',
        message: 'New match requests land in your Inbox. Don\'t leave them hanging!',
        color: '#FF6B4A',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Star,
        title: 'Complete Your Profile',
        message: 'Add your tech stack and bio — devs with complete profiles get 3x more matches.',
        color: '#FFD700',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Zap,
        title: 'Pro Tip',
        message: 'Use the "Browse Devs" feed to filter by tech stack and find your perfect match.',
        color: '#FF6B4A',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Info,
        title: 'Stay Active',
        message: 'Profiles that log in weekly rank higher in discovery. Show up, get matched.',
        color: '#FE3C72',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Sparkles,
        title: 'Hackathon Mode',
        message: 'Need a team fast? Set your status to "Looking for Hackathon Team" in profile.',
        color: '#FF85A2',
        duration: 6000,
    },
    // ── Navigation & Discovery ──
    {
        type: 'guidance',
        icon: Compass,
        title: 'Swipe to Discover',
        message: 'Hit the Discover tab in the navbar to enter swipe mode and find your next teammate.',
        color: '#FF6B4A',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Star,
        title: 'Skill Tags Matter',
        message: 'The more skills you add to your profile, the better our matching algorithm works.',
        color: '#FFD700',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Users,
        title: 'Teammates Page',
        message: 'Already matched? Visit the Team page to see everyone you\'ve connected with.',
        color: '#FF85A2',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Heart,
        title: 'It\'s a Two-Way Street',
        message: 'You only match when BOTH sides swipe right. No pressure, no awkwardness.',
        color: '#FE3C72',
        duration: 6000,
    },
    // ── Profile & Identity ──
    {
        type: 'guidance',
        icon: Info,
        title: 'Your Dev Identity',
        message: 'Scroll down to the Profile section to set up your developer card — your campus rep.',
        color: '#FF6B4A',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Zap,
        title: 'Sign In First',
        message: 'Click "Sign In" or "Get Started" to create your account with Google. Takes 2 seconds.',
        color: '#FE3C72',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Sparkles,
        title: 'Browse Before You Swipe',
        message: 'Check out the dev feed on the homepage to preview profiles before entering swipe mode.',
        color: '#FF85A2',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Star,
        title: 'Add a Bio',
        message: 'A short bio goes a long way. Tell people what you\'re building and what excites you.',
        color: '#FFD700',
        duration: 6000,
    },
    // ── Engagement & Social ──
    {
        type: 'guidance',
        icon: MessageSquare,
        title: 'Don\'t Ghost Your Matches',
        message: 'Ironic for GhostCommit, but seriously — reply to your match requests!',
        color: '#FF6B4A',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Users,
        title: 'The More The Merrier',
        message: 'GhostCommit works best when your whole campus is on it. Share it with your class!',
        color: '#FF85A2',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Compass,
        title: 'How It Works',
        message: 'Scroll to the "How It Works" section for a quick 3-step walkthrough of the platform.',
        color: '#FE3C72',
        duration: 6000,
    },
    {
        type: 'guidance',
        icon: Zap,
        title: 'Quick Match',
        message: 'Average match time is under 48 hours. Your next teammate is closer than you think.',
        color: '#FF6B4A',
        duration: 6000,
    },
]

const EASTER_EGG_TOASTS: Omit<ToastData, 'id'>[] = [
    {
        type: 'easter',
        icon: Skull,
        title: '💀 teamerrorists',
        message: 'This site was built by teamerrorists. We terrorize codebases.',
        color: '#FF6B4A',
        duration: 7000,
    },
    {
        type: 'easter',
        icon: Ghost,
        title: '🧱 Wall Kissr Alert',
        message: 'Someone kissed a wall for motivation. It worked. Ship it.',
        color: '#FF85A2',
        duration: 7000,
    },
    {
        type: 'easter',
        icon: Ghost,
        title: '🧱 Wall of Fame',
        message: '"Wall kissing" increases commit frequency by 420%.',
        color: '#FF6B4A',
        duration: 7000,
    },
    {
        type: 'easter',
        icon: Skull,
        title: '🧱 Ragebait Loading...',
        message: '"HTML is a programming language" — Sending to your CS prof.',
        color: '#FE3C72',
        duration: 7000,
    },
    {
        type: 'easter',
        icon: Skull,
        title: '🔥 Veer Mode: ON',
        message: 'Veer stares at the code until it confesses its sins.',
        color: '#FF6B4A',
        duration: 7000,
    },
    {
        type: 'easter',
        icon: Ghost,
        title: '💀 Squad Assembled',
        message: 'Ryan, Shreyash, Himanshu, Veer — four devs, one brain cell, zero sleep.',
        color: '#FF85A2',
        duration: 7000,
    },
]

/* ═══════════════════════════════════════════════════════════════════
   SHUFFLE UTIL
   ═══════════════════════════════════════════════════════════════════ */
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

/* ═══════════════════════════════════════════════════════════════════
   TOAST COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function GhostToast() {
    const [toasts, setToasts] = useState<ToastData[]>([])
    const shownCountRef = useRef(0)
    const guidanceQueueRef = useRef<Omit<ToastData, 'id'>[]>([])
    const easterQueueRef = useRef<Omit<ToastData, 'id'>[]>([])
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Init queues
    useEffect(() => {
        guidanceQueueRef.current = shuffle(GUIDANCE_TOASTS)
        easterQueueRef.current = shuffle(EASTER_EGG_TOASTS)
    }, [])

    const addToast = useCallback(() => {
        shownCountRef.current++
        const count = shownCountRef.current

        // Easter egg logic: ~20% chance after the first 2 toasts
        const isEaster = count > 2 && Math.random() < 0.2

        let toastData: Omit<ToastData, 'id'> | undefined

        if (isEaster && easterQueueRef.current.length > 0) {
            toastData = easterQueueRef.current.shift()
            // Refill if empty
            if (easterQueueRef.current.length === 0) {
                easterQueueRef.current = shuffle(EASTER_EGG_TOASTS)
            }
        } else {
            if (guidanceQueueRef.current.length > 0) {
                toastData = guidanceQueueRef.current.shift()
            }
            // Refill if empty
            if (guidanceQueueRef.current.length === 0) {
                guidanceQueueRef.current = shuffle(GUIDANCE_TOASTS)
            }
        }

        if (!toastData) return

        const newToast: ToastData = {
            ...toastData,
            id: `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        }

        setToasts(prev => [...prev.slice(-2), newToast]) // max 3 visible

        // Auto remove
        const removeDelay = newToast.duration || 6000
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== newToast.id))
        }, removeDelay)

    }, [])

    const dismiss = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    // Timer-based toast spawning
    useEffect(() => {
        // First toast after 6 seconds
        const initialDelay = setTimeout(() => {
            addToast()
            // Then every 45-100 seconds
            const spawnNext = () => {
                const delay = 45000 + Math.random() * 55000 // 45-100s
                timerRef.current = setTimeout(() => {
                    addToast()
                    spawnNext()
                }, delay)
            }
            spawnNext()
        }, 6000)

        return () => {
            clearTimeout(initialDelay)
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [addToast])

    return (
        <div className="fixed bottom-6 right-6 z-9999 flex flex-col-reverse gap-3 items-end pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => {
                    const Icon = toast.icon
                    const isEaster = toast.type === 'easter'

                    return (
                        <motion.div
                            key={toast.id}
                            layout
                            initial={{ opacity: 0, x: 120, scale: 0.8, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 80, scale: 0.85, filter: 'blur(4px)' }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                                mass: 0.8,
                            }}
                            className="pointer-events-auto max-w-[340px] w-full"
                        >
                            <div
                                className={`
                                    relative overflow-hidden rounded-2xl
                                    ${isEaster
                                        ? 'bg-[#1a1a1a]/95 border border-white/10'
                                        : 'bg-[#1a1a1a]/90 border border-white/8'
                                    }
                                    backdrop-blur-2xl
                                    shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_1px_rgba(255,255,255,0.1)]
                                `}
                            >
                                {/* Top gradient line */}
                                <div
                                    className="h-[2px] w-full"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, ${toast.color}80, transparent)`,
                                    }}
                                />

                                {/* Ambient glow */}
                                <div
                                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none"
                                    style={{ backgroundColor: toast.color }}
                                />

                                {/* Content */}
                                <div className="relative p-4 flex gap-3">
                                    {/* Icon */}
                                    <div
                                        className={`
                                            shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                                            ${isEaster ? 'animate-pulse' : ''}
                                        `}
                                        style={{
                                            background: `linear-gradient(135deg, ${toast.color}25, ${toast.color}10)`,
                                            border: `1px solid ${toast.color}30`,
                                        }}
                                    >
                                        <Icon
                                            className="w-5 h-5"
                                            style={{ color: toast.color }}
                                            strokeWidth={2}
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className="text-[13px] font-bold text-white truncate">
                                                {toast.title}
                                            </h4>
                                            {isEaster && (
                                                <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-bold uppercase tracking-[0.15em] text-white/30">
                                                    Easter Egg
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[12px] leading-relaxed text-white/45">
                                            {toast.message}
                                        </p>
                                    </div>

                                    {/* Close */}
                                    <button
                                        onClick={() => dismiss(toast.id)}
                                        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-white/60 hover:bg-white/5 transition-all duration-150"
                                        aria-label="Dismiss"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Progress bar (auto-dismiss timer) */}
                                <div className="h-[2px] w-full relative overflow-hidden bg-white/3">
                                    <motion.div
                                        initial={{ width: '100%' }}
                                        animate={{ width: '0%' }}
                                        transition={{
                                            duration: (toast.duration || 6000) / 1000,
                                            ease: 'linear',
                                        }}
                                        className="absolute inset-y-0 left-0"
                                        style={{
                                            background: `linear-gradient(90deg, ${toast.color}60, ${toast.color}20)`,
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
