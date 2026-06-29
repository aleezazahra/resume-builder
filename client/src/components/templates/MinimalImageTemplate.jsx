import { Mail, Phone, MapPin } from "lucide-react";
import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

const normalizeUrl = (url) => {
    if (!url) return "#";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const hasContent = (html) => html && html.replace(/<[^>]*>/g, "").trim().length > 0;

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800">
            <div className="grid grid-cols-3">
                <div className="col-span-1 py-10">
                    {data.personal_info?.image && typeof data.personal_info.image === "string" ? (
                        <div className="mb-6">
                            <img
                                src={data.personal_info.image}
                                alt="Profile"
                                className="w-38 h-38 object-cover rounded-full mx-auto"
                               
                            />
                        </div>
                    ) : data.personal_info?.image && typeof data.personal_info.image === "object" ? (
                        <div className="mb-6">
                            <img
                                src={URL.createObjectURL(data.personal_info.image)}
                                alt="Profile"
                                className="w-32 h-32 object-cover rounded-full mx-auto"
                            />
                        </div>
                    ) : null}
                </div>

                <div className="col-span-2 flex flex-col justify-center py-10 px-8">
                    <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                </div>

                

                <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">
                    <section className="mb-8">
                        <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">CONTACT</h2>
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
                            {data.personal_info?.title && (
                                <div className="flex items-center gap-2">
                                    <Mail size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.title}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {data.socials && data.socials.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">SOCIALS</h2>
                            <div className="space-y-2 text-sm">
                                {data.socials.map((social, index) => {
                                    const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform);
                                    return (
                                        <a
                                            key={index}
                                            href={normalizeUrl(social.url)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 hover:underline"
                                        >
                                            <span className="flex items-center" style={{ color: accentColor }}>
                                                {platform?.icon}
                                            </span>
                                            <span>{social.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">EDUCATION</h2>
                            <div className="space-y-4 text-sm">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold uppercase">{edu.degree}</p>
                                        <p className="text-zinc-600">{edu.institution}</p>
                                        <p className="text-xs text-zinc-500">{formatDate(edu.graduation_date)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.skills && data.skills.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">SKILLS</h2>
                            <ul className="space-y-1 text-sm">
                                {data.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.languages && data.languages.length > 0 && (
                        <section>
                            <h2 className="text-sm font-semibold tracking-widest text-zinc-600 mb-3">LANGUAGES</h2>
                            <ul className="space-y-1 text-sm">
                                {data.languages.map((lang, index) => (
                                    <li key={index}>
                                        {lang.name}
                                        {lang.level && <span className="text-zinc-500"> – {lang.level}</span>}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>

                <main className="col-span-2 p-8 pt-0">
                    {hasContent(data.professional_summary) && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest mb-3" style={{ color: accentColor }}>
                                SUMMARY
                            </h2>
                            <div
                                className="text-zinc-700 leading-relaxed text-sm ql-editor !p-0"
                                dangerouslySetInnerHTML={{ __html: data.professional_summary }}
                            />
                        </section>
                    )}

                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: accentColor }}>
                                EXPERIENCE
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-zinc-900">{exp.position}</h3>
                                            <span className="text-xs text-zinc-500">
                                                {formatDate(exp.start_date)} –{" "}
                                                {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-sm mb-2" style={{ color: accentColor }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.project && data.project.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm uppercase tracking-widest font-semibold mb-4" style={{ color: accentColor }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-4">
                                {data.project.map((project, index) => (
                                    <div key={index}>
                                        <h3 className="text-md font-medium text-zinc-800 mt-3">{project.name}</h3>
                                        {project.description && (
                                            <p className="text-sm text-zinc-700 mt-1">{project.description}</p>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link.startsWith("http") ? project.link : `https://${project.link}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-zinc-500 underline"
                                            >
                                                {project.link}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasContent(data.certifications) && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest mb-3" style={{ color: accentColor }}>
                                CERTIFICATIONS AND AWARDS
                            </h2>
                            <div
                                className="text-zinc-700 leading-relaxed text-sm ql-editor !p-0"
                                dangerouslySetInnerHTML={{ __html: data.certifications }}
                            />
                        </section>
                    )}

                    {hasContent(data.interests) && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest mb-3" style={{ color: accentColor }}>
                                INTERESTS AND HOBBIES
                            </h2>
                            <div
                                className="text-zinc-700 leading-relaxed text-sm ql-editor !p-0"
                                dangerouslySetInnerHTML={{ __html: data.interests }}
                            />
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MinimalImageTemplate;