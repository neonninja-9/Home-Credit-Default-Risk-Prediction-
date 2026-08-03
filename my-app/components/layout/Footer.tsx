"use client";

import Link from "next/link"
import LaserFlow from "@/components/LaserFlow"

export function Footer() {
  return (
    <footer 
      className="relative pt-44 pb-20 px-6 lg:px-24 overflow-hidden bg-[#030303]"
    >
      {/* Background subtle texture overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{ backgroundImage: "url('/bgFooter.webp')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />

      {/* Top subtle border between page and footer */}
      <div className="absolute top-0 left-0 right-0 h-px z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Outer Card Wrapper with Laser Effect */}
      <div className="max-w-[1200px] mx-auto relative z-10 pointer-events-auto">
        
        {/* === LASER FLOW BEAM === */}
        {/* The laser drops down from high above and flares out across the top border of the card */}
        <div className="absolute -top-[260px] left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[520px] pointer-events-none z-20 mix-blend-screen overflow-visible">
          <LaserFlow 
            color="#c084fc"
            wispDensity={1.3}
            flowSpeed={0.35}
            verticalSizing={2.8}
            horizontalSizing={1.0}
            fogIntensity={0.55}
            fogScale={0.3}
            wispIntensity={5.5}
            wispSpeed={16.0}
            flowStrength={0.3}
            decay={1.2}
            falloffStart={1.2}
            verticalBeamOffset={0.0}
            horizontalBeamOffset={0.0}
          />
        </div>

        {/* === GLOWING FOOTER CARD === */}
        <div className="relative rounded-3xl border border-[#c084fc]/50 bg-[#070707]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(192,132,252,0.18),0_0_20px_rgba(192,132,252,0.25)] overflow-hidden">
          
          {/* Dot Matrix Pattern inside card */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(192,132,252,0.14)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />

          {/* Top edge hot-spot impact flare */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-8 rounded-full bg-[#c084fc] blur-xl opacity-70 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-3 rounded-full bg-white blur-sm opacity-95 pointer-events-none" />
          
          {/* Top border beam line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c084fc] to-transparent pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 p-10 lg:p-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-14">
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-display font-semibold text-xl text-white mb-4 tracking-tight">CreditLens</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Advanced machine learning for credit default risk prediction. Make confident lending decisions.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-5">Product</h4>
                <ul className="flex flex-col gap-3">
                  <li><Link href="#features" className="text-sm text-white/40 hover:text-white transition-colors duration-200">Features</Link></li>
                  <li><Link href="#how-it-works" className="text-sm text-white/40 hover:text-white transition-colors duration-200">How it works</Link></li>
                  <li><Link href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">Pricing</Link></li>
                  <li><Link href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">API Documentation</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-5">Company</h4>
                <ul className="flex flex-col gap-3">
                  <li><Link href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">About</Link></li>
                  <li><Link href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">Careers</Link></li>
                  <li><Link href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-5">Legal</h4>
                <ul className="flex flex-col gap-3">
                  <li><Link href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                  <li><Link href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Gradient divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Bottom bar */}
            <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/30">© {new Date().getFullYear()} CreditLens Inc. All rights reserved.</p>
              <p className="text-xs text-white/30">For demonstration purposes only.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
