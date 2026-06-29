import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

// Helper: Checks if a string or HTML content exists and is not just empty tags
const hasContent = (content) => {
    if (!content) return false;
    const stripped = content.replace(/<[^>]*>?/gm, "").trim();
    return stripped.length > 0;
};

const normalizeUrl = (url) => {
    if (!url) return "#";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const MinimalTemplate = ({ data, accentColor }) => {
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
                        <a 
                            href={normalizeUrl(data.personal_info.website)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline break-all"
                        >
                            {data.personal_info.website}
                        </a>
                    )}
                </div>

                {/* Fixed: Changed professional_summarry to professional_summary */}
                {hasContent(data.professional_summary) && (
                    <section className="mt-8 mb-4">
                        <h2 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: accentColor }}>
                            Summary
                        </h2>
                        <div
                            className="text-gray-700 ql-editor !p-0"
                            dangerouslySetInnerHTML={{ __html: data.professional_summary }}
                        />
                    </section>
                )}

                {data.socials && data.socials.length > 0 && (
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-3">
                        {data.socials.map((social, index) => {
                            const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform);
                            return (
                                <a
                                    key={index}
                                    href={normalizeUrl(social.url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 hover:underline"
                                    style={{ color: accentColor }}
                                >
                                    <span className="flex items-center">{platform?.icon}</span>
                                    <span>{social.label}</span>
                                </a>
                            );
                        })}
                    </div>
                )}
            </header>

            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
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
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.project && data.project.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <h3 className="text-lg font-medium">{proj.name}</h3>
                                <p className="text-gray-600">{proj.description}</p>
                                {proj.link && (
                                    <a
                                        href={normalizeUrl(proj.link)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 underline text-sm"
                                    >
                                        {proj.link}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Education
                    </h2>
                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">{formatDate(edu.graduation_date)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {hasContent(data.certifications) && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
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
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Hobbies and Interests
                    </h2>
                    <div
                        className="text-gray-700 ql-editor !p-0"
                        dangerouslySetInnerHTML={{ __html: data.interests }}
                    />
                </section>
            )}

            {/* Fixed: Mapping skill objects instead of joining directly */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Skills
                    </h2>
                    <div className="text-gray-700">
                        {data.skills.map(s => (typeof s === 'string' ? s : s.name)).join(" • ")}
                    </div>
                </section>
            )}

            {data.languages && data.languages.length > 0 && (
                <section>
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                        Languages
                    </h2>
                    <div className="text-gray-700 flex flex-wrap gap-x-2">
                        {data.languages.map((lang, index) => (
                            <span key={index}>
                                {lang.name}
                                {lang.level && <span className="text-gray-500"> ({lang.level})</span>}
                                {index < data.languages.length - 1 && <span className="text-gray-400"> •</span>}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default MinimalTemplate;

