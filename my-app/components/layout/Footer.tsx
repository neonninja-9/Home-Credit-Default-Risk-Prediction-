import Link from "next/link"

export function Footer() {
  return (
    <footer 
      className="bg-canvas-dark text-on-dark-mute py-20 px-6 lg:px-24 border-t border-hairline-dark bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('/bgFoote.webp')" }}
    >
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display font-semibold text-xl text-on-dark mb-6">CreditLens</h3>
            <p className="body-sm">
              Advanced machine learning for credit default risk prediction. Make confident lending decisions.
            </p>
          </div>
          <div>
            <h4 className="heading-sm text-on-dark mb-6">Product</h4>
            <ul className="flex flex-col gap-4 body-sm">
              <li><Link href="#features" className="hover:text-on-dark transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-on-dark transition-colors">How it works</Link></li>
              <li><Link href="#" className="hover:text-on-dark transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-on-dark transition-colors">API Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="heading-sm text-on-dark mb-6">Company</h4>
            <ul className="flex flex-col gap-4 body-sm">
              <li><Link href="#" className="hover:text-on-dark transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-on-dark transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-on-dark transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="heading-sm text-on-dark mb-6">Legal</h4>
            <ul className="flex flex-col gap-4 body-sm">
              <li><Link href="#" className="hover:text-on-dark transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-on-dark transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-divider-soft flex flex-col md:flex-row justify-between items-center gap-4 caption">
          <p>© {new Date().getFullYear()} CreditLens Inc. All rights reserved.</p>
          <p>For demonstration purposes only.</p>
        </div>
      </div>
    </footer>
  )
}
