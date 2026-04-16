'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/shared/Navbar'
import '@/styles/Dashboard.css'
import { FileText, Plus, Search, MoreVertical, Layout, Clock, CreditCard, Sparkles, Trash2, Download } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default function DashboardPage() {
  const [cvs, setCvs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchCvs()
  }, [])

  const fetchCvs = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/cvs/list')
      const data = await response.json()
      if (data.cvs) {
        setCvs(data.cvs)
      }
    } catch (error) {
      console.error('Error fetching CVs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this CV?')) return
    
    try {
      const response = await fetch('/api/cvs/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (response.ok) {
        setCvs(prev => prev.filter(cv => cv.id !== id))
      }
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  const filteredCvs = cvs.filter(cv => 
    cv.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-accent/30">
      <Navbar />
      
      <main className="dashboard-container">
        <header className="dashboard-header animate-fade-in">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2 text-lg">
                {loading ? 'Loading your resumes...' : `You have ${cvs.length} active CVs in your account.`}
            </p>
          </div>
          <Link 
            href="/builder" 
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-xl shadow-primary/20 hover:bg-primary-hover hover:scale-105 transition-all"
          >
            <Plus size={20} /> Create New CV
          </Link>
        </header>

        {/* Stats Section */}
        <div className="stats-grid mb-12">
           <StatCard icon={<FileText className="text-primary" />} label="Resumes" value={cvs.length} />
           <StatCard icon={<Sparkles className="text-indigo-500" />} label="AI Credits" value="8/10" />
           <StatCard icon={<CreditCard className="text-orange-500" />} label="Plan" value="Free" />
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">My Documents</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search resumes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm" 
              />
            </div>
        </div>

        {/* CV Grid */}
        <div className="cv-grid">
           {/* Create New Card */}
           <Link href="/builder" className="cv-card create-cv-card group">
              <div className="rounded-full bg-primary/10 p-5 mb-4 group-hover:bg-primary group-hover:text-white transition-all scale-110 group-hover:rotate-12">
                 <Plus size={32} />
              </div>
              <span className="font-bold text-lg">New Resume</span>
              <p className="text-xs text-muted-foreground mt-2">Start from scratch</p>
           </Link>

           {loading ? (
             [1,2].map(i => (
               <div key={i} className="cv-card animate-pulse">
                  <div className="h-48 bg-muted rounded-xl mb-4"></div>
                  <div className="h-4 w-3/4 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-muted rounded"></div>
               </div>
             ))
           ) : filteredCvs.map(cv => (
             <div key={cv.id} className="cv-card overflow-hidden group">
                <span className="cv-badge">{cv.content?.template || 'Minimal'}</span>
                
                <div className="cv-preview-thumb group-hover:scale-105 transition-transform duration-500">
                    {/* Simplified preview mockup */}
                    <div className="w-full h-full bg-white p-4 flex flex-col gap-2">
                        <div className="h-2 w-1/2 bg-muted rounded"></div>
                        <div className="h-1 w-full bg-muted/50 rounded"></div>
                        <div className="h-1 w-full bg-muted/50 rounded"></div>
                        <div className="h-1 w-2/3 bg-muted/50 rounded mt-4"></div>
                        <div className="h-1 w-full bg-muted/50 rounded"></div>
                    </div>
                </div>

                <div className="cv-details">
                   <div className="flex items-start justify-between">
                      <h3 className="font-bold text-lg leading-tight truncate pr-2 group-hover:text-primary transition-colors">{cv.title}</h3>
                      <button className="text-muted-foreground hover:text-red-500 transition-colors" onClick={() => handleDelete(cv.id)}>
                        <Trash2 size={16} />
                      </button>
                   </div>
                   
                   <div className="flex items-center gap-2 mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <Clock size={12} />
                      <span>{formatDistanceToNow(new Date(cv.updated_at))} ago</span>
                   </div>
                   
                   <div className="mt-6 flex gap-2 pt-4 border-t border-border/50">
                      <Link 
                        href={`/builder?id=${cv.id}`} 
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl border border-border hover:bg-muted transition-all active:scale-95"
                      >
                         Edit
                      </Link>
                      <button className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-primary transition-all">
                         <Download size={18} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card shadow-sm hover:shadow-xl hover:translate-y-[-5px] transition-all bg-white border border-border/50">
      <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-black text-foreground">{value}</p>
      </div>
    </div>
  )
}
