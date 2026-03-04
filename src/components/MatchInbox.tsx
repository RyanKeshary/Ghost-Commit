'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, User as UserIcon, Search } from 'lucide-react'

export default function MatchInbox() {
    const [activeChat, setActiveChat] = useState<string | null>(null)
    const [messageText, setMessageText] = useState('')
    const [sentMessages, setSentMessages] = useState<{ chatId: string, text: string }[]>([])

    const handleSend = () => {
        if (!messageText.trim() || !activeChat) return
        setSentMessages(prev => [...prev, { chatId: activeChat, text: messageText }])
        setMessageText('')
    }

    const matches = [
        { id: '1', name: 'Alex Chen', lastMsg: 'Hey, saw your post about AR!', time: '2m' },
        { id: '2', name: 'Sarah Miller', lastMsg: 'Are you available for a sync?', time: '1h' },
        { id: '3', name: 'David Kumar', lastMsg: 'I know some C++ too.', time: '3h' },
    ]

    return (
        <div className="glass h-[600px] rounded-[2rem] overflow-hidden flex border border-white/10 max-w-5xl mx-auto">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-white/5 flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold mb-4">Matches</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input type="text" placeholder="Search..." className="w-full bg-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {matches.map(m => (
                        <button
                            key={m.id}
                            onClick={() => setActiveChat(m.id)}
                            className={`w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors ${activeChat === m.id ? 'bg-white/5 border-l-4 border-neon-purple' : ''}`}
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center font-bold">
                                {m.name[0]}
                            </div>
                            <div className="text-left overflow-hidden">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sm">{m.name}</span>
                                    <span className="text-[10px] text-white/30">{m.time}</span>
                                </div>
                                <p className="text-xs text-white/40 truncate">{m.lastMsg}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white/[0.01]">
                {activeChat ? (
                    <>
                        <div className="p-6 border-b border-white/5 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <UserIcon className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Chat with {matches.find(m => m.id === activeChat)?.name}</h3>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                            <div className="flex justify-end">
                                <div className="bg-neon-purple/20 border border-neon-purple/30 p-4 rounded-t-2xl rounded-bl-2xl max-w-[80%]">
                                    <p className="text-sm">Hey! I saw your profile on the feed. Are you still looking for a UI/UX designer?</p>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-t-2xl rounded-br-2xl max-w-[80%]">
                                    <p className="text-sm text-white/70">Yes! I'm planning to join the hackathon next week. Would you like to team up?</p>
                                </div>
                            </div>
                            {sentMessages.filter(m => m.chatId === activeChat).map((msg, i) => (
                                <div key={i} className="flex justify-end">
                                    <div className="bg-neon-purple/20 border border-neon-purple/30 p-4 rounded-t-2xl rounded-bl-2xl max-w-[80%]">
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 border-t border-white/5">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    className="w-full glass bg-white/5 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:ring-1 focus:ring-neon-purple/50"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-neon-purple flex items-center justify-center hover:scale-105 transition-transform">
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/20">
                        <MessageSquare className="w-16 h-16 mb-4 opacity-10" />
                        <p className="italic">Select a match to start collaborating</p>
                    </div>
                )}
            </div>
        </div>
    )
}

import { MessageSquare } from 'lucide-react'
