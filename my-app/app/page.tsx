import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Link from "next/link"
import { ShieldCheck, TrendingUp, History, Lock, Activity, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (dark band) */}
      <section 
        className="bg-canvas-dark text-on-dark min-h-[90vh] flex flex-col justify-center px-6 py-section lg:px-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/bgHomeImage.webp')" }}
      >
        {/* Subtle background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-[1200px] mx-auto w-full relative z-10 flex flex-col items-start gap-8">
          <Badge variant="tag" className="mb-4 bg-surface-elevated border border-hairline-dark">
            Phase 1 Beta
          </Badge>
          <h1 className="display-xl md:display-xxl text-balance">
            Predict Credit Risk<br />with Confidence
          </h1>
          <p className="body-lg text-on-dark-mute max-w-2xl">
            A premium fintech platform for Home Credit Default Risk prediction. 
            Leverage advanced machine learning models and SHAP explainability to make confident lending decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/register">
              <Button variant="primary">Get started for free</Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline-dark">See how it works</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Features Section (dark band, surface-elevated cards) */}
      <section id="features" className="bg-canvas-dark py-band px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="display-lg mb-6">Powerful lending intelligence.</h2>
            <p className="body-lg text-on-dark-mute max-w-xl">
              Everything you need to assess risk accurately and transparently, built into one seamless platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="feature-dark" className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="heading-sm mb-2">Risk Scoring</h3>
                <p className="body-sm text-on-dark-mute">
                  Instant, accurate default probability predictions powered by state-of-the-art machine learning models.
                </p>
              </div>
            </Card>

            <Card variant="feature-dark" className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-accent-teal/20 text-accent-teal flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="heading-sm mb-2">SHAP Explainability</h3>
                <p className="body-sm text-on-dark-mute">
                  Understand exactly why a decision was made with feature contribution breakdowns for every prediction.
                </p>
              </div>
            </Card>

            <Card variant="feature-dark" className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-accent-light-blue/20 text-accent-light-blue flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="heading-sm mb-2">Real-time Analytics</h3>
                <p className="body-sm text-on-dark-mute">
                  Monitor your portfolio's risk distribution and track prediction trends over time in beautiful dashboards.
                </p>
              </div>
            </Card>

            <Card variant="feature-dark" className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-accent-pink/20 text-accent-pink flex items-center justify-center">
                <History size={24} />
              </div>
              <div>
                <h3 className="heading-sm mb-2">Prediction History</h3>
                <p className="body-sm text-on-dark-mute">
                  Keep a complete, searchable audit trail of every risk assessment run by your team.
                </p>
              </div>
            </Card>

            <Card variant="feature-dark" className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-accent-light-green/20 text-accent-light-green flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="heading-sm mb-2">Secure Platform</h3>
                <p className="body-sm text-on-dark-mute">
                  Built with fintech-grade security, JWT sessions, and granular data isolation between accounts.
                </p>
              </div>
            </Card>

            <Card variant="feature-dark" className="flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-accent-warning/20 text-accent-warning flex items-center justify-center">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="heading-sm mb-2">API Ready</h3>
                <p className="body-sm text-on-dark-mute">
                  Integrate our models directly into your existing loan origination systems via our secure REST API.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section (light band) */}
      <section id="how-it-works" className="bg-canvas-light text-ink py-band px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-md mb-6">How CreditLens works</h2>
            <p className="body-lg text-mute max-w-2xl mx-auto">
              From data entry to actionable insights in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[1px] bg-hairline-light z-0"></div>

            <div className="flex flex-col items-center text-center relative z-10 gap-6">
              <div className="w-24 h-24 rounded-full bg-surface-soft border border-hairline-light flex items-center justify-center heading-lg text-primary bg-white">
                1
              </div>
              <div>
                <h3 className="heading-sm mb-2">Submit Data</h3>
                <p className="body-sm text-mute">Enter applicant details via dashboard or API.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center relative z-10 gap-6">
              <div className="w-24 h-24 rounded-full bg-surface-soft border border-hairline-light flex items-center justify-center heading-lg text-primary bg-white">
                2
              </div>
              <div>
                <h3 className="heading-sm mb-2">ML Analysis</h3>
                <p className="body-sm text-mute">Our Python backend processes features instantly.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center relative z-10 gap-6">
              <div className="w-24 h-24 rounded-full bg-surface-soft border border-hairline-light flex items-center justify-center heading-lg text-primary bg-white">
                3
              </div>
              <div>
                <h3 className="heading-sm mb-2">Risk Assessment</h3>
                <p className="body-sm text-mute">Receive probability score and risk tier.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center relative z-10 gap-6">
              <div className="w-24 h-24 rounded-full bg-surface-soft border border-hairline-light flex items-center justify-center heading-lg text-primary bg-white">
                4
              </div>
              <div>
                <h3 className="heading-sm mb-2">Insights</h3>
                <p className="body-sm text-mute">View SHAP charts explaining the exact drivers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tech Stack Showcase (dark band) */}
      <section className="bg-canvas-dark py-section px-6 lg:px-24 border-t border-hairline-dark">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="heading-md mb-12">Powered by modern technology</h2>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8 opacity-70">
            <Badge variant="tag" className="bg-surface-elevated text-on-dark border border-hairline-dark py-2 px-6">Next.js</Badge>
            <Badge variant="tag" className="bg-surface-elevated text-on-dark border border-hairline-dark py-2 px-6">React</Badge>
            <Badge variant="tag" className="bg-surface-elevated text-on-dark border border-hairline-dark py-2 px-6">Tailwind CSS</Badge>
            <Badge variant="tag" className="bg-surface-elevated text-on-dark border border-hairline-dark py-2 px-6">TypeScript</Badge>
            <Badge variant="tag" className="bg-surface-elevated text-on-dark border border-hairline-dark py-2 px-6">Node.js</Badge>
            <Badge variant="tag" className="bg-surface-elevated text-on-dark border border-hairline-dark py-2 px-6">Python</Badge>
            <Badge variant="tag" className="bg-surface-elevated text-on-dark border border-hairline-dark py-2 px-6">FastAPI</Badge>
            <Badge variant="tag" className="bg-surface-elevated text-on-dark border border-hairline-dark py-2 px-6">SHAP</Badge>
          </div>
        </div>
      </section>

      {/* 5. Team Section (dark band) */}
      <section className="bg-canvas-dark py-band px-6 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-md mb-6">Built by experts</h2>
            <p className="body-lg text-on-dark-mute max-w-2xl mx-auto">
              A team of data scientists and engineers dedicated to solving complex risk problems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((member) => (
              <Card key={member} variant="feature-dark" className="flex flex-col items-center text-center p-6">
                <div className="w-24 h-24 rounded-full bg-surface-deep border border-hairline-dark mb-6 flex items-center justify-center">
                  <span className="text-on-dark-mute caption">Photo</span>
                </div>
                <h3 className="heading-sm mb-1">Team Member {member}</h3>
                <p className="body-sm text-on-dark-mute">Machine Learning Engineer</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
