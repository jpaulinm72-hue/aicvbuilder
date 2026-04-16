'use client'

import { Sparkles, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function CVForm({ cvData, setCvData, activeSection, setActiveSection, onOptimize }) {
  const [optimizingId, setOptimizingId] = useState(null);

  const handleOptimize = async (type, id = null, content) => {
    setOptimizingId(id || type);
    await onOptimize(type, id, content);
    setOptimizingId(null);
  };
  const updatePersonalInfo = (e) => {
    const { name, value } = e.target
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }))
  }

  const addItem = (section) => {
    const newItem = section === 'experience' 
      ? { id: Date.now(), title: '', company: '', dates: '', description: '' }
      : { id: Date.now(), degree: '', school: '', dates: '', description: '' }
    
    setCvData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }))
  }

  const updateItem = (section, id, field, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
    }))
  }

  const removeItem = (section, id) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }))
  }

  const sections = [
    { id: 'personal', title: 'Personal Information' },
    { id: 'summary', title: 'Professional Summary' },
    { id: 'experience', title: 'Work Experience' },
    { id: 'education', title: 'Education' },
    { id: 'skills', title: 'Skills' },
  ]

  return (
    <div className="space-y-6 pb-20">
      {/* Personal Info */}
      <CollapsibleSection 
        title="Personal Information" 
        isOpen={activeSection === 'personal'} 
        toggle={() => setActiveSection(activeSection === 'personal' ? null : 'personal')}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
            <input 
              name="name" 
              value={cvData.personalInfo.name} 
              onChange={updatePersonalInfo}
              className="auth-input" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-muted-foreground">Title</label>
            <input 
              name="title" 
              value={cvData.personalInfo.title || ''} 
              onChange={updatePersonalInfo}
              placeholder="Software Engineer"
              className="auth-input" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-muted-foreground">Email</label>
            <input 
              name="email" 
              value={cvData.personalInfo.email} 
              onChange={updatePersonalInfo}
              className="auth-input" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-muted-foreground">Phone</label>
            <input 
              name="phone" 
              value={cvData.personalInfo.phone} 
              onChange={updatePersonalInfo}
              className="auth-input" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-muted-foreground">Location</label>
            <input 
              name="location" 
              value={cvData.personalInfo.location || ''} 
              onChange={updatePersonalInfo}
              placeholder="City, Country"
              className="auth-input" 
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Summary */}
      <CollapsibleSection 
        title="Professional Summary" 
        isOpen={activeSection === 'summary'} 
        toggle={() => setActiveSection(activeSection === 'summary' ? null : 'summary')}
        hasAI
      >
        <div className="space-y-4">
          <textarea 
            name="summary" 
            value={cvData.personalInfo.summary} 
            onChange={updatePersonalInfo}
            rows={4}
            className="auth-input min-h-[120px]" 
            placeholder="Briefly describe your career background and key achievements..."
          />
          <button 
            disabled={optimizingId === 'summary'}
            onClick={() => handleOptimize('summary', null, cvData.personalInfo.summary)}
            className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg hover:bg-indigo-100 transition-all disabled:opacity-50"
          >
            {optimizingId === 'summary' ? <span className="animate-spin h-3 w-3 border-2 border-indigo-600 border-t-transparent rounded-full"></span> : <Sparkles size={14} />}
            {optimizingId === 'summary' ? 'OPTIMIZING...' : 'IMPROVE WITH AI'}
          </button>
        </div>
      </CollapsibleSection>

      {/* Experience */}
      <CollapsibleSection 
        title="Work Experience" 
        isOpen={activeSection === 'experience'} 
        toggle={() => setActiveSection(activeSection === 'experience' ? null : 'experience')}
      >
        <div className="space-y-8">
          {cvData.experience.map((exp, index) => (
            <div key={exp.id} className="relative p-4 rounded-xl border border-border bg-muted/30">
              <button 
                onClick={() => removeItem('experience', exp.id)}
                className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-red-500 transition-colors"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Job Title</label>
                  <input 
                    value={exp.title} 
                    onChange={(e) => updateItem('experience', exp.id, 'title', e.target.value)}
                    className="auth-input" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Company</label>
                  <input 
                    value={exp.company} 
                    onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)}
                    className="auth-input" 
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Dates</label>
                  <input 
                    value={exp.dates} 
                    onChange={(e) => updateItem('experience', exp.id, 'dates', e.target.value)}
                    placeholder="e.g. 2021 - Present"
                    className="auth-input" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Description</label>
                  <button 
                    disabled={optimizingId === exp.id}
                    onClick={() => handleOptimize('experience', exp.id, exp.description)}
                    className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline disabled:opacity-50"
                  >
                    {optimizingId === exp.id ? <span className="animate-spin h-2 w-2 border-2 border-primary border-t-transparent rounded-full mr-1"></span> : <Sparkles size={10} />}
                    {optimizingId === exp.id ? 'OPTIMIZING...' : 'REWRITE WITH AI'}
                  </button>
                </div>
                <textarea 
                  value={exp.description} 
                  onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)}
                  rows={4}
                  className="auth-input text-sm" 
                />
              </div>
            </div>
          ))}
          <button 
            onClick={() => addItem('experience')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
          >
            <Plus size={18} /> Add Experience
          </button>
        </div>
      </CollapsibleSection>

      {/* Education */}
      <CollapsibleSection 
        title="Education" 
        isOpen={activeSection === 'education'} 
        toggle={() => setActiveSection(activeSection === 'education' ? null : 'education')}
      >
        <div className="space-y-8">
          {cvData.education.map((edu, index) => (
            <div key={edu.id} className="relative p-4 rounded-xl border border-border bg-muted/30">
              <button 
                onClick={() => removeItem('education', edu.id)}
                className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-red-500 transition-colors"
                title="Remove"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Degree</label>
                  <input 
                    value={edu.degree} 
                    onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
                    className="auth-input" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-muted-foreground">School</label>
                  <input 
                    value={edu.school} 
                    onChange={(e) => updateItem('education', edu.id, 'school', e.target.value)}
                    className="auth-input" 
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Dates</label>
                  <input 
                    value={edu.dates} 
                    onChange={(e) => updateItem('education', edu.id, 'dates', e.target.value)}
                    className="auth-input" 
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={() => addItem('education')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
          >
            <Plus size={18} /> Add Education
          </button>
        </div>
      </CollapsibleSection>

      {/* Skills */}
      <CollapsibleSection 
        title="Skills" 
        isOpen={activeSection === 'skills'} 
        toggle={() => setActiveSection(activeSection === 'skills' ? null : 'skills')}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {cvData.skills.map((skill, index) => (
              <span key={index} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {skill}
                <button 
                  onClick={() => setCvData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))}
                  className="hover:text-primary-hover"
                >
                  <Trash2 size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              placeholder="Add skill (e.g. JavaScript)" 
              className="auth-input" 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value) {
                  setCvData(prev => ({ ...prev, skills: [...prev.skills, e.target.value] }))
                  e.target.value = ''
                }
              }}
            />
          </div>
        </div>
      </CollapsibleSection>
    </div>
  )
}

function CollapsibleSection({ title, isOpen, toggle, children, hasAI = false }) {
  return (
    <div className={`section-card ${isOpen ? 'ring-2 ring-primary/20' : ''}`}>
      <div 
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={toggle}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold">{title}</h3>
          {hasAI && (
            <span className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
               <Sparkles size={10} /> AI ENHANCED
            </span>
          )}
        </div>
        <div>
          {isOpen ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
        </div>
      </div>
      {isOpen && (
        <div className="px-4 pb-6 border-t border-border/50 pt-6 animate-slide-down">
          {children}
        </div>
      )}
    </div>
  )
}
