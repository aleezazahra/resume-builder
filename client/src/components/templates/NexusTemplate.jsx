import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

const normalizeUrl = (url) => {
    if (!url) return "#";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const hasContent = (html) => html && html.replace(/<[^>]*>/g, "").trim().length > 0;

const NexusTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto flex leading-relaxed bg-white text-gray-900 font-sans">
            <aside className="w-1/3 shrink-0 p-8 text-white flex flex-col gap-8" style={{ backgroundColor: accentColor }}>
                {data.personal_info?.image && typeof data.personal_info.image === "string" ? (
                    <div className="mb-2">
                        <img
                            src={data.personal_info.image}
                            alt="Profile"
                            className="w-36 h-36 object-cover rounded-full mx-auto"
                            style={{ background: accentColor + "70" }}
                        />
                    </div>
                ) : data.personal_info?.image && typeof data.personal_info.image === "object" ? (
                    <div className="mb-2">
                        <img
                            src={URL.createObjectURL(data.personal_info.image)}
                            alt="Profile"
                            className="w-36 h-36 object-cover rounded-full mx-auto"
                        />
                    </div>
                ) : null}

                <h1 className="text-3xl font-bold">{data.personal_info?.full_name || "Your Name"}</h1>

                {data.personal_info?.title && (
                    <p className="text-sm opacity-80 -mt-6">{data.personal_info.title}</p>
                )}

                <section>
                    <h2 className="text-sm uppercase tracking-wider font-bold mb-4 opacity-80">Contact</h2>
                    <div className="space-y-2 text-sm opacity-90">
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="size-4 shrink-0" />
                                <span className="break-all min-w-0">{data.personal_info.email}</span>
                            </div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="size-4 shrink-0" />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="size-4 shrink-0" />
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.website && (
                            <div className="flex items-center gap-2">
                                <Globe className="size-4 shrink-0" />
                                <span className="break-all min-w-0">{data.personal_info.website}</span>
                            </div>
                        )}
                    </div>
                </section>

                {data.socials && data.socials.length > 0 && (
                    <section>
                        <h2 className="text-sm uppercase tracking-wider font-bold mb-4 opacity-80">Connect</h2>
                        <div className="space-y-3">
                            {data.socials.map((social, i) => {
                                const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform);
                                return (
                                    <a
                                        key={i}
                                        href={normalizeUrl(social.url)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100"
                                    >
                                        <span className="flex items-center">{platform?.icon}</span>
                                        <span>{social.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                )}

                {data.languages && data.languages.length > 0 && (
                    <section>
                        <h2 className="text-sm uppercase tracking-wider font-bold mb-4 opacity-80">Languages</h2>
                        <div className="space-y-2">
                            {data.languages.map((lang, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <span>{lang.name}</span>
                                    {lang.level && <span className="text-xs opacity-75">{lang.level}</span>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h2 className="text-sm uppercase tracking-wider font-bold mb-4 opacity-80">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/20">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            <main className="w-2/3 min-w-0 p-8 flex flex-col gap-6 overflow-hidden">
                {hasContent(data.professional_summary) && (
                    <section>
                        <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                            SUMMARY
                        </h2>
                        <div
                            className="text-gray-700 leading-relaxed text-sm break-words min-w-0 w-full ql-editor !p-0"
                            dangerouslySetInnerHTML={{ __html: data.professional_summary }}
                        />
                    </section>
                )}

                {data.experience && data.experience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                            PROFESSIONAL EXPERIENCE
                        </h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
                                            <p className="text-gray-700 text-sm font-medium">{exp.company}</p>
                                        </div>
                                        <div className="text-right text-xs text-gray-500 shrink-0 ml-4">
                                            <p>
                                                {formatDate(exp.start_date)} –{" "}
                                                {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </p>
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.project && data.project.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                            PROJECTS
                        </h2>
                        <div className="space-y-3">
                            {data.project.map((proj, i) => (
                                <div key={i} className="border-l-2 border-gray-300 pl-4">
                                    <p className="font-semibold text-gray-800 text-sm">{proj.name}</p>
                                    <p className="text-gray-600 text-sm">{proj.description}</p>
                                    {proj.link && (
                                        <a
                                            href={proj.link.startsWith("http") ? proj.link : `https://${proj.link}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs underline text-gray-500"
                                        >
                                            {proj.link}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {hasContent(data.certifications) && (
                    <section>
                        <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                            CERTIFICATIONS AND AWARDS
                        </h2>
                        <div
                            className="text-gray-700 leading-relaxed text-sm break-words min-w-0 w-full ql-editor !p-0"
                            dangerouslySetInnerHTML={{ __html: data.certifications }}
                        />
                    </section>
                )}

                {hasContent(data.interests) && (
                    <section>
                        <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                            INTERESTS AND HOBBIES
                        </h2>
                        <div
                            className="text-gray-700 leading-relaxed text-sm break-words min-w-0 w-full ql-editor !p-0"
                            dangerouslySetInnerHTML={{ __html: data.interests }}
                        />
                    </section>
                )}

                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                            EDUCATION
                        </h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-700 text-sm">{edu.institution}</p>
                                        {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                                    </div>
                                    <div className="text-xs text-gray-500 shrink-0 ml-4">
                                        <p>{formatDate(edu.graduation_date)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default NexusTemplate;