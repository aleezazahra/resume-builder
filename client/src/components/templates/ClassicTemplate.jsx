import { Mail, Phone, MapPin } from "lucide-react";
import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

const normalizeUrl = (url) => {
  if (!url) return "#";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const hasContent = (html) => {
  if (!html || typeof html !== "string") return false;
  return html.replace(/<[^>]*>/g, "").trim().length > 0;
};

const ClassicTemplate = ({ data, accentColor }) => {
  if (!data) return <div>No resume data available.</div>;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 2) return dateStr;
    return new Date(parts[0], parts[1] - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        {data.personal_info?.title && (
          <p className="text-gray-600 font-medium mb-3">{data.personal_info.title}</p>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {data.personal_info?.email && (
            <span className="flex items-center gap-1">
              <Mail size={14} style={{ color: accentColor }} />
              {data.personal_info.email}
            </span>
          )}
          {data.personal_info?.phone && (
            <span className="flex items-center gap-1">
              <Phone size={14} style={{ color: accentColor }} />
              {data.personal_info.phone}
            </span>
          )}
          {data.personal_info?.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} style={{ color: accentColor }} />
              {data.personal_info.location}
            </span>
          )}
          {data.personal_info?.website && (
            <a href={normalizeUrl(data.personal_info.website)} target="_blank" rel="noopener noreferrer">
              {data.personal_info.website}
            </a>
          )}
        </div>

        {data.socials?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
            {data.socials.map((social, index) => {
              const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform);
              if (!platform || !social.url) return null;
              return (
                
              <a    key={index}
                 href={normalizeUrl(social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <span style={{ color: accentColor }}>{platform.icon}</span>
                  {social.label}
                </a>
              );
            })}
          </div>
        )}
      </header>

      {hasContent(data.professional_summary) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            SUMMARY
          </h2>
          <div
            className="text-gray-700 leading-relaxed ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.professional_summary }}
          />
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            EDUCATION
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree}
                      {edu.field ? `, ${edu.field}` : ""}
                    </h3>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(edu.start_date)} -{" "}
                      {edu.is_current ? "Present" : formatDate(edu.end_date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.project?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROJECTS
          </h2>
          <div className="space-y-4">
            {data.project.map((proj, index) => (
              <div key={index} className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  {proj.link && (
                    
                     <a href={normalizeUrl(proj.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                      style={{ color: accentColor }}
                    >
                      Link
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-gray-700 leading-relaxed mt-1">{proj.description}</p>
                )}
                {proj.technologies && (
                  <p className="text-sm text-gray-500 mt-1">
                    {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {hasContent(data.skills) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            SKILLS
          </h2>
          <div
            className="text-gray-700 leading-relaxed ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.skills }}
          />
        </section>
      )}

      {data.languages?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            LANGUAGES
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang, index) => (
              <span key={index} className="text-sm text-gray-700">
                {lang.name}
                {lang.level ? ` (${lang.level})` : ""}
                {index < data.languages.length - 1 ? " ·" : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {hasContent(data.certifications) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            CERTIFICATIONS
          </h2>
          <div
            className="text-gray-700 leading-relaxed ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.certifications }}
          />
        </section>
      )}

      {hasContent(data.interests) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            INTERESTS AND HOBBIES
          </h2>
          <div
            className="text-gray-700 leading-relaxed ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.interests }}
          />
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;