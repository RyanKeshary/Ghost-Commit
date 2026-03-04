'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Ghost } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#FE3C72]/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#FF6B4A]/10 blur-[120px] rounded-full animate-pulse delay-700" />
            
            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-lg w-full"
            >
                {/* 404 Visual */}
                <div className="relative mb-8 flex justify-center">
                    <motion.div
                        animate={{ 
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative w-72 h-72 sm:w-80 sm:h-80"
                    >
                        <Image
                            src="/404-ghost.png"
                            alt="404 Ghost"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -top-4 -right-2 bg-[#FE3C72] text-white px-4 py-1.5 rounded-full font-black text-xl shadow-xl shadow-[#FE3C72]/30 rotate-12"
                    >
                        404
                    </motion.div>
                </div>

                {/* Text Content */}
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                    Commit Not Found
                </h1>
                <p className="text-white/50 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
                    Looks like this page ghosted us. Even our best developers couldn't fix this <span className="text-[#FE3C72] font-mono">merge conflict</span>.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 transition-shadow hover:shadow-2xl hover:shadow-white/20"
                        >
                            <Home className="w-5 h-5" />
                            Back to Base
                        </motion.button>
                    </Link>
                    
                    <Link href="/discover">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all hover:border-white/20"
                        >
                            <Compass className="w-5 h-5" />
                            Keep Exploring
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            {/* Breadcrumb Error Log Style Footer */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 font-mono text-xs text-white"
            >
                [ERROR_LOG]: STACK_TRACE_LOST_IN_SPACE // HEX: #GHOST
            </motion.div>
        </div>
    )
}

// Missing import used in the component
import { Compass } from 'lucide-react'
