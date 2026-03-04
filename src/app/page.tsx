import Hero from '@/components/Hero'
import ThreeBackground from '@/components/ThreeBackground'
import SmoothScroll from '@/components/SmoothScroll'
import Feed from '@/components/Feed'
import HowItWorks from '@/components/HowItWorks'
import ProjectBoard from '@/components/ProjectBoard'
import ProfileForm from '@/components/ProfileForm'
import MatchInbox from '@/components/MatchInbox'

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative">
        <ThreeBackground />

        <div className="relative z-10 w-full">
          <Hero />

          <div className="bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]">
            <HowItWorks />

            <section id="match" className="py-24">
              <Feed />
            </section>

            <section id="inbox" className="py-24 px-6">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-black mb-4 uppercase italic">Your Inbox</h2>
                <div className="h-1 w-24 bg-neon-cyan mx-auto" />
              </div>
              <MatchInbox />
            </section>

            <section id="projects" className="py-24 bg-white/[0.02]">
              <ProjectBoard />
            </section>

            <section id="profile" className="py-24 px-6">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-black mb-4 uppercase italic">Your Dev Profile</h2>
                <div className="h-1 w-24 bg-neon-pink mx-auto" />
              </div>
              <ProfileForm />
            </section>
          </div>

          <section className="py-48 px-6 text-center">
            <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase italic text-glow">
              STOP BUILDING <span className="text-neon-pink text-glow">ALONE.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#profile"
                className="px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-transform neon-glow-purple inline-block"
              >
                Get Started Now
              </a>
              <a
                href="/swipe"
                className="px-12 py-5 rounded-2xl bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 font-black uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all hover:scale-105 inline-block"
              >
                Discovery Swipe
              </a>
              <a
                href="#how-it-works"
                className="px-12 py-5 rounded-2xl border border-white/20 font-black uppercase tracking-widest hover:bg-white/5 transition-colors inline-block"
              >
                How It Works
              </a>
            </div>
            <p className="mt-24 text-white/20 text-[10px] tracking-[0.5em] uppercase font-bold">
              GhostCommit • Internal Team Finder • 2026 Innovation Award
            </p>
          </section>
        </div>
      </main>
    </SmoothScroll>
  )
}
