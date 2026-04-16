'use client'

import Link from 'next/link'
import { FileText, User as UserIcon, LogOut, LayoutDashboard, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const { lang, setLang, t } = useLanguage()
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="glass sticky top-0 z-50 w-full border-b border-white/10 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
            <FileText size={24} />
          </div>
          <span>AI CV <span className="text-primary">Builder</span></span>
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{t.features}</Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{t.pricing}</Link>
          {user && (
             <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{t.dashboard}</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1 mr-2">
            <button 
              onClick={() => setLang('en')}
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-all ${lang === 'en' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('fr')}
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-all ${lang === 'fr' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
            >
              FR
            </button>
          </div>
          
          {loading ? (
             <div className="h-8 w-20 bg-muted animate-pulse rounded-full"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
               <Link href="/builder" className="hidden lg:block text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">
                  + {t.buildBtn}
               </Link>
               <div className="relative group">
                  <button className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                     <UserIcon size={20} className="text-muted-foreground" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right group-hover:translate-y-0 translate-y-2 py-2 z-50">
                     <div className="px-4 py-2 border-b border-border mb-2">
                        <p className="text-xs font-bold truncate">{user.email}</p>
                     </div>
                     <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">
                        <LayoutDashboard size={16} /> {t.dashboard}
                     </Link>
                     <Link href="/dashboard/account" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">
                        <Settings size={16} /> Settings
                     </Link>
                     <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors mt-2">
                        <LogOut size={16} /> Sign Out
                     </button>
                  </div>
               </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold transition-colors hover:text-primary">
                {t.signIn}
              </Link>
              <Link href="/register" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:scale-105 active:scale-95">
                {t.getStarted}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
