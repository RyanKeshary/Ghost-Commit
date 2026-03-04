'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Compass, Home, Menu, X, ArrowRight, User, LogOut, Settings, Sparkles } from 'lucide-react'
import Logo from './Logo'

const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/discover', label: 'People', icon: Compass },
    { href: '/swipe', label: 'Swipe', icon: Sparkles },
    { href: '/matches', label: 'Matches', icon: MessageSquare },
]

// Pages that have their own headers — hide navbar on these
const HIDE_ON = ['/swipe', '/matches', '/auth']

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const lastScrollRef = useRef(0)
    const userMenuRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    const { data: session } = useSession()

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            setScrolled(y > 20)
            if (y > lastScrollRef.current && y > 120) {
                setHidden(true)
            } else {
                setHidden(false)
            }
            lastScrollRef.current = y
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close user menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Don't render on pages that manage their own header
    if (HIDE_ON.includes(pathname)) return null

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className={`fixed top-0 left-0 right-0 z-100 transition-colors duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-2xl' : ''}`}
            >
                {/* Top safe-area spacer */}
                <div className={`transition-all duration-500 ease-out ${scrolled ? 'pt-2 px-4 sm:px-6 lg:px-8' : 'pt-3 px-4 sm:px-6 lg:px-8'}`}>
                    <nav className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ease-out ${scrolled
                        ? 'px-2 sm:px-4 py-2.5 backdrop-blur-2xl'
                        : 'px-2 sm:px-4 py-3'
                        }`}>

                        <Link href="/">
                            <Logo size="md" />
                        </Link>

                        {/* ─── Center Nav Links — desktop ─── */}
                        <div className="hidden md:flex items-center gap-0.5 bg-white/3 rounded-full p-1 border border-white/6">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                const Icon = link.icon
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative flex items-center gap-1.5 px-4 py-1.75 rounded-full text-[13px] font-semibold tracking-wide transition-colors duration-200 ${isActive
                                            ? 'text-white'
                                            : 'text-white/35 hover:text-white/60'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-white/8 rounded-full border border-white/8"
                                                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                            />
                                        )}
                                        <Icon className="w-3.5 h-3.5 relative z-10" strokeWidth={2} />
                                        <span className="relative z-10">{link.label}</span>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* ─── Right Side ─── */}
                        <div className="flex items-center gap-3 shrink-0">

                            {session?.user ? (
                                /* Authenticated user menu */
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2.5 p-1 pr-3 rounded-full bg-white/4 border border-white/8 hover:bg-white/8 transition-all duration-200"
                                    >
                                        <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white/5 border border-white/8">
                                            {session.user.image ? (
                                                <Image src={session.user.image} alt="" fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <User className="w-3.5 h-3.5 text-white/30" />
                                                </div>
                                            )}
                                        </div>
                                        <span className="hidden sm:block text-[13px] font-semibold text-white/60 max-w-[100px] truncate">
                                            {session.user.name?.split(' ')[0] || 'Profile'}
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {userMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                                            >
                                                {/* User info header */}
                                                <div className="p-3 border-b border-white/6">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/5 border border-white/8">
                                                            {session.user.image ? (
                                                                <Image src={session.user.image} alt="" fill className="object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <User className="w-4 h-4 text-white/30" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="truncate">
                                                            <p className="text-sm font-semibold truncate">{session.user.name}</p>
                                                            <p className="text-[10px] text-white/25 truncate">{session.user.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Menu items */}
                                                <div className="p-1">
                                                    <Link
                                                        href="/profile"
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
                                                    >
                                                        <Settings className="w-4 h-4" /> Edit Profile
                                                    </Link>
                                                    <Link
                                                        href={`/u/${session.user.id}`}
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all"
                                                    >
                                                        <User className="w-4 h-4" /> View Public Profile
                                                    </Link>
                                                </div>

                                                <div className="p-1 border-t border-white/6">
                                                    <button
                                                        onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: '/' }) }}
                                                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
                                                    >
                                                        <LogOut className="w-4 h-4" /> Sign Out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                /* Not authenticated */
                                <>
                                    <Link
                                        href="/auth"
                                        className="hidden sm:block px-4 py-2 text-[13px] font-medium text-white/40 hover:text-white/80 transition-colors duration-200"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/auth"
                                        className="hidden sm:flex items-center gap-1.5 px-5 py-2 bg-linear-to-r from-tinder-coral to-tinder-orange rounded-full text-[13px] font-bold text-white shadow-lg shadow-tinder-coral/25 hover:shadow-tinder-coral/40 hover:brightness-110 active:scale-[0.97] transition-all duration-200"
                                    >
                                        Get Started
                                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                                    </Link>
                                </>
                            )}

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 active:scale-95 transition-all duration-150"
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-99 bg-black/70 backdrop-blur-md md:hidden"
                        onClick={() => setMobileOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -16, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -16, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="mt-20 mx-3 rounded-2xl p-3 bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="space-y-0.5">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href
                                    const Icon = link.icon
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-150 ${isActive
                                                ? 'bg-white/8 text-white'
                                                : 'text-white/45 hover:text-white hover:bg-white/4'
                                                }`}
                                        >
                                            <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-tinder-coral' : ''}`} strokeWidth={2} />
                                            {link.label}
                                        </Link>
                                    )
                                })}
                            </div>

                            <div className="pt-3 mt-2 border-t border-white/6 flex gap-2">
                                {session?.user ? (
                                    <>
                                        <Link
                                            href="/profile"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex-1 text-center py-2.5 rounded-xl text-[13px] font-semibold text-white/50 hover:text-white bg-white/4 border border-white/6 transition-all duration-150"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }) }}
                                            className="flex-1 text-center py-2.5 rounded-xl text-[13px] font-semibold text-red-400/60 hover:text-red-400 bg-red-500/[0.05] border border-red-500/10 transition-all duration-150"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/auth"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex-1 text-center py-2.5 rounded-xl text-[13px] font-semibold text-white/50 hover:text-white bg-white/4 border border-white/6 transition-all duration-150"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href="/auth"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex-1 text-center py-2.5 rounded-xl text-[13px] font-bold text-white bg-linear-to-r from-tinder-coral to-tinder-orange shadow-lg shadow-tinder-coral/20 transition-all duration-150"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
