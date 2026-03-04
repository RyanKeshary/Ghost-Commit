'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtextRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                skewY: 10,
                stagger: 0.1,
            })
                .from(subtextRef.current, {
                    y: 50,
                    opacity: 0,
                }, '-=1')
                .from(ctaRef.current, {
                    scale: 0.8,
                    opacity: 0,
                }, '-=1.2')

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
            <div className="z-10 text-center max-w-5xl">
                <h1 ref={titleRef} className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] text-glow">
                    YOUR NEXT <span className="text-neon-purple">TEAMMATE</span> IS CLOSER THAN YOU THINK.
                </h1>

                <p ref={subtextRef} className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                    GhostCommit: For finding the teammate who actually replies to your messages. (unlike..)
                </p>

                <div ref={ctaRef} className="flex flex-wrap justify-center gap-6">
                    <Link
                        href="/matches"
                        className="glass px-10 py-5 rounded-full flex items-center gap-3 text-xl font-bold hover:scale-105 transition-transform group neon-glow-purple"
                    >
                        Start Matching
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>

                    <Link
                        href="/swipe"
                        className="glass bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan px-10 py-5 rounded-full flex items-center gap-3 text-xl font-bold hover:bg-neon-cyan hover:text-white transition-all hover:scale-105 group shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                    >
                        Discovery Swipe
                        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </Link>

                    <Link
                        href="/teammates"
                        className="glass bg-white/5 border-white/10 text-white/50 px-10 py-5 rounded-full flex items-center gap-3 text-xl font-bold hover:bg-neon-pink hover:border-neon-pink/50 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,255,0.3)] transition-all hover:scale-105 group"
                    >
                        Manage Teammates
                        <Users className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white/0 via-white to-white/0" />
            </div>
        </section>
    )
}
