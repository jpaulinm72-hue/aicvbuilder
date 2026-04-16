'use client'

import AuthCard from '@/components/ui/AuthCard'
import Link from 'next/link'
import '@/styles/Auth.css'
import { Github, Globe, Mail, Lock } from 'lucide-react'
import Navbar from '@/components/shared/Navbar'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
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

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <AuthCard 
        title="Welcome Back" 
        subtitle="Sign in to your account to continue building"
      >
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3.5 text-muted-foreground" size={18} />
              <input 
                type="email" 
                className="auth-input pr-10" 
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
              <Lock className="absolute right-3 top-3.5 text-muted-foreground" size={18} />
              <input 
                type="password" 
                className="auth-input pr-10" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground font-medium">Or continue with</span>
          </div>
        </div>

        <button onClick={handleGoogleLogin} className="google-button">
          <Globe size={20} className="text-blue-500" />
          Google
        </button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/register" className="font-bold text-primary hover:underline">
            Sign up for free
          </Link>
        </p>
      </AuthCard>
    </div>
  )
}
