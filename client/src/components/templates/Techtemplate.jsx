import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

const normalizeUrl = (url) => {
  if (!url) return "#";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const hasContent = (html) =>
  typeof html === "string" && html.replace(/<[^>]*>/g, "").trim().length > 0;

const TechTemplate = ({ data, accentColor }) => {
  if (!data) return <div className="p-8 text-center">Loading...</div>;

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
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-sans text-sm">
      <header className="border-b-2 border-gray-800 pb-3 mb-4">
        <h1 className="text-3xl font-bold">{data.personal_info?.full_name || "Your Name"}</h1>
        {data.personal_info?.title && (
          <p className="text-gray-700 font-medium mb-3">{data.personal_info.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>| {data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>| {data.personal_info.location}</span>}
          {data.personal_info?.website && (
            <span>
              |{" "}
              
              <a  href={normalizeUrl(data.personal_info.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: accentColor }}
              >
                {data.personal_info.website}
              </a>
            </span>
          )}
        </div>
      </header>

      {data.socials?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold mb-2" style={{ color: accentColor }}>Socials</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {data.socials.map((social, i) => {
              const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform);
              if (!platform || !social.url) return null;
              return (
                
                <a  key={i}
                  href={normalizeUrl(social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-700 hover:text-black hover:underline"
                >
                  <span style={{ color: accentColor }}>{platform.icon}</span>
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {hasContent(data.professional_summary) && (
        <section className="mb-6">
          <h2 className="font-bold border-b border-gray-300 mb-2" style={{ color: accentColor }}>Summary</h2>
          <div
            className="leading-relaxed ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.professional_summary }}
          />
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold border-b border-gray-300 mb-3" style={{ color: accentColor }}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">{exp.position}</span>
                <span className="text-gray-600 text-xs">
                  {formatDate(exp.start_date)} -{" "}
                  {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </span>
              </div>
              <p className="text-gray-700 italic">{exp.company}</p>
              {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold border-b border-gray-300 mb-3" style={{ color: accentColor }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">
                  {edu.degree}
                  {edu.field_of_study ? `, ${edu.field_of_study}` : ""}
                </span>
                <span className="text-gray-600 text-xs">
                  {formatDate(edu.start_date)} -{" "}
                  {edu.is_current ? "Present" : formatDate(edu.end_date)}
                </span>
              </div>
              <p className="text-gray-700 italic">{edu.institution}</p>
              {edu.gpa && <p className="text-gray-600 text-xs">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {data.project?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold border-b border-gray-300 mb-3" style={{ color: accentColor }}>Projects</h2>
          {data.project.map((proj, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-900">{proj.name}</span>
                {proj.link && (
                  
                 <a   href={normalizeUrl(proj.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-xs"
                    style={{ color: accentColor }}
                  >
                    Link
                  </a>
                )}
              </div>
              {proj.description && <p className="text-gray-700 mt-1">{proj.description}</p>}
              {proj.technologies && (
                <p className="text-gray-600 text-xs mt-1">
                  {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {hasContent(data.skills) && (
        <section className="mb-6">
          <h2 className="font-bold border-b border-gray-300 mb-2" style={{ color: accentColor }}>Skills</h2>
          <div
            className="leading-relaxed ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.skills }}
          />
        </section>
      )}

      {data.languages?.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold border-b border-gray-300 mb-2" style={{ color: accentColor }}>Languages</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-700">
            {data.languages.map((lang, i) => (
              <span key={i}>
                {lang.name}
                {lang.level ? ` (${lang.level})` : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {hasContent(data.certifications) && (
        <section className="mb-6">
          <h2 className="font-bold border-b border-gray-300 mb-2" style={{ color: accentColor }}>Certifications</h2>
          <div
            className="leading-relaxed ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.certifications }}
          />
        </section>
      )}

      {hasContent(data.interests) && (
        <section className="mb-6">
          <h2 className="font-bold border-b border-gray-300 mb-2" style={{ color: accentColor }}>Interests</h2>
          <div
            className="leading-relaxed ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.interests }}
          />
        </section>
      )}
    </div>
  );
};

export default TechTemplate;