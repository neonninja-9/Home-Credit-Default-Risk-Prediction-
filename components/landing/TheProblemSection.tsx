"use client"

import BlurText from '@/components/special-effects/BlurText'
import ScrollFloat from '@/components/ui/ScrollFloat'

const stats = [
  { value: "$150B+", label: "in loans default globally each year" },
  { value: "40%", label: "of high-risk borrowers missed by traditional models" },
  { value: "73%", label: "of lenders lack explainable AI in underwriting" },
]

export default function TheProblemSection() {
  return (
    <section className="w-full relative z-10 bg-void-canvas overflow-hidden">
      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-void-canvas to-transparent z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-32 md:py-44">
        {/* Section label */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-dusk-violet/80 font-semibold">
            The Challenge
          </span>
        </div>

        {/* Headline with BlurText */}
        <div className="text-center mb-20">
          <BlurText
            text="Traditional lending is broken."
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-bone justify-center"
            delay={150}
            animateBy="words"
            direction="top"
          />
        </div>

        {/* Stats grid — each stat uses BlurText for the number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-4">
              <BlurText
                text={stat.value}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter justify-center"
                delay={100 + i * 80}
                animateBy="letters"
                direction="bottom"
                animationFrom={{ filter: 'blur(12px)', opacity: 0, y: 60 }}
                animationTo={[
                  { filter: 'blur(4px)', opacity: 0.6, y: 10 },
                  { filter: 'blur(0px)', opacity: 1, y: 0 },
                ]}
                stepDuration={0.5}
              />
              {/* Color the value text via a gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
              />
              <p className="text-sm md:text-base text-slate leading-relaxed max-w-[240px] mx-auto">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Gradient tint on stat values */}
        <style jsx>{`
          .text-5xl, .text-6xl, .text-7xl {
            background: linear-gradient(135deg, var(--color-bone) 0%, var(--color-dusk-violet) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>

        {/* Narrative paragraph with ScrollFloat */}
        <div className="max-w-3xl mx-auto">
          <ScrollFloat
            containerClassName="!my-0"
            textClassName="!text-[clamp(1.1rem,2.5vw,1.5rem)] !leading-[1.7] text-slate font-light text-center"
            animationDuration={1.2}
            ease="power3.out"
            scrollStart="top bottom"
            scrollEnd="center center"
            stagger={0.04}
          >
            Outdated scorecards and opaque algorithms leave lenders guessing. Borrowers are denied without understanding why. The industry needs a model that is not only accurate — but transparent, fair, and explainable.
          </ScrollFloat>
        </div>

        {/* Decorative separator */}
        <div className="flex items-center justify-center mt-24">
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-dusk-violet/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
