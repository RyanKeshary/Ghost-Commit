'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Ghost } from 'lucide-react'

interface LogoProps {
    className?: string
    showText?: boolean
    iconOnly?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', showText = true, iconOnly = false, size = 'md' }: LogoProps) {
    const sizes = {
        sm: { icon: 'w-4 h-4', box: 'w-8 h-8', text: 'text-sm', gap: 'gap-2' },
        md: { icon: 'w-6 h-6', box: 'w-11 h-11', text: 'text-[18px]', gap: 'gap-3' },
        lg: { icon: 'w-9 h-9', box: 'w-16 h-16', text: 'text-2xl', gap: 'gap-4' },
    }

    const s = sizes[size]

    return (
        <div className={`flex items-center ${s.gap} group shrink-0 ${className}`}>
            <div className="relative">
                {/* ── Main Logo Container ────────────────── */}
                <motion.div 
                    className={`${s.box} rounded-[1.2rem] bg-linear-to-br from-tinder-coral via-tinder-orange to-tinder-pink flex items-center justify-center relative z-10 overflow-hidden shadow-2xl shadow-tinder-coral/20`}
                    style={{
                        padding: '1px', // for the border effect
                    }}
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                    {/* Interior Glass Layer */}
                    <div className="absolute inset-px rounded-[1.1rem] bg-black/10 backdrop-blur-md overflow-hidden flex items-center justify-center">
                        {/* Mesh Gradient Background */}
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#FE3C72_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#FF6B4A_0%,transparent_50%)]" />
                        
                        {/* Animated Shine */}
                        <motion.div 
                            className="absolute inset-0 bg-linear-to-tr from-transparent via-white/30 to-transparent -translate-x-full"
                            animate={{ translateX: ['150%', '-150%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />

                        {/* The Icon: Custom Ghost + Commit Node */}
                        <div className="relative">
                            <Ghost className={`${s.icon} text-white drop-shadow-xl`} strokeWidth={2.5} />
                            
                            {/* Commit Node Accent */}
                            <motion.div 
                                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-white shadow-lg border border-tinder-coral flex items-center justify-center"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-1 h-1 rounded-full bg-tinder-coral" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Ambient Glow */}
                <div className="absolute -inset-2 rounded-3xl bg-tinder-coral/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {showText && !iconOnly && (
                <div className="flex flex-col leading-none select-none">
                    <div className="flex items-center gap-1">
                        <span className={`${s.text} font-black tracking-tight text-white uppercase`}>
                            Ghost
                        </span>
                        <span className={`${s.text} font-black tracking-tight bg-linear-to-r from-tinder-coral to-tinder-orange bg-clip-text text-transparent uppercase`}>
                            Commit
                        </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 opacity-40">
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
                            Pulse of Devs
                        </span>
                        <div className="h-px w-8 bg-white/20" />
                    </div>
                </div>
            )}
        </div>
    )
}
