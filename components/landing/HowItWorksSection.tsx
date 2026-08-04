"use client"

import { Highlight, HighlightItem } from '@/components/special-effects/highlight'
import GlassCard from '@/components/ui/GlassCard'
import BlurText from '@/components/special-effects/BlurText'
import { FileText, Brain, ShieldCheck } from 'lucide-react'

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Submit Application",
    description: "Applicants enter their financial profile — income, employment history, family size, assets, and loan details. The process takes under 2 minutes.",
    detail: "193 features engineered",
    accentColor: "dusk-violet",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Risk Scoring",
    description: "Our LightGBM model instantly scores default probability, assigns a risk level, and generates per-feature SHAP explanations for full transparency.",
    detail: "< 150ms inference",
    accentColor: "accent-teal",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Confident Decision",
    description: "Bank officers review the AI recommendation alongside feature-level impact breakdowns. Approve, flag, or request manual review — with full audit trails.",
    detail: "Explainable & auditable",
    accentColor: "dusk-violet",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full relative z-10 bg-void-canvas overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-32 md:py-44">
        {/* Section header */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-accent-teal font-semibold">
            The Solution
          </span>
        </div>

        <div className="text-center mb-20">
          <BlurText
            text="Three steps to smarter lending"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-bone justify-center"
            delay={120}
            animateBy="words"
            direction="bottom"
          />
        </div>

        {/* Steps with Highlight hover effect */}
        <Highlight
          containerClassName="w-full"
          className="bg-dusk-violet/[0.06] rounded-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <HighlightItem key={step.number}>
                <GlassCard
                  className={`
                    relative p-8 md:p-10 rounded-2xl
                    bg-graphite/30 border border-hairline/10
                    backdrop-blur-md
                    flex flex-col h-full min-h-[360px]
                    transition-all duration-500
                    hover:border-${step.accentColor}/25
                    group cursor-default
                  `}
                >
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-8">
                    <span className={`
                      text-[11px] uppercase tracking-[0.25em] font-semibold
                      ${step.accentColor === 'accent-teal' ? 'text-accent-teal/70' : 'text-dusk-violet/70'}
                    `}>
                      Step {step.number}
                    </span>
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center
                      transition-all duration-500
                      ${step.accentColor === 'accent-teal'
                        ? 'bg-accent-teal/10 border border-accent-teal/15 group-hover:bg-accent-teal/15 group-hover:border-accent-teal/30'
                        : 'bg-dusk-violet/10 border border-dusk-violet/15 group-hover:bg-dusk-violet/15 group-hover:border-dusk-violet/30'
                      }
                    `}>
                      <step.icon className={`w-5 h-5 ${
                        step.accentColor === 'accent-teal' ? 'text-accent-teal' : 'text-dusk-violet'
                      }`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-bone mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-slate text-sm leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom detail tag */}
                  <div className="mt-8 pt-6 border-t border-hairline/10">
                    <span className={`
                      text-xs font-mono tracking-wider
                      ${step.accentColor === 'accent-teal' ? 'text-accent-teal/50' : 'text-dusk-violet/50'}
                    `}>
                      {step.detail}
                    </span>
                  </div>

                  {/* Subtle corner glow on hover */}
                  <div className={`
                    absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                    ${step.accentColor === 'accent-teal' ? 'bg-accent-teal/8' : 'bg-dusk-violet/8'}
                  `} />
                </GlassCard>
              </HighlightItem>
            ))}
          </div>
        </Highlight>

        {/* Connecting line visual */}
        <div className="hidden md:flex items-center justify-center mt-16">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-dusk-violet/30 border border-dusk-violet/50" />
            <div className="w-24 h-[1px] bg-gradient-to-r from-dusk-violet/30 to-accent-teal/30" />
            <div className="w-3 h-3 rounded-full bg-accent-teal/30 border border-accent-teal/50" />
            <div className="w-24 h-[1px] bg-gradient-to-r from-accent-teal/30 to-dusk-violet/30" />
            <div className="w-3 h-3 rounded-full bg-dusk-violet/30 border border-dusk-violet/50" />
          </div>
        </div>
      </div>
    </section>
  )
}
