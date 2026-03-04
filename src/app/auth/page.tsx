'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Lock, Mail, ArrowRight } from 'lucide-react'

export default function AuthPage({ mode = 'login' }: { mode?: 'login' | 'signup' }) {
    const [isLogin, setIsLogin] = useState(mode === 'login')

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="text-4xl font-black italic tracking-tighter text-glow mb-4 inline-block">
                        GHOSTCOMMIT
                    </Link>
                    <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Join the Campus'}</h2>
                    <p className="text-white/40">{isLogin ? 'Your teammates are waiting.' : 'Find your next project partner today.'}</p>
                </div>

                <div className="glass p-8 rounded-[2rem] border-t-2 border-white/10">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                                    <User className="w-3 h-3" /> Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-purple"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                                <Mail className="w-3 h-3" /> Email
                            </label>
                            <input
                                type="email"
                                placeholder="college@edu.com"
                                className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-cyan"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                                <Lock className="w-3 h-3" /> Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full glass bg-white/5 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-neon-pink"
                            />
                        </div>

                        <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-neon-purple hover:text-white transition-all flex items-center justify-center gap-2">
                            {isLogin ? 'Sign In' : 'Create Account'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-8 border-t border-white/5">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-white/40 hover:text-white transition-colors text-sm"
                        >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
