'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Ghost, RefreshCw } from 'lucide-react'

interface RefresherProps {
    isVisible: boolean
    message?: string
}

/**
 * A fun, high-end "Refreshing" overlay component.
 * Can be triggered during manual data refreshes or search updates.
 */
export default function Refresher({ isVisible, message = "Haunting the latest commits..." }: RefresherProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-999 bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 1.1, opacity: 0, y: -20 }}
                        className="glass-strong p-10 rounded-[2.5rem] border border-white/10 flex flex-col items-center max-w-sm w-full relative overflow-hidden"
                    >
                        {/* ── Background Pulse ──────────────────────── */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-tinder-coral/20 blur-3xl rounded-full animate-pulse" />
                        </div>

                        {/* ── Animated Icon ─────────────────────────── */}
                        <div className="relative z-10 mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border border-tinder-coral/20 rounded-full border-t-tinder-coral"
                            />
                            <motion.div
                                animate={{ 
                                    y: [0, -8, 0],
                                    rotateY: [0, 180, 360]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl"
                            >
                                <Ghost className="w-8 h-8 text-tinder-coral" />
                            </motion.div>
                        </div>

                        {/* ── Text ──────────────────────────────────── */}
                        <div className="text-center relative z-10">
                            <h3 className="text-lg font-black tracking-tight mb-2 uppercase italic text-glow">
                                Refreshing
                            </h3>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">
                                {message}
                            </p>
                        </div>

                        {/* ── Animated Dots ─────────────────────────── */}
                        <div className="mt-8 flex gap-1.5">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ 
                                        opacity: [0.3, 1, 0.3],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-1 h-1 rounded-full bg-tinder-orange"
                                />
                            ))}
                        </div>
                        
                        <div className="mt-8 opacity-10 flex items-center gap-2">
                             <RefreshCw className="w-3 h-3 animate-spin" />
                             <span className="text-[8px] font-mono tracking-tighter">PROTOCOL_RESYNC_ACTIVE</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
