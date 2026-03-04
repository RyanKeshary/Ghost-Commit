'use client'

import { motion } from 'framer-motion'
import { Rocket, Target, Users, Zap } from 'lucide-react'

const features = [
    {
        title: 'Create Profile',
        desc: 'Showcase your skills, projects, and what you are looking for in a teammate.',
        icon: <Users className="w-8 h-8 text-neon-purple" />,
        color: 'from-neon-purple/20'
    },
    {
        title: 'Discover Talent',
        desc: 'Smart filtering by semester, department, and tech stack to find the perfect fit.',
        icon: <Target className="w-8 h-8 text-neon-cyan" />,
        color: 'from-neon-cyan/20'
    },
    {
        title: 'Match & Connect',
        desc: 'Connect instantly and start chatting with your potential teammates.',
        icon: <Zap className="w-8 h-8 text-neon-pink" />,
        color: 'from-neon-pink/20'
    },
    {
        title: 'Build Together',
        desc: 'Form teams for hackathons, startups, or academic projects and win big.',
        icon: <Rocket className="w-8 h-8 text-white" />,
        color: 'from-white/20'
    }
]

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-black mb-4 uppercase italic">How it Works</h2>
                <div className="h-1 w-24 bg-neon-purple mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((f, i) => (
                    <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass p-8 rounded-3xl border-t-2 border-transparent hover:border-white/20 transition-all group`}
                    >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            {f.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                        <p className="text-white/50 leading-relaxed">
                            {f.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
