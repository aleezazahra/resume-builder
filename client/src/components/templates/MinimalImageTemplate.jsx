import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

const normalizeUrl = (url) => {
  if (!url) return "#";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const hasContent = (html) => {
  if (typeof html !== "string") return false;
  return html.replace(/<[^>]*>/g, "").trim().length > 0;
};

const MinimalImageTemplate = ({ data, accentColor }) => {
  if (!data) return <div className="p-10 text-center">Loading...</div>;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length < 2) return dateStr;
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "short" }
    );
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      <div className="grid grid-cols-3">
        <div className="col-span-1 py-10">
          {data.personal_info?.image && (
            <div className="mb-6">
              <img
                src={
                  typeof data.personal_info.image === "string"
                    ? data.personal_info.image
                    : URL.createObjectURL(data.personal_info.image)
                }
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}
        </div>

        <div className="col-span-2 flex flex-col justify-center py-10 px-8">
          <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.title && (
            <p className="text-zinc-500 tracking-wide mt-2">
              {data.personal_info.title}
            </p>
          )}
        </div>

        <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
              {data.personal_info?.website && (
                
               <a   href={normalizeUrl(data.personal_info.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Globe size={14} style={{ color: accentColor }} />
                  <span className="break-all">{data.personal_info.website}</span>
                </a>
              )}
            </div>
          </section>

          {data.personal_info?.socials?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">
                SOCIALS
              </h2>
              <div className="space-y-2 text-sm">
                {data.personal_info.socials.map((social, index) => {
                  const platform = SOCIAL_PLATFORMS.find((p) => p.key === social.platform);
                  if (!platform || !social.url) return null;
                  const Icon = platform.icon;
                  return (
                    
                    <a  key={index}
                      href={normalizeUrl(social.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {Icon && <Icon size={14} style={{ color: accentColor }} />}
                      <span className="break-all">{social.url}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {hasContent(data.skills) && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                SKILLS
              </h2>
              <div
                className="text-zinc-700 leading-relaxed text-sm ql-editor !p-0"
                dangerouslySetInnerHTML={{ __html: data.skills }}
              />
            </section>
          )}

          {hasContent(data.certifications) && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                CERTIFICATIONS
              </h2>
              <div
                className="text-zinc-700 leading-relaxed text-sm ql-editor !p-0"
                dangerouslySetInnerHTML={{ __html: data.certifications }}
              />
            </section>
          )}

          {hasContent(data.interests) && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                INTERESTS
              </h2>
              <div
                className="text-zinc-700 leading-relaxed text-sm ql-editor !p-0"
                dangerouslySetInnerHTML={{ __html: data.interests }}
              />
            </section>
          )}
        </aside>

        <main className="col-span-2 p-8 pt-0">
          {hasContent(data.professional_summary) && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-3"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <div
                className="text-zinc-700 leading-relaxed text-sm ql-editor !p-0"
                dangerouslySetInnerHTML={{ __html: data.professional_summary }}
              />
            </section>
          )}

          {data.experience?.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-zinc-800">{exp.position}</h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 mb-1">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-zinc-700 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.education?.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                EDUCATION
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-zinc-800">
                        {edu.degree}
                        {edu.field_of_study ? `, ${edu.field_of_study}` : ""}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(edu.start_date)} -{" "}
                        {edu.is_current ? "Present" : formatDate(edu.end_date)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-zinc-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects?.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-4"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-zinc-800">{proj.name}</h3>
                      {proj.link && (
                        
                       <a   href={normalizeUrl(proj.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs underline"
                          style={{ color: accentColor }}
                        >
                          Link
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-sm text-zinc-700 mt-1">{proj.description}</p>
                    )}
                    {proj.technologies && (
                      <p className="text-xs text-zinc-500 mt-1">
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
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;