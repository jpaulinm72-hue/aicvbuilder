'use client'

import Navbar from '@/components/shared/Navbar'
import { Check, Sparkles, Zap, ShieldCheck, Crown } from 'lucide-react'
import Link from 'next/link'

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-accent/30">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-6 py-16">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-black text-indigo-600 uppercase tracking-widest mb-6">
            <Crown size={16} /> Premium Access
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4">Upgrade Your Career</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Get unlimited AI optimizations, professional templates, and priority support.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl border border-border p-10 shadow-sm relative overflow-hidden">
             <h2 className="text-2xl font-bold mb-2">Free</h2>
             <p className="text-muted-foreground text-sm mb-6">Perfect for starters</p>
             <div className="text-4xl font-black mb-8">$0<span className="text-sm text-muted-foreground font-normal"> / month</span></div>
             
             <ul className="space-y-4 mb-10">
                <FeatureItem text="1 Active Resume" checked />
                <FeatureItem text="Standard Templates" checked />
                <FeatureItem text="10 AI Credits / week" checked />
                <FeatureItem text="Basic PDF Export" checked />
                <FeatureItem text="Cover Letter Generator" />
             </ul>
             
             <button disabled className="w-full py-4 rounded-2xl bg-muted text-muted-foreground font-bold text-sm cursor-not-allowed">
                Current Plan
             </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 shadow-2xl shadow-indigo-200 relative overflow-hidden text-white">
             <div className="absolute top-0 right-0 p-4">
                <div className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</div>
             </div>
             
             <h2 className="text-2xl font-bold mb-2">Pro</h2>
             <p className="text-white/60 text-sm mb-6">Accelerate your job hunt</p>
             <div className="text-4xl font-black mb-8">$12<span className="text-white/60 text-sm font-normal"> / month</span></div>
             
             <ul className="space-y-4 mb-10">
                <FeatureItem white text="Unlimited Resumes" checked />
                <FeatureItem white text="All Premium Templates" checked />
                <FeatureItem white text="Unlimited AI Content" checked />
                <FeatureItem white text="Priority PDF Export" checked />
                <FeatureItem white text="Personal Cover Letters" checked />
             </ul>
             
             <Link href="/api/stripe/checkout" className="block w-full py-4 rounded-2xl bg-white text-indigo-600 text-center font-black text-sm hover:bg-indigo-50 transition-all shadow-xl shadow-black/10 active:scale-95">
                Upgrade to Pro
             </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           <SmallFeature icon={<Zap className="text-yellow-500" />} title="Instant AI" desc="Get tailored bullet points in seconds." />
           <SmallFeature icon={<ShieldCheck className="text-green-500" />} title="ATS Safe" desc="Our templates GURANTEE readability." />
           <SmallFeature icon={<Sparkles className="text-indigo-500" />} title="Smart Content" desc="Phrased for maximum HR impact." />
        </div>
      </main>
    </div>
  )
}

function FeatureItem({ text, checked = false, white = false }) {
  return (
    <li className={`flex items-center gap-3 text-sm font-medium ${white ? 'text-white' : 'text-foreground'} ${!checked ? 'opacity-30' : ''}`}>
       <div className={`h-5 w-5 rounded-full flex items-center justify-center ${white ? 'bg-white/20' : 'bg-green-100'}`}>
          <Check size={12} className={white ? 'text-white' : 'text-green-600'} />
       </div>
       {text}
    </li>
  )
}

function SmallFeature({ icon, title, desc }) {
  return (
    <div className="flex gap-4 items-start">
       <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center flex-shrink-0">
          {icon}
       </div>
       <div>
          <h4 className="font-bold text-sm mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
       </div>
    </div>
  )
}
