'use client'

import AuthCard from '@/components/ui/AuthCard'
import Link from 'next/link'
import '@/styles/Auth.css'
import { User, Mail, Lock, Globe, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-accent">
        <Navbar />
        <AuthCard title="Check your email" subtitle="We've sent a confirmation link to your inbox.">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <Mail size={32} />
            </div>
            <p className="text-muted-foreground">Click the link in the email to activate your account. You can close this window now.</p>
            <Link href="/login" className="auth-button inline-block">Return to Sign In</Link>
          </div>
        </AuthCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <AuthCard 
        title="Create your account" 
        subtitle="Start building professional CVs with AI today"
      >
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
              <input 
                type="text" 
                className="auth-input pl-10" 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
              <input 
                type="email" 
                className="auth-input pl-10" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-semibold ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={18} />
              <input 
                type="password" 
                className="auth-input pl-10" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="flex items-start gap-2 py-2">
            <ShieldCheck size={16} className="mt-0.5 text-primary" />
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          <button type="submit" disabled={loading} className="auth-button mt-2">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground font-medium">Or join with</span>
          </div>
        </div>

        <button onClick={handleGoogleLogin} className="google-button">
          <Globe size={20} className="text-blue-500" />
          Sign up with Google
        </button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </AuthCard>
    </div>
  )
}
