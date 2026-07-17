import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

const hasContent = (html) => {
  if (typeof html !== "string") return false;
  return html.replace(/<[^>]*>?/gm, "").trim().length > 0;
};

const normalizeUrl = (url) => {
  if (!url) return "#";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const MinimalTemplate = ({ data, accentColor }) => {
  if (!data) return <div className="p-8 text-center">Loading resume...</div>;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 2) return dateStr;
    const [year, month] = parts;
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
      <header className="mb-10">
        <h1 className="text-4xl font-thin mb-4 tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.title && <span>{data.personal_info.title}</span>}
          {data.personal_info?.website && (
            
            <a  href={normalizeUrl(data.personal_info.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline break-all"
            >
              {data.personal_info.website}
            </a>
          )}
        </div>

        {data.personal_info?.socials?.length > 0 && (
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            {data.personal_info.socials.map((social, index) => {
              const platform = SOCIAL_PLATFORMS.find((p) => p.key === social.platform);
              if (!platform || !social.url) return null;
              const Icon = platform.icon;
              return (
                
                <a  key={index}
                  href={normalizeUrl(social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  {Icon && <Icon size={14} style={{ color: accentColor }} />}
                  {social.url}
                </a>
              );
            })}
          </div>
        )}

        {hasContent(data.professional_summary) && (
          <section className="mt-8 mb-4">
            <h2
              className="text-sm uppercase tracking-widest mb-4 font-medium"
              style={{ color: accentColor }}
            >
              Summary
            </h2>
            <div
              className="text-gray-700 ql-editor !p-0"
              dangerouslySetInnerHTML={{ __html: data.professional_summary }}
            />
          </section>
        )}
      </header>

      {data.experience?.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                {exp.description && (
                  <div className="text-gray-700 whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-medium">
                    {edu.degree}
                    {edu.field_of_study ? `, ${edu.field_of_study}` : ""}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.start_date)} -{" "}
                    {edu.is_current ? "Present" : formatDate(edu.end_date)}
                  </span>
                </div>
                <p className="text-gray-600">{edu.institution}</p>
                {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects?.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-medium">{proj.name}</h3>
                  {proj.link && (
                    
                   <a  href={normalizeUrl(proj.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      Link
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-gray-700">{proj.description}</p>
                )}
                {proj.technologies && (
                  <p className="text-sm text-gray-500 mt-1">
                    {Array.isArray(proj.technologies)
                      ? proj.technologies.join(", ")
                      : proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {hasContent(data.skills) && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <div
            className="text-gray-700 ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.skills }}
          />
        </section>
      )}

      {hasContent(data.certifications) && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Certificates and Awards
          </h2>
          <div
            className="text-gray-700 ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.certifications }}
          />
        </section>
      )}

      {hasContent(data.interests) && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium"
            style={{ color: accentColor }}
          >
            Hobbies and Interests
          </h2>
          <div
            className="text-gray-700 ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: data.interests }}
          />
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;