'use client'

import { Mail, Phone, MapPin, Globe } from 'lucide-react'

export default function CVPreview({ cvData, template = 'minimal' }) {
  const { personalInfo, experience, education, skills } = cvData

  if (template === 'minimal') {
    return (
      <div className="bg-white w-full h-full shadow-2xl p-12 min-h-[1000px] text-zinc-900 font-serif leading-relaxed">
        <header className="border-b-2 border-zinc-200 pb-8 mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase mb-4">{personalInfo.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-widest">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</span>}
          </div>
        </header>

        <main className="space-y-10">
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest border-l-4 border-zinc-900 pl-3 mb-4">Profile</h2>
              <p className="text-sm text-zinc-700">{personalInfo.summary}</p>
            </section>
          )}

          <section>
            <h2 className="text-sm font-black uppercase tracking-widest border-l-4 border-zinc-900 pl-3 mb-6">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{exp.title}</h3>
                    <span className="text-xs font-semibold text-zinc-500 uppercase">{exp.dates}</span>
                  </div>
                  <div className="text-sm font-medium text-zinc-600 mb-2 italic">{exp.company}</div>
                  <p className="text-sm text-zinc-700 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-black uppercase tracking-widest border-l-4 border-zinc-900 pl-3 mb-6">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <span className="text-xs font-semibold text-zinc-500 uppercase">{edu.dates}</span>
                  </div>
                  <div className="text-sm font-medium text-zinc-600 italic">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-black uppercase tracking-widest border-l-4 border-zinc-900 pl-3 mb-4">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 border border-zinc-200 text-[10px] font-black uppercase tracking-tighter text-zinc-600">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </main>
      </div>
    )
  }

  // Modern Template
  return (
    <div className="bg-white w-full h-full shadow-2xl flex min-h-[1000px] text-slate-800">
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-100 p-8 flex flex-col gap-10">
        <div className="text-center">
            <div className="w-32 h-32 bg-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center text-slate-400">
                <Globe size={48} />
            </div>
            <h1 className="text-2xl font-bold leading-tight">{personalInfo.name}</h1>
            <p className="text-primary font-medium text-sm mt-1">{personalInfo.title || 'Professional'}</p>
        </div>

        <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">Contact</h2>
            <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                    <Mail size={14} className="text-slate-400" />
                    <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone size={14} className="text-slate-400" />
                    <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{personalInfo.location}</span>
                </div>
            </div>
        </section>

        <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <span key={index} className="bg-white px-2 py-1 rounded text-xs font-medium border border-slate-200">
                        {skill}
                    </span>
                ))}
            </div>
        </section>

        <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b pb-1">Languages</h2>
            <div className="space-y-2 text-sm font-medium">
                <div>English - Native</div>
                <div>French - Fluent</div>
            </div>
        </section>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 space-y-12">
        <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
               <span className="w-8 h-1 bg-primary"></span> Profile
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">{personalInfo.summary}</p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
               <span className="w-8 h-1 bg-primary"></span> Experience
            </h2>
            <div className="space-y-8">
                {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100 pb-2 last:pb-0">
                        <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-primary"></span>
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-slate-900">{exp.title}</h3>
                            <span className="text-xs font-bold text-slate-400">{exp.dates}</span>
                        </div>
                        <div className="text-primary text-sm font-bold mb-3">{exp.company}</div>
                        <p className="text-slate-600 text-sm">{exp.description}</p>
                    </div>
                ))}
            </div>
        </section>

        <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
               <span className="w-8 h-1 bg-primary"></span> Education
            </h2>
            <div className="space-y-6">
                {education.map((edu) => (
                    <div key={edu.id}>
                        <div className="font-bold text-slate-900">{edu.degree}</div>
                        <div className="text-slate-500 text-sm mb-1">{edu.school}</div>
                        <div className="text-[10px] font-bold text-primary uppercase">{edu.dates}</div>
                    </div>
                ))}
            </div>
        </section>
      </main>
    </div>
  )
}
