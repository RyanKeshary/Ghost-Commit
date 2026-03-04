'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Ghost } from 'lucide-react'
import Logo from '@/components/Logo'

/**
 * Loading state for the entire app. 
 * High-end, "fun", and developer-focused.
 */
const MESSAGES = [
    "Summoning the ghost commits...",
    "Rebasing reality...",
    "Squashing the final bugs...",
    "Optimizing ghostly performance...",
    "Decrypting teammate potential...",
    "Compiling campus connections...",
    "Loading the dev afterlife...",
    "Pruning dead branches...",
    "Git-pushing into your view...",
    "Deploying ghost protocol..."
]

export default function Loading() {
    const [msgIndex, setMsgIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % MESSAGES.length)
        }, 1800)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden">
            {/* ── Background Grid ─────────────────────────── */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tinder-coral/10 blur-[120px] rounded-full animate-pulse-slow" />
            </div>

            {/* ── Main Animation ──────────────────────────── */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Floating Ghost Accent */}
                <motion.div
                    animate={{ 
                        x: [0, 40, -40, 0],
                        y: [0, -30, 30, 0],
                    }}
                    transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-32 left-0 opacity-20 pointer-events-none"
                >
                    <Ghost className="w-12 h-12 text-tinder-coral blur-sm" />
                </motion.div>

                {/* Logo + Ripple Effect */}
                <div className="relative">
                    {[0.6, 1.2, 1.8].map((delay, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [0.8, 2.5], opacity: [0.5, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: delay,
                                ease: "easeOut"
                            }}
                            className="absolute inset-0 rounded-full border border-tinder-coral/30"
                        />
                    ))}
                    
                    <motion.div
                        animate={{ 
                            y: [0, -10, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Logo size="lg" iconOnly />
                    </motion.div>
                </div>

                {/* Status Message */}
                <div className="mt-16 text-center h-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={msgIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            className="text-[11px] font-black text-white/50 uppercase tracking-[0.4em]"
                        >
                            {MESSAGES[msgIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Fancy Progress Bar */}
                <div className="mt-8 w-48 h-0.5 bg-white/5 rounded-full relative overflow-hidden">
                    <motion.div
                        animate={{
                            x: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 bg-linear-to-r from-transparent via-tinder-coral to-transparent"
                    />
                </div>
                
                <div className="mt-4 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.2, 1, 0.2]
                            }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                            className="w-1 h-1 rounded-full bg-tinder-orange"
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Versioning (Decorative) */}
            <div className="absolute bottom-12 left-0 right-0 text-center flex flex-col items-center gap-2 opacity-10">
                <div className="text-[10px] font-mono tracking-widest text-white">SYSTEM_INIT_COMPLETED_SUCCESSFULLY</div>
                <div className="text-[10px] font-mono text-white">GH_COMMIT_PROT_V2.0</div>
            </div>
        </div>
    )
}
