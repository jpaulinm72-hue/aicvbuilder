'use client'

import Navbar from '@/components/shared/Navbar'
import '@/styles/Pricing.css'
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function PricingPage() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (priceId) => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      })
      const data = await response.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pricing-header">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">Simple, Transparent Pricing</h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your career goals. Upgrade or cancel anytime.
        </p>
      </div>

      <div className="pricing-grid">
        {/* Free Plan */}
        <div className="pricing-card">
          <h2 className="text-2xl font-bold">Standard</h2>
          <p className="text-muted-foreground mt-2">Perfect for side projects</p>
          <div className="price">$0<span>/forever</span></div>
          
          <div className="features-list">
             <Feature text="1 Professional CV" />
             <Feature text="Basic AI Optimization" />
             <Feature text="PDF Export" />
             <Feature text="Standard Templates" />
          </div>

          <button disabled className="w-full py-4 rounded-xl font-bold border-2 border-border text-muted-foreground mt-auto">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="pricing-card popular">
          <div className="best-value-badge">Best Value</div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Premium</h2>
            <Sparkles size={20} className="text-primary" />
          </div>
          <p className="text-muted-foreground mt-2">Everything you need to get hired</p>
          <div className="price">$19<span>/month</span></div>
          
          <div className="features-list">
             <Feature text="Unlimited CVs & Letters" bold />
             <Feature text="Advanced AI Rewriting" bold />
             <Feature text="Premium Executive Templates" bold />
             <Feature text="Priority 24/7 Support" />
             <Feature text="AI Skill Gap Analysis" />
          </div>

          <button 
            onClick={() => handleSubscribe('price_1TM0w38kyvkGDCfjOYUxMRHx')}
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary-hover hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-auto"
          >
            {loading ? 'Processing...' : 'Go Premium'} <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Trust section */}
      <section className="bg-muted/30 py-20 px-6 text-center">
         <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">Trusted by candidates at top companies</h3>
            <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
               {/* Just placeholders for logos */}
               <div className="text-xl font-black italic">Google</div>
               <div className="text-xl font-black italic">NETFLIX</div>
               <div className="text-xl font-black italic">amazon</div>
               <div className="text-xl font-black italic">stripe</div>
            </div>
         </div>
      </section>
    </div>
  )
}

function Feature({ text, bold }) {
  return (
    <div className="feature-item">
      <div className="rounded-full bg-primary/10 p-1 feature-icon">
        <Check size={14} />
      </div>
      <span className={bold ? "font-bold" : ""}>{text}</span>
    </div>
  )
}
