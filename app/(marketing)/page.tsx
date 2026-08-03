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

export default async function Home() {
  const session = await auth()
  if (session?.user) {
    const userRole = (session.user as any)?.role
    redirect(userRole === "BANK_OFFICER" ? "/bank" : "/customer")
  }

  return (
    <div className="flex flex-col w-full bg-void-canvas text-bone min-h-screen">

      {/* 1. Hero Section (Scroll Expansion) */}
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

      {/* 2. Powerful Line (StickyTextReveal) */}
      <StickyTextReveal 
        text="Powerful Lending Intelligence"
        className="font-display text-6xl md:text-[8.5rem] leading-[1.1] md:leading-[0.95] font-bold tracking-tighter text-bone"
      />

      {/* 3. TextPressure Section */}
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

      {/* 4. GlareHover Feature Cards */}
      <section id="features" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlareHover 
            glareColor="rgba(255, 255, 255, 0.15)"
            className="p-8 rounded-2xl bg-graphite/40 border border-white/10 flex flex-col justify-between h-80 backdrop-blur-sm"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-dusk-violet font-semibold">01 / ML MODELS</span>
              <h3 className="text-2xl font-bold mt-4 mb-2">90%+ ROC-AUC</h3>
              <p className="text-slate text-sm">LightGBM models tuned across 193 features trained on Home Credit default history.</p>
            </div>
            <div className="text-xs text-bone/40 font-mono">MODEL_PERF_OPTIMIZED</div>
          </GlareHover>

          <GlareHover 
            glareColor="rgba(255, 255, 255, 0.15)"
            className="p-8 rounded-2xl bg-graphite/40 border border-white/10 flex flex-col justify-between h-80 backdrop-blur-sm"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-accent-teal font-semibold">02 / INTERPRETABILITY</span>
              <h3 className="text-2xl font-bold mt-4 mb-2">SHAP Values</h3>
              <p className="text-slate text-sm">Understand every loan approval with granular feature contribution breakdowns.</p>
            </div>
            <div className="text-xs text-bone/40 font-mono">TRANSPARENT_DECISIONS</div>
          </GlareHover>

          <GlareHover 
            glareColor="rgba(255, 255, 255, 0.15)"
            className="p-8 rounded-2xl bg-graphite/40 border border-white/10 flex flex-col justify-between h-80 backdrop-blur-sm"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-bone font-semibold">03 / REAL-TIME</span>
              <h3 className="text-2xl font-bold mt-4 mb-2">&lt; 150ms Latency</h3>
              <p className="text-slate text-sm">High throughput risk calculation pipeline for instant applicant decisioning.</p>
            </div>
            <div className="text-xs text-bone/40 font-mono">LOW_LATENCY_API</div>
          </GlareHover>
        </div>
      </section>

      {/* 5. Call To Action */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 relative z-10">
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center text-center p-8 bg-graphite/40 backdrop-blur-md">
          <div className="flex flex-col items-center max-w-xl z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-bone">
              Ready to automate risk decisions?
            </h2>
            <p className="text-slate text-sm md:text-base">
              Deploy explainable, trustworthy underwriting with CreditLens today.
            </p>
            <Link href="/auth/signup?role=customer">
              <Button variant="primary" className="px-8 py-3.5 text-base">
                Start Checking Eligibility
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
