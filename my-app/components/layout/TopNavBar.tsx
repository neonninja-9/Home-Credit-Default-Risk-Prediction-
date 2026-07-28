import Link from 'next/link';

export default function TopNavBar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-surface-dim/80 backdrop-blur-xl rounded-full mt-6 mx-auto w-[90%] max-w-container-max border border-glass-stroke shadow-lg shadow-accent-glow">
      <div className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>data_exploration</span>
        RiskEngine AI
      </div>
      <div className="hidden md:flex gap-8 font-body-md text-body-md">
        <Link href="/dashboard" className="text-primary font-bold border-b-2 border-primary pb-1">Platform</Link>
        <Link href="/portfolio-analytics" className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/5 transition-all duration-300 px-3 py-1 rounded-md">ML Engine</Link>
        <Link href="/admin" className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/5 transition-all duration-300 px-3 py-1 rounded-md">Compliance</Link>
        <Link href="/settings" className="text-on-surface-variant hover:text-on-surface transition-colors hover:bg-white/5 transition-all duration-300 px-3 py-1 rounded-md">Settings</Link>
      </div>
      <div className="flex items-center gap-4 font-body-md text-body-md">
        <Link href="/profile" className="text-on-surface-variant hover:text-on-surface transition-colors hidden md:block">Profile</Link>
        <Link href="/predictions/new" className="btn-primary px-6 py-2 rounded-full font-label-md text-label-md shadow-lg shadow-accent-glow scale-95 active:scale-90 transition-transform flex items-center justify-center">
          New Prediction
        </Link>
      </div>
    </nav>
  );
}
