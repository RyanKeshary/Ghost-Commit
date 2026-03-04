'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RefreshCcw, WifiOff, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">
            {/* Background Glitch Elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#FE3C72] to-transparent animate-[glitch-line_3s_infinite]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 max-w-lg w-full"
            >
                {/* Visual Representation */}
                <div className="relative mb-8 flex justify-center">
                    <motion.div
                        animate={{ 
                            rotate: [0, 1, -1, 0],
                            x: [0, 2, -2, 0]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                        className="relative w-64 h-64 sm:w-72 sm:h-72"
                    >
                        <Image
                            src="/error-ghost.png"
                            alt="Error Ghost"
                            fill
                            className="object-contain grayscale brightness-90 shadow-2xl shadow-red-500/20"
                            priority
                        />
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full" />
                </div>

                {/* Text Content */}
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight uppercase flex items-center justify-center gap-4">
                    <WifiOff className="w-10 h-10 text-[#FE3C72]" />
                    Build Crashed
                </h1>
                <p className="text-white/50 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
                    Something went wrong on our end. The ghost in the machine is misbehaving. We&apos;re trying to push a fix!
                </p>

                {/* Error Console Code block */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-10 text-left font-mono text-sm overflow-hidden relative group">
                    <div className="flex gap-1.5 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <p className="text-[#FE3C72]/80 mb-1">$ ERROR_TYPE: SYSTEM_ANOMALY</p>
                    <p className="text-white/30 truncate">
                        {error.message || "An unexpected error occurred during the render cycle."}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05, rotate: -1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => reset()}
                        className="w-full sm:w-auto px-10 py-4 bg-[#FE3C72] text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-[#FE3C72]/30 transition-all hover:bg-[#ff4d7f]"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Try Again
                    </motion.button>
                    
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                        >
                            <Terminal className="w-5 h-5 text-white/40" />
                            Emergency Exit
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            <style jsx global>{`
                @keyframes glitch-line {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `}</style>
        </div>
    )
}
