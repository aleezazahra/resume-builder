
// Adjust this relative path if TechTemplate.jsx doesn't live next to the
// "Home" folder that contains AddSocials.tsx (e.g. components/Templates/ vs components/Home/)
import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

const normalizeUrl = (url) => {
    if (!url) return "#";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const TechTemplate = ({ data, accentColor }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-sans text-sm">
      {/* Header Section */}
      <header className="border-b-2 border-gray-800 pb-3 mb-4">
        <h1 className="text-3xl font-bold">{data.personal_info?.full_name}</h1>
        <p className="text-gray-700 font-medium mb-3">{data.personal_info?.headline || data.personal_info?.title}</p>
        <div className="flex flex-wrap gap-x-4 text-gray-600">
          <span className="hover:underline cursor-pointer">{data.personal_info?.email}</span> | 
          <span>{data.personal_info?.phone}</span> | 
          <span>{data.personal_info?.location}</span> | 
          <a href={data.personal_info?.website} className="underline" style={{ color: accentColor }}>{data.personal_info?.website}</a>
        </div>
      </header>

      {data.socials && data.socials.length > 0 && (
        <section className="mb-6">
          <h2 className="font-bold mb-2" style={{ color: accentColor }}>Socials</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {data.socials.map((social, i) => {
              const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform);
              return (
                <a
                  key={i}
                  href={normalizeUrl(social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-700 hover:text-black hover:underline"
                >
                  <span className="flex items-center" style={{ color: accentColor }}>{platform?.icon}</span>
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </section>
      )}

      <section className="mb-6">
        <h2 className="font-bold border-b border-gray-300 mb-2" style={{ color: accentColor }}>Summary</h2>
        <p className="leading-relaxed">{data.professional_summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold border-b border-gray-300 mb-3" style={{ color: accentColor }}>Experience</h2>
        {data.experience?.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-gray-900">{exp.position}</span>
              <span className="text-gray-600 text-xs">{exp.date}</span>
            </div>
            <p className="text-gray-700 italic">{exp.company}</p>
            <p className="text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="font-bold border-b border-gray-300 mb-3" style={{ color: accentColor }}>Education</h2>
        {data.education?.map((edu, i) => (
          <div key={i} className="flex justify-between items-baseline mb-1">
            <div>
                <span className="font-bold">{edu.institution}</span>
                <p className="text-gray-700">{edu.degree}</p>
            </div>
            <span className="text-gray-600">{edu.date}</span>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="font-bold border-b border-gray-300 mb-3" style={{ color: accentColor }}>Projects</h2>
        {data.project?.map((proj, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between items-baseline">
              <span className="font-bold">{proj.name}</span>
              <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
              target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs">{proj.link}</a>
            </div>
            <p className="text-gray-700">{proj.description}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="font-bold border-b border-gray-300 mb-3" style={{ color: accentColor }}>Skills</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {data.skills?.map((cat, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                {cat}
              </h3>
              <p className="text-gray-700 leading-tight">
                {Array.isArray(cat.items) ? cat.items.join(", ") : cat.items}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section>
          <h2 className="font-bold border-b border-gray-300 mb-3" style={{ color: accentColor }}>Languages</h2>
          <p className="text-gray-700">
            {data.languages.map((lang, i) => (
              <span key={i}>
                {lang.name}
                {lang.level && <span className="text-gray-500"> ({lang.level})</span>}
                {i < data.languages.length - 1 && "   |   "}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  );
};

export default TechTemplate;