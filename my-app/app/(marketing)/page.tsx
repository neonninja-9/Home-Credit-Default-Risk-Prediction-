import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"
import Magnet from '@/components/magnet'
import StickyTextReveal from '@/components/ui/StickyTextReveal'
import TextPressure from '@/components/TextPressure'
import GlareHover from '@/components/GlareHover'
import LaserFlow from '@/components/LaserFlow'
import AnimatedCreditCards from '@/components/ui/AnimatedCreditCards'
import DecryptedText from '@/components/DecryptedText'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (session?.user) {
    redirect('/customer')
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
          <Link href="/auth/signup">
            <Magnet padding={50} disabled={false} magnetStrength={50}>
              <button className="bg-snow-white hover:bg-snow-white/90 text-void-canvas px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-xl">
                Get started for free
              </button>
            </Magnet>
          </Link>
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
            text="CREDIT RISK"
            flex={true}
            stroke={false}
            alpha={false}
            scale={true}
            textColor="#ffffff"
            minFontSize={36}
            className="w-full h-full text-center uppercase"
          />
        </div>
      </section>

      {/* 4. GlareHover Cards Section */}
      <section className="w-full py-32 px-6 bg-void-canvas relative z-10 flex flex-col items-center justify-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-bone mb-16 text-center">
          Explore the Features
        </h2>
        <div className="flex flex-col md:flex-row gap-10 max-w-[1200px] mx-auto w-full items-center justify-center">

          <GlareHover
            width="350px"
            height="450px"
            background="#111"
            borderColor="#333"
            glareColor="#ffffff"
            className="rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-white/5 overflow-hidden"
          >
            <div className="w-16 h-16 rounded-full bg-snow-white/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dusk-violet"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <h3 className="text-2xl font-bold text-bone mb-4 font-display">Risk Scoring</h3>
            <p className="text-slate font-light leading-relaxed">
              Instant, accurate default probability predictions powered by state-of-the-art machine learning models.
            </p>
          </GlareHover>

          <GlareHover
            width="350px"
            height="450px"
            background="#111"
            borderColor="#333"
            glareColor="#ffffff"
            className="rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-white/5 overflow-hidden"
          >
            <div className="w-16 h-16 rounded-full bg-accent-teal/20 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-teal"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-bone mb-4 font-display">SHAP Explainability</h3>
            <p className="text-slate font-light leading-relaxed">
              Understand exactly why a decision was made with feature contribution breakdowns for every prediction.
            </p>
          </GlareHover>

        </div>
      </section>

    </div>
  )
}
