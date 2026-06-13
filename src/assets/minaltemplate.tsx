import React from 'react';

interface ResumeData {
  personalInfo?: {
    fullName?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    summary?: string;
  };
  experiences?: Array<{
    role: string;
    company: string;
    duration: string;
    location: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    school: string;
    duration: string;
    grade: string;
  }>;
  projects?: Array<{
    name: string;
    date: string;
    technologies?: string[];
    description: string;
    link?: string;
  }>;
  skills?: string[];
}

interface TemplateProps {
  data: ResumeData;
  settings?: {
    primaryColor?: string;
    fontSize?: string;
  };
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalInfo = {}, experiences = [], education = [], projects = [], skills = [] } = data || {};
  const themeColor = settings?.primaryColor || '#020617';
  const fontSize = settings?.fontSize || 'text-sm';

  return (
    <div className={`w-full max-w-[800px] mx-auto bg-white p-10 font-sans shadow-sm print:shadow-none print:p-0 ${fontSize} text-slate-800`}>
      <header className="border-b pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-1">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-sm font-medium tracking-wide uppercase" style={{ color: themeColor }}>{personalInfo.title || 'Professional Title'}</p>
          </div>
          <div className="text-right text-xs text-slate-500 space-y-0.5">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div className="font-medium" style={{ color: themeColor }}>{personalInfo.website.replace(/^https?:\/\//, '')}</div>}
          </div>
        </div>
        {personalInfo.summary && (
          <p className="mt-4 text-slate-600 leading-relaxed text-xs max-w-2xl">{personalInfo.summary}</p>
        )}
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {experiences.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Experience</h2>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <div className="flex justify-between font-semibold text-slate-900 text-xs">
                      <span>{exp.role}</span>
                      <span className="text-xs font-normal text-slate-400">{exp.duration}</span>
                    </div>
                    <div className="text-[11px] flex justify-between text-slate-500 mb-1">
                      <span className="font-medium">{exp.company}</span>
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-slate-600 text-xs whitespace-pre-line leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="break-inside-avoid">
                    <div className="flex justify-between font-semibold text-slate-900 text-xs">
                      <span>{proj.name} {proj.link && <span className="text-[10px] font-normal underline" style={{ color: themeColor }}>Link</span>}</span>
                      <span className="text-xs font-normal text-slate-400">{proj.date}</span>
                    </div>
                    {proj.technologies && <p className="text-[11px] font-medium text-slate-400 mb-1">{proj.technologies.join(' • ')}</p>}
                    <p className="text-slate-600 text-xs leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1 space-y-6">
          {skills.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, idx) => (
                  <span key={idx} className="text-xs bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Education</h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="break-inside-avoid text-xs">
                    <div className="font-semibold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.school}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{edu.duration}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};