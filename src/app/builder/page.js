'use client'

import { useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import CVForm from '@/components/builder/CVForm'
import CVPreview from '@/components/builder/CVPreview'
import '@/styles/Editor.css'
import { Sparkles, Save, Download, Layout, Wand2, FileText, ChevronLeft, Minimize2, Maximize2 } from 'lucide-react'
import { exportToPDF } from '@/lib/pdf-export'
import Link from 'next/link'

export default function BuilderPage() {
  const [cvId, setCvId] = useState(null)
  const [activeSection, setActiveSection] = useState('personal')
  const [template, setTemplate] = useState('minimal')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [isAiPanelMinimized, setIsAiPanelMinimized] = useState(false)
  const [cvData, setCvData] = useState({
    personalInfo: { 
      name: 'John Doe', 
      title: 'Senior Product Designer',
      email: 'john.doe@example.com', 
      phone: '+1 (555) 123-4567', 
      location: 'San Francisco, CA',
      summary: 'Passionate product designer with 8+ years of experience in creating user-centric digital experiences for fintech and SaaS startups. Expert in Figma, React, and Design Systems.'
    },
    experience: [
      { 
        id: 1, 
        title: 'Lead Designer', 
        company: 'Stellar Tech', 
        dates: '2020 - Present', 
        description: 'Led the redesign of the core mobile app, resulting in a 40% increase in daily active users.\nManaged a team of 5 junior designers and established the company-wide design system.' 
      },
      { 
        id: 2, 
        title: 'UX Designer', 
        company: 'Bright Solutions', 
        dates: '2016 - 2020', 
        description: 'Conducted user research and translated findings into wireframes and high-fidelity mockups.\nCollaborated with engineering teams to ensure seamless implementation of designs.' 
      }
    ],
    education: [
      { 
        id: 1, 
        degree: 'B.S. in Interaction Design', 
        school: 'University of Arts', 
        dates: '2012 - 2016', 
        description: '' 
      }
    ],
    skills: ['Figma', 'UI/UX Design', 'Prototyping', 'React', 'Tailwind CSS', 'User Research'],
    languages: ['English (Native)', 'Spanish (Fluent)']
  })

  const handleExport = () => {
    exportToPDF(cvData)
  }

  const handleSave = async () => {
    setIsAiLoading(true)
    try {
      const response = await fetch('/api/cvs/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: cvId,
          title: cvData.personalInfo.name + "'s CV",
          content: cvData 
        }),
      });
      const data = await response.json();
      if (data.data) {
        setCvId(data.data.id);
        alert('Progress saved successfully!');
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (error) {
       console.error(error);
       alert('Save failed: ' + (error.message || 'Check connection'));
    } finally {
      setIsAiLoading(false)
    }
  }

  const handleAiOptimize = async () => {
    if (!jobDescription) {
       alert('Please paste a job description first!');
       return;
    }
    
    setIsAiLoading(true)
    try {
      const response = await fetch('/api/ai/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: cvData.personalInfo.summary, 
          type: 'summary',
          jobDescription 
        }),
      });
      const data = await response.json();
      if (data.optimizedContent) {
        setCvData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, summary: data.optimizedContent }
        }));
        alert('CV optimized for the job description!');
      }
    } catch (error) {
       console.error(error);
       alert('Optimization failed. Check console.');
    } finally {
      setIsAiLoading(false)
    }
  }

  const handleOptimizeField = async (type, id, content) => {
    try {
      const response = await fetch('/api/ai/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type, jobDescription }),
      });
      const data = await response.json();
      
      if (data.optimizedContent) {
        if (type === 'summary') {
          setCvData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, summary: data.optimizedContent }
          }));
        } else if (type === 'experience') {
          setCvData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, description: data.optimizedContent } : exp)
          }));
        }
      }
    } catch (error) {
      console.error(error);
      alert('Field optimization failed.');
    }
  }

  const [jobDescription, setJobDescription] = useState('')

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Top Toolbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 py-3 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-6">
             <Link href="/dashboard" className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                <ChevronLeft size={24} />
             </Link>
             <div>
                <h1 className="text-lg font-bold leading-tight">Project: <span className="text-primary">{cvData.personalInfo.name}'s Resume</span></h1>
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground flex items-center gap-1">
                   <Sparkles size={10} className="text-primary" /> Last saved 2 minutes ago
                </p>
             </div>
         </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center bg-muted/50 rounded-xl p-1 border">
                {['minimal', 'modern', 'classic', 'executive'].map((t) => (
                  <button 
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${template === t ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                     {t === 'minimal' && <FileText size={14} />}
                     {t === 'modern' && <Layout size={14} />}
                     {t === 'classic' && <FileText size={14} />}
                     {t === 'executive' && <Layout size={14} />}
                     {t}
                  </button>
                ))}
             </div>

             <div className="h-8 w-[1px] bg-border mx-2"></div>

             <button 
               onClick={handleSave}
               className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-bold hover:bg-muted transition-all active:scale-95"
             >
                <Save size={16} /> Save
             </button>
             <button 
                onClick={handleExport}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all hover:translate-y-[-2px] active:translate-y-0"
              >
                <Download size={16} /> Export PDF
             </button>
          </div>
      </header>

      <main className="flex h-[calc(100vh-69px)] overflow-hidden">
        {/* Left Drawer: Forms */}
        <section className="w-full md:w-[550px] border-r overflow-y-auto bg-white custom-scrollbar px-8 pt-10">
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              Resume Builder
              <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-widest">PRO</span>
            </h2>
            <p className="text-muted-foreground mb-10 text-sm">Refine your professional narrative with our guided tools.</p>
            
            <CVForm 
              cvData={cvData} 
              setCvData={setCvData} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              onOptimize={handleOptimizeField}
            />
        </section>

        {/* Right Area: Preview + AI Sidebar */}
        <section className="hidden md:flex flex-1 bg-muted/20 relative overflow-hidden">
            {/* Live Preview Container */}
            <div className="flex-1 overflow-y-auto p-12 flex justify-center custom-scrollbar">
                <div className="w-full max-w-[800px] transform origin-top scale-[0.9] lg:scale-100 transition-transform">
                   <CVPreview cvData={cvData} template={template} />
                </div>
            </div>

            {/* Floating AI Panel */}
            <div className={`absolute top-10 right-10 transition-all duration-300 z-40 ${isAiPanelMinimized ? 'w-14 h-14' : 'w-80'}`}>
                {isAiPanelMinimized ? (
                  <button 
                    onClick={() => setIsAiPanelMinimized(false)}
                    className="w-14 h-14 bg-gradient-to-br from-indigo-700 to-violet-900 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform border border-white/20"
                    title="Expand AI Assistant"
                  >
                    <Wand2 size={24} />
                  </button>
                ) : (
                  <div className="bg-gradient-to-br from-indigo-700 to-violet-900 rounded-3xl p-6 text-white shadow-2xl shadow-indigo-200 border border-white/20">
                      <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-2.5"><Wand2 size={24} className="text-white" /></div>
                            <div>
                               <h3 className="text-lg font-bold leading-tight">AI Assistant</h3>
                               <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Ready to optimize</p>
                            </div>
                         </div>
                         <button 
                           onClick={() => setIsAiPanelMinimized(true)}
                           className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white"
                           title="Minimize Assistant"
                         >
                            <Minimize2 size={18} />
                         </button>
                      </div>
                      
                      <div className="space-y-4">
                          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                              <p className="text-xs text-indigo-100 mb-3 font-medium">Job description targeting:</p>
                              <textarea 
                                className="w-full bg-black/20 border-none rounded-xl p-3 text-xs text-white placeholder:text-white/30 focus:ring-1 focus:ring-white/40 mb-3"
                                placeholder="Paste the job you're applying for..."
                                rows={3}
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                              />
                              <button 
                                disabled={isAiLoading}
                                onClick={handleAiOptimize}
                                className="w-full bg-white text-indigo-700 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all disabled:opacity-50"
                              >
                                {isAiLoading ? <span className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-700 border-t-transparent"></span> : <><Sparkles size={14} /> Tailor CV to Job</>}
                              </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                               <button className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 text-center transition-all group">
                                  <FileText size={18} className="mx-auto mb-2 text-indigo-200 group-hover:scale-110 transition-transform" />
                                  <span className="text-[10px] font-bold uppercase">Cover Letter</span>
                               </button>
                               <button className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-3 text-center transition-all group">
                                  <Sparkles size={18} className="mx-auto mb-2 text-indigo-200 group-hover:scale-110 transition-transform" />
                                  <span className="text-[10px] font-bold uppercase">Fix Grammar</span>
                               </button>
                          </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-white/10">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-indigo-300">
                             <span>Weekly Credits</span>
                             <span>8 / 10</span>
                          </div>
                          <div className="mt-2 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-white w-[80%] h-full"></div>
                          </div>
                      </div>
                  </div>
                )}
            </div>
        </section>
      </main>
    </div>
  )
}
