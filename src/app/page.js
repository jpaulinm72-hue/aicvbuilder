'use client'

import Navbar from '@/components/shared/Navbar'
import '@/styles/LandingPage.css'
import { Sparkles, Zap, Download, ShieldCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden px-6 pt-24 pb-32 min-h-[90vh] flex items-center">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            <span>Powered by GPT-4 Optimization</span>
          </div>
          
          <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-7xl">
            {t.heroTitle} <br />
            <span className="title-gradient">{t.heroSubtitle}</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {t.heroDesc}
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/register" className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-hover hover:scale-105 active:scale-95">
              {t.buildBtn} <ArrowRight size={20} />
            </Link>
            <Link href="#templates" className="rounded-full border border-border bg-white/50 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg">
              {t.viewTemplates}
            </Link>
          </div>
          
          {/* Mockup Display */}
          <div className="hero-card relative mx-auto mt-20 max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-muted/30 p-2 shadow-2xl">
              <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden min-h-[400px]">
                  <img src="/templates.png" alt="CV Templates Preview" className="w-full h-full object-cover opacity-80" />
              </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-32 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold md:text-5xl">Our Professional Templates</h2>
            <p className="mt-4 text-muted-foreground">Chosen by experts to help you land your dream job.</p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <TemplateCard title="Minimal" desc="Clean & Simple" type="minimal" />
            <TemplateCard title="Modern" desc="Sleek Sidebar" type="modern" />
            <TemplateCard title="Classic" desc="Traditional & Bold" type="classic" />
            <TemplateCard title="Executive" desc="Premium Business" type="executive" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-accent py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold md:text-5xl">Why Choose AI CV Builder?</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to stand out in the competitive job market.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard 
              icon={<Zap className="text-yellow-500" />}
              title="AI Optimization"
              description="Our AI analyzes your experience and suggests high-impact keywords to beat ATS systems."
            />
            <FeatureCard 
              icon={<Sparkles className="text-primary" />}
              title="Tailored Cover Letters"
              description="Generate personalized cover letters for every job application in one click."
            />
            <FeatureCard 
              icon={<Download className="text-secondary" />}
              title="Export to PDF"
              description="Download your CV in professional, print-ready PDF formats instantly."
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function TemplateCard({ title, desc, type }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-4 transition-all hover:shadow-2xl hover:translate-y-[-10px]">
      <div className={`aspect-[3/4] rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-border transition-all group-hover:border-primary/50 ${
        type === 'minimal' ? 'bg-zinc-50' : 
        type === 'modern' ? 'bg-slate-100 flex-row' : 
        type === 'classic' ? 'bg-white' : 'bg-zinc-900'
      }`}>
        {/* Simplified preview mockup per template type */}
        {type === 'minimal' && (
          <div className="w-1/2 space-y-2 opacity-20">
            <div className="h-1 w-full bg-zinc-900 rounded"></div>
            <div className="h-0.5 w-full bg-zinc-900 rounded"></div>
            <div className="h-0.5 w-1/2 bg-zinc-900 rounded"></div>
          </div>
        )}
        {type === 'modern' && (
          <div className="flex w-full h-full opacity-20">
            <div className="w-1/3 bg-slate-300 h-full"></div>
            <div className="w-2/3 p-4 space-y-2">
               <div className="h-1 w-full bg-slate-900 rounded"></div>
               <div className="h-0.5 w-full bg-slate-900 rounded"></div>
            </div>
          </div>
        )}
        {type === 'classic' && (
          <div className="w-2/3 space-y-4 opacity-20 text-center">
            <div className="h-2 w-full bg-zinc-900 rounded"></div>
            <div className="h-1 w-1/2 mx-auto bg-zinc-900 rounded"></div>
            <div className="h-0.5 w-full bg-zinc-900 rounded"></div>
          </div>
        )}
        {type === 'executive' && (
          <div className="w-full h-full opacity-20 flex flex-col">
            <div className="h-1/3 bg-white w-full"></div>
            <div className="h-2/3 bg-zinc-700 w-full"></div>
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6">{desc}</p>
      <Link href="/register" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
        Use Template <ArrowRight size={16} />
      </Link>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-8 transition-all hover:shadow-xl hover:translate-y-[-5px]">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
