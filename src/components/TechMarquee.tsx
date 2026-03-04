'use client'

import { motion } from 'framer-motion'

const techStack = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Next.js', color: '#ffffff' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Python', color: '#FFD43B' },
    { name: 'Node.js', color: '#5FA04E' },
    { name: 'Rust', color: '#DEA584' },
    { name: 'Go', color: '#00ADD8' },
    { name: 'Figma', color: '#F24E1E' },
    { name: 'PostgreSQL', color: '#4169E1' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'TailwindCSS', color: '#06B6D4' },
    { name: 'GraphQL', color: '#E10098' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'Firebase', color: '#FFCA28' },
    { name: 'Flutter', color: '#02569B' },
    { name: 'Swift', color: '#F05138' },
    { name: 'Kotlin', color: '#7F52FF' },
    { name: 'Vue.js', color: '#4FC08D' },
]

function MarqueeRow({ reverse = false, speed = 30 }: { reverse?: boolean; speed?: number }) {
    const items = [...techStack, ...techStack] // double for seamless loop

    return (
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
                className="flex shrink-0 gap-4 py-2"
                animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: speed,
                        ease: 'linear',
                    },
                }}
            >
                {items.map((tech, i) => (
                    <div
                        key={`${tech.name}-${i}`}
                        className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/3 border border-white/6 hover:border-white/15 hover:bg-white/6 transition-all duration-300 cursor-default select-none shrink-0"
                    >
                        <div
                            className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}40` }}
                        />
                        <span className="text-sm font-semibold text-white/50 group-hover:text-white/80 transition-colors whitespace-nowrap">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default function TechMarquee() {
    return (
        <section className="relative py-16 overflow-hidden">
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">
                    Developers on every stack
                </span>
            </motion.div>

            <div className="space-y-4">
                <MarqueeRow speed={35} />
                <MarqueeRow reverse speed={40} />
            </div>
        </section>
    )
}
