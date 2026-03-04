'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, X } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════
   CONFIGURATION & DATA
   ═══════════════════════════════════════════════════════════════════ */

interface Language {
    code: string
    name: string
    nativeName: string
}

const LANGUAGES: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'zh-CN', name: 'Mandarin', nativeName: '简体中文' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
]

const COOKIE_NAME = 'googtrans'
const STORAGE_KEY = 'app_ui_lang'

/* ═══════════════════════════════════════════════════════════════════
   LANGUAGE SWITCHER COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentLang, setCurrentLang] = useState('en')
    const [isMobile, setIsMobile] = useState(false)

    // Initial load and event listeners
    useEffect(() => {
        if (typeof window === 'undefined') return

        const savedLang = localStorage.getItem(STORAGE_KEY)
        if (savedLang && savedLang !== 'en') {
            setCurrentLang(savedLang)
        }

        const handleResize = () => setIsMobile(window.innerWidth <= 640)
        handleResize()
        window.addEventListener('resize', handleResize)
        
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        window.addEventListener('keydown', handleEsc)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('keydown', handleEsc)
        }
    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue && e.newValue !== currentLang) {
                window.location.reload()
            }
        }
        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [currentLang])

    // Google Translate Initialization
    useEffect(() => {
        if (typeof window === 'undefined') return

        if (!window.google?.translate) {
            const addScript = document.createElement('script')
            addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit')
            document.body.appendChild(addScript)
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement({ 
                    pageLanguage: 'en', 
                    autoDisplay: false,
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE 
                }, 'google_translate_element')
            }
        }

        const style = document.createElement('style')
        style.innerHTML = `
            .goog-te-banner-frame, .goog-te-balloon-frame, .skiptranslate, #goog-gt-tt, .goog-te-gadget-icon, .goog-te-menu-value img { display: none !important; }
            body { top: 0 !important; }
            .goog-text-highlight { background: transparent !important; box-shadow: none !important; }
            #google_translate_element { display: none !important; }
        `
        document.head.appendChild(style)
    }, [])

    const toggleModal = () => setIsOpen(!isOpen)

    const selectLanguage = useCallback((langCode: string) => {
        if (langCode === currentLang) {
            setIsOpen(false)
            return
        }

        setCurrentLang(langCode)
        localStorage.setItem(STORAGE_KEY, langCode)

        const domain = window.location.hostname
        const cookieValue = `/en/${langCode}`
        
        document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`
        document.cookie = `${COOKIE_NAME}=${cookieValue}; path=/;`
        document.cookie = `${COOKIE_NAME}=${cookieValue}; path=/; domain=.${domain};`

        setIsOpen(false)
        setTimeout(() => window.location.reload(), 400)
    }, [currentLang])

    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [scrollState, setScrollState] = useState<{ direction: 'up' | 'down' | null }>({ direction: null })

    // Outside click logic
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    useEffect(() => {
        if (!scrollState.direction || !scrollRef.current) return
        
        let animationFrame: number
        const scroll = () => {
            if (!scrollRef.current) return
            const speed = 4
            if (scrollState.direction === 'up') {
                scrollRef.current.scrollTop -= speed
            } else {
                scrollRef.current.scrollTop += speed
            }
            animationFrame = requestAnimationFrame(scroll)
        }
        
        animationFrame = requestAnimationFrame(scroll)
        return () => cancelAnimationFrame(animationFrame)
    }, [scrollState])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return
        const rect = scrollRef.current.getBoundingClientRect()
        const relativeY = e.clientY - rect.top
        const threshold = 40

        if (relativeY < threshold) {
            setScrollState({ direction: 'up' })
        } else if (relativeY > rect.height - threshold) {
            setScrollState({ direction: 'down' })
        } else {
            setScrollState({ direction: null })
        }
    }

    return (
        <div className="notranslate" translate="no" ref={containerRef}>
            <div id="google_translate_element" style={{ display: 'none' }} />

            <div className="fixed bottom-8 left-8 sm:bottom-6 sm:left-6 z-[2000] flex items-end">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={scrollRef}
                            initial={{ opacity: 0, y: 20, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, y: -12, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95, rotate: -1 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setScrollState({ direction: null })}
                            className="absolute bottom-full left-0 mb-3 w-[280px] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl origin-bottom-left no-scrollbar overflow-x-hidden"
                            style={{ 
                                maxHeight: '420px', 
                                overflowY: 'auto'
                            }}
                        >
                            {/* Fixed Header */}
                            <div className="sticky top-0 left-0 right-0 px-5 pt-5 pb-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 z-20 flex items-center justify-between">
                                <motion.div 
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-tinder-coral animate-pulse" />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em] select-none">
                                        Translator
                                    </span>
                                </motion.div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-white/20 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="p-5 pt-4 grid grid-cols-2 gap-2.5">
                                {LANGUAGES.map((lang, idx) => {
                                    const isActive = currentLang === lang.code
                                    return (
                                        <motion.button
                                            key={lang.code}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.02 }}
                                            onClick={() => selectLanguage(lang.code)}
                                            className={`
                                                flex flex-col items-start p-3 rounded-2xl border transition-all duration-300 text-left relative group/item
                                                ${isActive 
                                                    ? 'bg-linear-to-br from-[#FE3C72]/20 to-[#FE3C72]/5 border-[#FE3C72]/40 text-[#FE3C72] shadow-[0_0_20px_rgba(254,60,114,0.15)]' 
                                                    : 'bg-white/3 border-white/5 text-white/60 hover:bg-white/8 hover:border-white/20 hover:text-white hover:shadow-xl hover:shadow-black/20'
                                                }
                                            `}
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            {/* Hover Glow Effect */}
                                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                                            
                                            <span className="text-[11px] font-black tracking-tight relative z-10">
                                                {lang.nativeName}
                                            </span>
                                            <span className="text-[9px] font-bold opacity-30 group-hover/item:opacity-50 transition-opacity leading-none mt-1 uppercase tracking-wider relative z-10">
                                                {lang.name}
                                            </span>

                                            {isActive && (
                                                <motion.div 
                                                    layoutId="active-lang-glow"
                                                    className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#FE3C72]/10 to-transparent pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={toggleModal}
                    aria-label="Open language selector"
                    className="relative flex items-center justify-center transition-all duration-300"
                    style={{
                        width: isMobile ? '48px' : '52px',
                        height: isMobile ? '48px' : '52px',
                        borderRadius: '1.2rem',
                        background: 'rgba(254, 60, 114, 0.95)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(254, 60, 114, 0.3)'
                    }}
                    whileHover={{ 
                        scale: 1.05,
                        rotate: 5,
                        backgroundColor: 'rgba(254, 60, 114, 1)',
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={isOpen ? { rotate: 90, y: 0 } : {
                        y: [0, -4, 0],
                        boxShadow: [
                            '0 8px 32px rgba(254, 60, 114, 0.3)',
                            '0 8px 40px rgba(254, 60, 114, 0.5)',
                            '0 8px 32px rgba(254, 60, 114, 0.3)'
                        ]
                    }}
                    transition={{
                        boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotate: { type: 'spring', stiffness: 260, damping: 20 }
                    }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? -90 : 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        <Globe className="w-5 h-5 text-white" />
                    </motion.div>
                </motion.button>
            </div>

            <style jsx global>{`
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                }
            `}</style>
        </div>
    )
}

declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google: {
            translate: {
                TranslateElement: {
                    new (config: unknown, elementId: string): void;
                    InlineLayout: {
                        SIMPLE: number;
                    };
                };
            }
        };
    }
}
