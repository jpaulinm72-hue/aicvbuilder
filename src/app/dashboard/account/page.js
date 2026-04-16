'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/shared/Navbar'
import { User, Mail, Shield, Bell, CreditCard, ChevronRight, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [newName, setNewName] = useState('')
  const [updating, setUpdating] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setNewName(user?.user_metadata?.full_name || '')
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setUpdating(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: newName }
    })
    
    if (!error) {
      setUser(prev => ({ ...prev, user_metadata: { ...prev.user_metadata, full_name: newName } }))
      setIsEditingProfile(false)
      alert('Profile updated!')
    } else {
      alert(error.message)
    }
    setUpdating(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-accent/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-accent/30">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your professional profile and application preferences.</p>
        </header>

        <div className="grid gap-8">
          {/* Profile Section */}
          <section className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
             <div className="p-8 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                       <User size={40} />
                    </div>
                    <div>
                       <h2 className="text-xl font-bold">{user?.user_metadata?.full_name || 'User'}</h2>
                       <p className="text-muted-foreground">{user?.email}</p>
                       <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                          Free Plan
                       </span>
                    </div>
                </div>
             </div>
             
             <div className="p-4 space-y-1">
                {isEditingProfile ? (
                   <form onSubmit={handleUpdateProfile} className="p-4 bg-muted/30 rounded-2xl animate-fade-in">
                      <div className="space-y-4">
                         <div>
                            <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Full Name</label>
                            <input 
                              type="text" 
                              value={newName} 
                              onChange={(e) => setNewName(e.target.value)}
                              className="auth-input bg-white" 
                            />
                         </div>
                         <div className="flex gap-2">
                            <button type="submit" disabled={updating} className="flex-1 auth-button text-xs py-2">
                               {updating ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button type="button" onClick={() => setIsEditingProfile(false)} className="flex-1 bg-white border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all">
                               Cancel
                            </button>
                         </div>
                      </div>
                   </form>
                ) : (
                  <SettingsLink 
                    onClick={() => setIsEditingProfile(true)}
                    icon={<User size={18} className="text-blue-500" />} 
                    label="Edit Profile" 
                    desc="Update your name and personal details"
                  />
                )}
                <SettingsLink 
                  icon={<Mail size={18} className="text-purple-500" />} 
                  label="Email Settings" 
                  desc={user?.email}
                />
                <SettingsLink 
                  icon={<Shield size={18} className="text-green-500" />} 
                  label="Security" 
                  desc="Change password and security options"
                />
             </div>
          </section>

          {/* Subscription Section */}
          <section className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
             <div className="p-4 space-y-1">
                <SettingsLink 
                  icon={<CreditCard size={18} className="text-orange-500" />} 
                  label="Subscription & Billing" 
                  desc="Manage your pro plan and invoices"
                  href="/dashboard/subscription"
                />
                <SettingsLink 
                  icon={<Bell size={18} className="text-yellow-500" />} 
                  label="Notifications" 
                  desc="Configure email and app alerts"
                />
             </div>
          </section>

          {/* Danger Zone */}
          <section className="flex justify-center pt-4">
             <button 
               onClick={handleSignOut}
               className="flex items-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 px-6 py-3 rounded-2xl transition-all"
             >
                <LogOut size={18} /> Sign Out of Account
             </button>
          </section>
        </div>
      </main>
    </div>
  )
}

function SettingsLink({ icon, label, desc, href, onClick }) {
  const Component = onClick ? 'button' : href ? 'a' : 'div'
  
  return (
    <Component 
      href={href} 
      onClick={onClick}
      className="w-full text-left flex items-center justify-between p-4 rounded-2xl hover:bg-muted transition-all group"
    >
       <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center group-hover:bg-white transition-colors">
             {icon}
          </div>
          <div>
             <p className="text-sm font-bold">{label}</p>
             <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
       </div>
       <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
    </Component>
  )
}
