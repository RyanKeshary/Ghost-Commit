'use client'

import React, { useState } from 'react'
import Refresher from '@/components/Refresher'
import { motion } from 'framer-motion'
import { RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export default function RefreshDemo() {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const triggerRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => setIsRefreshing(false), 3000)
    }

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-white">
            <Refresher isVisible={isRefreshing} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-[3rem] border-t border-white/10 flex flex-col items-center gap-8 max-w-md w-full"
            >
                <div className="text-center">
                    <h1 className="text-4xl font-black italic tracking-tighter mb-4 text-glow">RE_FRESH</h1>
                    <p className="text-white/40 text-sm">Experience the premium ghost protocol sync.</p>
                </div>

                <div className="w-full h-px bg-white/5" />

                <button
                    onClick={triggerRefresh}
                    disabled={isRefreshing}
                    className="group relative px-8 py-4 bg-tinder-coral rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                    <RefreshCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Trigger Refresh
                </button>

                <Link href="/" className="text-[10px] font-bold text-white/20 hover:text-white/40 uppercase tracking-widest transition-colors">
                    Back to Terminal
                </Link>
            </motion.div>

            <div className="mt-12 text-[10px] font-mono text-white/10 uppercase tracking-[0.5em]">
                GhostCommit Premium Assets
            </div>
        </div>
    )
}
