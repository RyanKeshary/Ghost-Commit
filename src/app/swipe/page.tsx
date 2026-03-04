'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, ExternalLink, Code2 } from 'lucide-react'
import Link from 'next/link'
import { useDevelopers } from '@/lib/DevelopersContext'
import Refresher from '@/components/Refresher'
import { RotateCcw } from 'lucide-react'

// Advanced swipeable card component
const SwipeCard = ({ dev, onSwipe, index, frontCard }: { dev: any, onSwipe: (dir: string) => void, index: number, frontCard: boolean }) => {
    const x = useMotionValue(0)

    // Scale down the cards behind the front one
    const scale = useTransform(x, [-150, 0, 150], [1, frontCard ? 1.05 : 0.95, 1])
    const rotate = useTransform(x, [-200, 200], [-10, 10])

    // Opacity of the Nope / Like indicators
    const nopeOpacity = useTransform(x, [-150, -50], [1, 0])
    const likeOpacity = useTransform(x, [50, 150], [0, 1])

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x < -100) onSwipe('left')
        else if (info.offset.x > 100) onSwipe('right')
    }

    return (
        <motion.div
            style={{
                x, rotate, scale,
                zIndex: 100 - index
            }}
            drag={frontCard ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0, y: 50 }}
            animate={{ scale: frontCard ? 1 : 0.95, opacity: 1, y: frontCard ? 0 : 20 * index }}
            exit={{ x: x.get(), opacity: 0, transition: { duration: 0.2 } }}
            whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
            className={`absolute w-full h-full p-2 max-w-sm mx-auto ${frontCard ? 'cursor-grab' : 'pointer-events-none'}`}
        >
            <div className="w-full h-full glass rounded-[2.5rem] overflow-hidden flex flex-col relative border border-white/10 shadow-2xl backdrop-blur-2xl">

                {/* Visual Indicators Layer */}
                <motion.div style={{ opacity: Math.max(0, nopeOpacity.get()) }} className="absolute top-8 right-8 z-20 pointer-events-none">
                    <div className="border-4 border-red-500 text-red-500 text-4xl font-black p-2 rounded-2xl rotate-12 bg-black/50 backdrop-blur-sm">NOPE</div>
                </motion.div>
                <motion.div style={{ opacity: Math.max(0, likeOpacity.get()) }} className="absolute top-8 left-8 z-20 pointer-events-none">
                    <div className="border-4 border-neon-cyan text-neon-cyan text-4xl font-black p-2 rounded-2xl -rotate-12 bg-black/50 backdrop-blur-sm">MATCH</div>
                </motion.div>

                {/* Profile Banner */}
                <div className="h-2/5 bg-gradient-to-b from-neon-purple/50 to-transparent relative p-6 flex flex-col justify-end">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-neon-pink to-neon-purple mx-auto border-4 border-[#0a0a0a] flex items-center justify-center font-black text-4xl shadow-[0_0_30px_rgba(255,0,255,0.5)]">
                        {dev.name[0]}
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black tracking-tight">{dev.name}</h2>
                        <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mt-1">
                            {dev.role} • Sem {dev.semester}
                        </p>
                    </div>

                    <p className="text-white/80 text-center text-sm leading-relaxed italic mb-8 flex-1 flex items-center justify-center">
                        "{dev.bio}"
                    </p>

                    <div className="mb-6 h-32 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                            <Code2 className="w-4 h-4" /> Tech Stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {dev.skills.map((s: string) => (
                                <span key={s} className="px-3 py-1.5 bg-black/50 border border-white/10 rounded-xl text-xs font-bold tracking-wider text-neon-cyan">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function SwipeDiscovery() {
    const { developers: allDevs } = useDevelopers()
    // Local copy for the stack interaction so we don't mutate global state visually
    const [devs, setDevs] = useState(allDevs)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const resetStack = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setDevs(allDevs)
            setIsRefreshing(false)
        }, 1500)
    }

    const handleSwipe = (dir: string) => {
        // Pop the top card
        setDevs(prev => prev.slice(1))

        if (dir === 'right') {
            // Trigger confetti/match state in a real app
            console.log('Match!')
        }
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center relative">
            <Refresher isVisible={isRefreshing} message="Re-summoning developers..." />

            <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white font-bold flex items-center gap-2 group z-50">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Hub
            </Link>

            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 w-full max-w-sm h-[700px] flex items-center justify-center -mt-10">
                <AnimatePresence>
                    {devs.map((dev, index) => (
                        <SwipeCard
                            key={dev.id}
                            dev={dev}
                            index={index}
                            frontCard={index === 0}
                            onSwipe={handleSwipe}
                        />
                    ))}
                </AnimatePresence>

                {devs.length === 0 && (
                    <div className="text-center animate-pulse">
                        <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center text-6xl mx-auto mb-6">
                            📡
                        </div>
                        <h2 className="text-2xl font-black mb-2 tracking-widest uppercase">No more devs</h2>
                        <p className="text-white/40 text-sm mb-8">You've swiped through the whole campus.</p>
                        
                        <button
                            onClick={resetStack}
                            className="group px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all font-black uppercase text-[10px] tracking-widest mx-auto"
                        >
                            <RotateCcw className="w-4 h-4 text-tinder-coral group-hover:rotate-180 transition-transform duration-500" />
                            Start Over
                        </button>
                    </div>
                )}
            </div>

            <div className="absolute bottom-12 flex items-center gap-8 z-20">
                <button
                    onClick={() => handleSwipe('left')}
                    hidden={devs.length === 0}
                    className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-110 shrink-0"
                >
                    <X className="w-8 h-8" />
                </button>
                <div className="px-6 py-2 rounded-full glass border border-white/5 text-xs font-bold tracking-[0.2em] text-white/30 uppercase">
                    Discovery Mode
                </div>
                <button
                    onClick={() => handleSwipe('right')}
                    hidden={devs.length === 0}
                    className="w-16 h-16 rounded-full bg-neon-cyan/10 border-2 border-neon-cyan/30 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all hover:scale-110 shrink-0"
                >
                    <Heart className="w-8 h-8" />
                </button>
            </div>

        </main>
    )
}
