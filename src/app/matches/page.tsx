'use client'

import React, { useState } from 'react'
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react'
import Link from 'next/link'
import { useDevelopers } from '@/lib/DevelopersContext'

export default function MatchesPage() {
    const { developers } = useDevelopers()
    // Pre-populate with a couple active chats based on global devs, plus fallback
    const mockMatches = developers.slice(0, 3).map(d => ({
        id: d.id,
        name: d.name,
        role: d.role,
        lastMsg: 'Hey, saw your post! Are you still looking for a teammate?',
        time: 'Just now',
        unread: true,
        online: true
    }))

    const [activeChat, setActiveChat] = useState<string | null>(mockMatches[0]?.id || null)
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState<{ chatId: string, text: string, isSender: boolean }[]>([
        { chatId: mockMatches[0]?.id, text: "Hi! I saw your profile and I think we'd make a great team for the upcoming hackathon.", isSender: false },
        { chatId: mockMatches[0]?.id, text: "I'm mostly focused on the frontend right now.", isSender: false },
    ])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!messageText.trim() || !activeChat) return
        setMessages(prev => [...prev, { chatId: activeChat, text: messageText, isSender: true }])
        setMessageText('')
    }

    const activeUser = mockMatches.find(m => m.id === activeChat)

    return (
        <main className="min-h-screen bg-[#050505] text-white flex flex-col h-screen overflow-hidden">

            {/* Minimal Header */}
            <header className="h-16 border-b border-white/5 flex items-center px-6 shrink-0 bg-black/50 backdrop-blur-md z-10">
                <Link href="/" className="text-white/50 hover:text-white font-bold flex items-center gap-2 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Hub
                </Link>
                <div className="mx-auto flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <span className="font-black tracking-widest uppercase text-sm">Active Connections</span>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar constraints */}
                <aside className="w-80 border-r border-white/5 flex flex-col bg-black/20 shrink-0">
                    <div className="p-4 border-b border-white/5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search connections..."
                                className="w-full glass bg-white/5 py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-neon-purple/50 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {mockMatches.map(match => (
                            <button
                                key={match.id}
                                onClick={() => setActiveChat(match.id)}
                                className={`w-full text-left p-3 rounded-xl transition-all flex border ${activeChat === match.id
                                        ? 'bg-neon-purple/10 border-neon-purple/30 shadow-[0_0_15px_rgba(180,0,255,0.1)]'
                                        : 'border-transparent hover:bg-white/5'
                                    }`}
                            >
                                <div className="relative mr-3 shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center font-bold text-lg">
                                        {match.name[0]}
                                    </div>
                                    {match.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#050505]" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-Baseline mb-1">
                                        <h4 className="font-bold truncate pr-2">{match.name}</h4>
                                        <span className="text-[10px] text-white/40 shrink-0">{match.time}</span>
                                    </div>
                                    <p className={`text-xs truncate ${match.unread && activeChat !== match.id ? 'text-white font-bold' : 'text-white/50'}`}>
                                        {match.lastMsg}
                                    </p>
                                </div>
                                {match.unread && activeChat !== match.id && (
                                    <div className="w-2 h-2 rounded-full bg-neon-cyan self-center ml-2 shrink-0" />
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Chat Area */}
                <section className="flex-1 flex flex-col relative bg-[url('/noise.png')] bg-repeat opacity-95">
                    {activeChat && activeUser ? (
                        <>
                            {/* Chat Header */}
                            <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md shrink-0 z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center font-bold">
                                        {activeUser.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold leading-tight">{activeUser.name}</h3>
                                        <p className="text-[10px] text-neon-cyan uppercase tracking-widest font-bold">{activeUser.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-white/40">
                                    <button className="hover:text-neon-cyan transition-colors"><Phone className="w-5 h-5" /></button>
                                    <button className="hover:text-neon-cyan transition-colors"><Video className="w-5 h-5" /></button>
                                    <button className="hover:text-white transition-colors ml-2"><MoreVertical className="w-5 h-5" /></button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar flex flex-col justify-end">
                                <div className="text-center mb-8">
                                    <div className="inline-block px-4 py-1 rounded-full bg-white/5 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                                        You matched with {activeUser.name}
                                    </div>
                                </div>

                                {messages.filter(m => m.chatId === activeChat).map((msg, i) => (
                                    <div key={i} className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-4 ${msg.isSender
                                                ? 'bg-neon-purple/20 border border-neon-purple/30 rounded-t-2xl rounded-bl-2xl'
                                                : 'glass bg-white/5 border-white/10 rounded-t-2xl rounded-br-2xl'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="p-6 bg-black/40 backdrop-blur-md shrink-0 border-t border-white/5">
                                <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
                                    <input
                                        type="text"
                                        placeholder={`Message ${activeUser.name.split(' ')[0]}...`}
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        className="w-full glass bg-white/5 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 border border-white/10"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!messageText.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-neon-purple flex items-center justify-center text-white disabled:opacity-50 disabled:bg-white/10 hover:scale-105 transition-all"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-white/30">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mb-6">
                                <Send className="w-8 h-8 opacity-50" />
                            </div>
                            <p className="text-xl font-bold italic tracking-wide">Select a match to start collaborating</p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
