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

export const ModernTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalInfo = {}, experiences = [], education = [], projects = [], skills = [] } = data || {};
  const themeColor = settings?.primaryColor || '#0f172a';
  const fontSize = settings?.fontSize || 'text-sm';

  return (
    <div className={`w-full max-w-[800px] mx-auto bg-white p-0 font-sans shadow-sm print:shadow-none ${fontSize} text-gray-800`}>
      <div className="grid grid-cols-3 min-h-[1000px] print:min-h-0">
        
        <div className="col-span-1 text-white p-8 flex flex-col justify-between" style={{ backgroundColor: themeColor }}>
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight leading-tight mb-1">{personalInfo.fullName || 'Your Name'}</h1>
              <p className="text-xs font-medium opacity-80 uppercase tracking-wider">{personalInfo.title || 'Professional Title'}</p>
            </div>

            <div className="space-y-3 text-xs opacity-90 break-all">
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60">Contact</h3>
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.website && <div className="underline">{personalInfo.website.replace(/^https?:\/\//, '')}</div>}
            </div>

            {skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="text-[11px] bg-white bg-opacity-15 px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-60">Education</h3>
                {education.map((edu, idx) => (
                  <div key={idx} className="text-xs break-inside-avoid">
                    <div className="font-bold">{edu.degree}</div>
                    <div className="opacity-80 text-[11px]">{edu.school}</div>
                    <div className="opacity-60 text-[10px]">{edu.duration}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2 p-8 space-y-6 bg-slate-50 print:bg-white">
          {personalInfo.summary && (
            <section className="bg-white p-4 rounded-lg border border-slate-100 print:border-0 print:p-0">
              <p className="text-gray-600 text-xs leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {experiences.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Experience</h2>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-slate-100 print:border-0 print:p-0 break-inside-avoid">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{exp.role}</h4>
                        <span className="text-xs font-medium" style={{ color: themeColor }}>{exp.company}</span>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">{exp.duration}</span>
                    </div>
                    <p className="text-gray-600 text-xs whitespace-pre-line leading-relaxed mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Projects</h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-slate-100 print:border-0 print:p-0 break-inside-avoid">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-gray-900 text-xs">
                        {proj.name}
                        {proj.link && <a href={proj.link} className="text-[10px] font-normal underline ml-2" style={{ color: themeColor }}>Live</a>}
                      </h4>
                      <span className="text-[11px] text-gray-400">{proj.date}</span>
                    </div>
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1 my-1.5">
                        {proj.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-semibold text-gray-500 bg-slate-100 px-1.5 py-0.5 rounded">{tech}</span>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-600 text-xs leading-relaxed">{proj.description}</p>
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