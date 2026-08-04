import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"
import Magnet from '@/components/special-effects/magnet'
import StickyTextReveal from '@/components/ui/StickyTextReveal'
import TextPressure from '@/components/special-effects/TextPressure'
import GlareHover from '@/components/special-effects/GlareHover'
import AnimatedCreditCards from '@/components/ui/AnimatedCreditCards'
import DecryptedText from '@/components/special-effects/DecryptedText'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import TheProblemSection from '@/components/landing/TheProblemSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'

export default async function Home() {
  const session = await auth()
  if (session?.user) {
    const userRole = (session.user as any)?.role
    redirect(userRole === "BANK_OFFICER" ? "/bank" : "/customer")
  }

  return (
    <div className="flex flex-col w-full bg-void-canvas text-bone min-h-screen">

      {/* ═══════════════════════════════════════════════════════════
          1. HERO — Dramatic scroll-expansion entrance
          ═══════════════════════════════════════════════════════════ */}
      <ScrollExpandMedia
        mediaType="custom"
        customMedia={<AnimatedCreditCards />}
        bgImageSrc="/bgHomeImage.webp"
        title="PREDICT RISK"
        date="CreditLens"
        scrollToExpand="Scroll to explore"
        textBlend={true}
      >
        <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto z-20 mt-10">
          <p className="text-xl md:text-2xl text-bone/80 mb-10 font-light w-full">
            <DecryptedText 
              text="Leverage advanced machine learning models and SHAP explainability."
              animateOn="view"
              speed={60}
              sequential={true}
              parentClassName="!block w-full text-center !whitespace-nowrap"
            />
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/auth/signup?role=customer">
              <Magnet padding={50} disabled={false} magnetStrength={3}>
                <button className="bg-snow-white hover:bg-snow-white/90 text-void-canvas px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-xl">
                  Get Started
                </button>
              </Magnet>
            </Link>
          </div>
        </div>
      </ScrollExpandMedia>

      {/* ═══════════════════════════════════════════════════════════
          2. STICKY TEXT REVEAL — Word-by-word scroll reveal
          ═══════════════════════════════════════════════════════════ */}
      <StickyTextReveal 
        text="Powerful Lending Intelligence"
        className="font-display text-6xl md:text-[8.5rem] leading-[1.1] md:leading-[0.95] font-bold tracking-tighter text-bone"
      />

      {/* ═══════════════════════════════════════════════════════════
          3. THE PROBLEM — BlurText stats + ScrollFloat narrative
          Uses: BlurText ⭐, ScrollFloat ⭐
          ═══════════════════════════════════════════════════════════ */}
      <TheProblemSection />

      {/* ═══════════════════════════════════════════════════════════
          4. HOW CREDITLENS SOLVES IT — Step-by-step solution flow
          Uses: Highlight ⭐, HighlightItem ⭐, GlassCard ⭐
          ═══════════════════════════════════════════════════════════ */}
      <HowItWorksSection />

      {/* ═══════════════════════════════════════════════════════════
          5. INTERACTIVE TYPOGRAPHY — TextPressure moment
          ═══════════════════════════════════════════════════════════ */}
      <section className="w-full py-16 bg-void-canvas relative z-10 overflow-hidden flex items-center justify-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 h-[150px] md:h-[250px]">
          <TextPressure
            text="CREDITLENS"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            minFontSize={36}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. FEATURE CARDS — Enhanced GlareHover cards
          ═══════════════════════════════════════════════════════════ */}
      <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-dusk-violet font-semibold">Core Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-bone mt-4 tracking-tight">
            Built for precision
          </h2>
          <p className="text-slate mt-4 max-w-lg mx-auto text-sm md:text-base">
            Every component engineered for accuracy, speed, and transparency in credit risk assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlareHover 
            glareColor="rgba(107, 98, 242, 0.12)"
            className="p-8 rounded-2xl bg-graphite/40 border border-dusk-violet/10 flex flex-col justify-between h-80 backdrop-blur-sm hover:border-dusk-violet/30 transition-colors duration-500"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-dusk-violet/10 border border-dusk-violet/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-dusk-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-widest text-dusk-violet font-semibold">01 / ML Models</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-bone">90%+ ROC-AUC</h3>
              <p className="text-slate text-sm leading-relaxed">LightGBM models meticulously tuned across 193 engineered features, trained on Home Credit&apos;s real-world default history.</p>
            </div>
            <div className="text-xs text-bone/20 font-mono tracking-wider">MODEL_PERF_OPTIMIZED</div>
          </GlareHover>

          <GlareHover 
            glareColor="rgba(45, 212, 191, 0.12)"
            className="p-8 rounded-2xl bg-graphite/40 border border-accent-teal/10 flex flex-col justify-between h-80 backdrop-blur-sm hover:border-accent-teal/30 transition-colors duration-500"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-widest text-accent-teal font-semibold">02 / Interpretability</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-bone">SHAP Values</h3>
              <p className="text-slate text-sm leading-relaxed">Understand every loan decision with granular, per-feature contribution breakdowns. No more black-box models.</p>
            </div>
            <div className="text-xs text-bone/20 font-mono tracking-wider">TRANSPARENT_DECISIONS</div>
          </GlareHover>

          <GlareHover 
            glareColor="rgba(255, 255, 255, 0.08)"
            className="p-8 rounded-2xl bg-graphite/40 border border-white/10 flex flex-col justify-between h-80 backdrop-blur-sm hover:border-white/20 transition-colors duration-500"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-bone/5 border border-bone/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-bone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <span className="text-xs uppercase tracking-widest text-bone/80 font-semibold">03 / Real-Time</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-bone">&lt; 150ms Latency</h3>
              <p className="text-slate text-sm leading-relaxed">High-throughput risk calculation pipeline delivering instant applicant decisioning at scale.</p>
            </div>
            <div className="text-xs text-bone/20 font-mono tracking-wider">LOW_LATENCY_API</div>
          </GlareHover>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7. CALL TO ACTION — Premium closing
          ═══════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div className="relative w-full rounded-3xl overflow-hidden border border-dusk-violet/20 p-12 md:p-16 bg-graphite/40 backdrop-blur-md">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-dusk-violet/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[200px] rounded-full bg-accent-teal/5 blur-[80px] pointer-events-none" />
          
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dusk-violet/50 to-transparent" />

          <div className="relative flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-dusk-violet font-semibold">Ready to transform lending?</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight bg-gradient-to-b from-bone to-bone/60 bg-clip-text text-transparent">
              Automate risk decisions with confidence
            </h2>
            <p className="text-slate text-sm md:text-base max-w-lg leading-relaxed">
              Deploy explainable, trustworthy underwriting powered by machine learning. Start making data-driven lending decisions today.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/auth/signup?role=customer">
                <Magnet padding={50} magnetStrength={3}>
                  <Button variant="primary" className="px-8 py-3.5 text-base shadow-lg shadow-dusk-violet/20">
                    Check Eligibility
                  </Button>
                </Magnet>
              </Link>
              <Link href="/auth/signup?role=bank">
                <button className="px-8 py-3.5 text-sm font-semibold text-bone/70 hover:text-bone border border-hairline/30 hover:border-accent-teal/40 rounded-full transition-all duration-300">
                  Bank Officer Portal →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
