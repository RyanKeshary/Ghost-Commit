'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Full-Stack Developer',
        avatar: 'SC',
        color: '#FE3C72',
        text: 'Found my hackathon dream team in under 2 hours. We won first place at HackMIT. The matching algorithm literally read my mind.',
        stars: 5,
    },
    {
        name: 'Marcus Johnson',
        role: 'ML Engineer',
        avatar: 'MJ',
        color: '#FF6B4A',
        text: 'I was tired of being the only backend guy surrounded by 4 frontend devs. GhostCommit matched me with a balanced squad instantly.',
        stars: 5,
    },
    {
        name: 'Priya Patel',
        role: 'UI/UX Designer',
        avatar: 'PP',
        color: '#FF85A2',
        text: 'As a designer, finding devs who actually care about UI was impossible. My GhostCommit team ships features that look AND work incredible.',
        stars: 5,
    },
    {
        name: 'Alex Rodriguez',
        role: 'DevOps Engineer',
        avatar: 'AR',
        color: '#FFD700',
        text: 'The skill-matching is scary accurate. Got paired with a frontend wizard and a data scientist — we built a startup MVP in 48 hours.',
        stars: 5,
    },
    {
        name: 'Jordan Kim',
        role: 'iOS Developer',
        avatar: 'JK',
        color: '#FFD43B',
        text: 'I needed a backend partner for my app. GhostCommit connected me with someone who had the exact complementary skills. App launched in 3 weeks.',
        stars: 5,
    },
    {
        name: 'Emma Williams',
        role: 'Data Scientist',
        avatar: 'EW',
        color: '#02569B',
        text: 'The team formation process was seamless. Within a day of signing up, I had a squad that shipped our capstone project two weeks early.',
        stars: 5,
    },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative p-6 rounded-2xl glass border border-white/6 hover:border-white/12 transition-all duration-500 hover:translate-y-[-4px]"
        >
            {/* Glow on hover */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 40px ${testimonial.color}08, 0 0 40px ${testimonial.color}05` }}
            />

            {/* Quote icon */}
            <Quote className="w-8 h-8 mb-4 opacity-10" style={{ color: testimonial.color }} />

            {/* Text */}
            <p className="text-sm text-white/50 leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-500/80 text-yellow-500/80" />
                ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 relative z-10">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-black"
                    style={{ backgroundColor: testimonial.color }}
                >
                    {testimonial.avatar}
                </div>
                <div>
                    <div className="text-sm font-bold text-white/80">{testimonial.name}</div>
                    <div className="text-xs text-white/30">{testimonial.role}</div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Testimonials() {
    return (
        <section className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/6 text-[10px] tracking-[0.25em] uppercase text-white/40 font-bold mb-6">
                        <Star className="w-3 h-3" />
                        Wall of Love
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] text-white mb-4">
                        Devs who found their <span className="gradient-text">squad</span>
                    </h2>
                    <p className="text-base text-white/30 max-w-lg mx-auto">
                        Real stories from developers who stopped building alone and started shipping together.
                    </p>
                </motion.div>

                {/* Masonry-like grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {testimonials.map((testimonial, i) => (
                        <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
                    ))}
                </div>

                {/* Bottom stat */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-sm text-white/20">
                        Join <span className="text-tinder-coral font-bold">500+</span> developers who already found their perfect team
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
