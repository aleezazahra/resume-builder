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

export const ClassicTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalInfo = {}, experiences = [], education = [], projects = [], skills = [] } = data || {};
  const themeColor = settings?.primaryColor || '#1e3a8a';
  const fontSize = settings?.fontSize || 'text-sm';

  return (
    <div className={`w-full max-w-[800px] mx-auto bg-white p-12 font-serif shadow-sm print:shadow-none print:p-0 ${fontSize} text-gray-900`}>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-normal tracking-wide uppercase mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-sm tracking-widest uppercase italic mb-4" style={{ color: themeColor }}>{personalInfo.title || 'Professional Title'}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600 font-sans">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span style={{ color: themeColor }}>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
        </div>
        {personalInfo.summary && (
          <p className="mt-4 text-left text-xs font-sans text-gray-600 chimneys leading-relaxed max-w-3xl mx-auto italic">
            {personalInfo.summary}
          </p>
        )}
      </header>

      <div className="space-y-6 font-sans">
        {experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2 border-b-2 pb-0.5" style={{ borderColor: themeColor }}>Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <div className="flex justify-between font-bold text-gray-900 text-xs">
                    <span>{exp.role} <span className="font-normal italic text-gray-600">at {exp.company}</span></span>
                    <span className="font-normal text-gray-500">{exp.duration}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 italic mb-1">{exp.location}</div>
                  <p className="text-gray-700 text-xs whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2 border-b-2 pb-0.5" style={{ borderColor: themeColor }}>Projects</h2>
            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <div className="flex justify-between font-bold text-gray-900 text-xs">
                    <span>{proj.name} {proj.link && <span className="text-[10px] font-normal underline ml-1" style={{ color: themeColor }}>Link</span>}</span>
                    <span className="font-normal text-gray-500">{proj.date}</span>
                  </div>
                  {proj.technologies && <p className="text-[11px] font-medium text-gray-500">{proj.technologies.join(', ')}</p>}
                  <p className="text-gray-700 text-xs leading-relaxed mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 border-b-2 pb-0.5" style={{ borderColor: themeColor }}>Skills</h2>
              <p className="text-xs text-gray-700 leading-relaxed">{skills.join(', ')}</p>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 border-b-2 pb-0.5" style={{ borderColor: themeColor }}>Education</h2>
              <div className="space-y-2">
                {education.map((edu, idx) => (
                  <div key={idx} className="break-inside-avoid text-xs">
                    <div className="font-bold text-gray-900">{edu.degree}</div>
                    <div className="text-gray-700 flex justify-between">
                      <span>{edu.school}</span>
                      <span className="text-gray-500 text-[11px]">{edu.duration}</span>
                    </div>
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