'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    Heart,
    Github,
    Twitter,
    Linkedin,
    ArrowUpRight,
    ChevronUp,
} from 'lucide-react'
import Logo from './Logo'

/* ── Type ─────────────────────────────────────────────────── */
type IconComponent = React.ComponentType<{ className?: string }>

/* ── Social Icon ─────────────────────────────────────────── */
function SocialIcon({ href, icon: Icon, label }: { href: string; icon: IconComponent; label: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-tinder-coral hover:bg-tinder-coral/15 hover:border-tinder-coral/30 transition-all duration-200"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
        >
            <Icon className="w-4 h-4" />
        </motion.a>
    )
}

/* ── Inline link ─────────────────────────────────────────── */
function FooterLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="group inline-flex items-center gap-0.5 text-xs text-white/50 hover:text-tinder-coral transition-colors duration-200 font-medium"
        >
            {children}
            {external && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
        </a>
    )
}

/* ═══════════════════════════════════════════════════════════
   COMPACT FOOTER — high-contrast, two-row design
   ═══════════════════════════════════════════════════════════ */
export default function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const isInView = useInView(footerRef, { once: true, margin: '-50px' })
    const year = new Date().getFullYear()

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <footer ref={footerRef} className="relative mt-8">
            {/* ── Gradient divider ─── */}
            <motion.div
                className="h-px bg-linear-to-r from-transparent via-tinder-coral/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
            />

            {/* ── Subtle ambient ─── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute bottom-0 left-1/3 w-[500px] h-[250px] rounded-full bg-tinder-coral/4 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="relative z-10 max-w-7xl mx-auto px-6"
            >
                {/* ═══ ROW 1: Brand + Nav + Socials ═══ */}
                <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Left: Brand */}
                    <Logo size="md" />

                    {/* Center: Nav links — all inline */}
                    <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <FooterLink href="#match">Browse Devs</FooterLink>
                        <span className="text-white/15">·</span>
                        <FooterLink href="#how-it-works">How It Works</FooterLink>
                        <span className="text-white/15">·</span>
                        <FooterLink href="#projects">Projects</FooterLink>
                        <span className="text-white/15">·</span>
                        <FooterLink href="#inbox">Inbox</FooterLink>
                        <span className="text-white/15">·</span>
                        <FooterLink href="#profile">Profile</FooterLink>
                        <span className="text-white/15">·</span>
                        <FooterLink href="https://github.com/shreyash3856O/ghostcommit" external>GitHub</FooterLink>
                    </nav>

                    {/* Right: Socials + Back to top */}
                    <div className="flex items-center gap-2.5">
                        <SocialIcon href="https://github.com/shreyash3856O/ghostcommit" icon={Github} label="GitHub" />
                        <SocialIcon href="https://twitter.com" icon={Twitter} label="Twitter" />
                        <SocialIcon href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />

                        <div className="w-px h-5 bg-white/10 mx-1" />

                        <motion.button
                            onClick={scrollToTop}
                            className="group w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-tinder-coral hover:border-tinder-coral/30 hover:bg-tinder-coral/15 transition-all duration-200"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.92 }}
                            aria-label="Back to top"
                        >
                            <ChevronUp className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>

                {/* ── Separator ─── */}
                <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

                {/* ═══ ROW 2: Credits ═══ */}
                <div className="py-6 flex items-center justify-center">
                    <div className="text-xs text-white/30 tracking-wide font-medium">
                        © {year} GhostCommit. All rights reserved.
                    </div>
                </div>
            </motion.div>
        </footer>
    )
}
