import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { SOCIAL_PLATFORMS } from "../Home/AddSocials";

const normalizeUrl = (url) => {
    if (!url) return "#";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

// Safe content check
const hasContent = (html) => {
    if (typeof html !== "string") return false;
    return html.replace(/<[^>]*>/g, "").trim().length > 0;
};

const ModernTemplate = ({ data, accentColor }) => {
    if (!data) return <div className="p-10 text-center">Loading...</div>;

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800">
            <header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
                <h1 className="text-4xl font-light mb-1">{data.personal_info?.full_name || "Your Name"}</h1>
                {data.personal_info?.title && <p className="text-white/90 mb-3">{data.personal_info.title}</p>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2"><Mail className="size-4 shrink-0" /><span>{data.personal_info.email}</span></div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2"><Phone className="size-4 shrink-0" /><span>{data.personal_info.phone}</span></div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2"><MapPin className="size-4 shrink-0" /><span>{data.personal_info.location}</span></div>
                    )}
                    {data.personal_info?.website && (
                        <a target="_blank" href={normalizeUrl(data.personal_info.website)} className="flex items-center gap-2">
                            <Globe className="size-4 shrink-0" />
                            <span className="break-all text-xs">{data.personal_info.website.replace(/^https?:\/\//, "")}</span>
                        </a>
                    )}
                </div>
            </header>

            <div className="p-8">
                {/* Summary */}
                {hasContent(data.professional_summary) && (
                    <section className="mb-8">
                        <div className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Summary</div>
                        <div className="text-gray-700 ql-editor !p-0" dangerouslySetInnerHTML={{ __html: data.professional_summary }} />
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">Experience</h2>
                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative pl-6 border-l border-gray-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
                                            <p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
                                        </div>
                                        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </div>
                                    </div>
                                    {exp.description && <div className="text-gray-700 mt-3 whitespace-pre-line">{exp.description}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {hasContent(data.skills) && (
                    <section className="mb-8">
                        <div className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Skills</div>
                        <div className="text-gray-700 ql-editor !p-0" dangerouslySetInnerHTML={{ __html: data.skills }} />
                    </section>
                )}

                {/* Footer Grid */}
                <div className="grid sm:grid-cols-2 gap-8">
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Education</h2>
                            {data.education.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                    <p style={{ color: accentColor }}>{edu.institution}</p>
                                    <span className="text-sm text-gray-500">{formatDate(edu.graduation_date)}</span>
                                </div>
                            ))}
                        </section>
                    )}

                    <div className="space-y-8">
                        {hasContent(data.certifications) && (
                            <section>
                                <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Certifications</h2>
                                <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: data.certifications }} />
                            </section>
                        )}
                        {data.languages?.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Languages</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.languages.map((lang, index) => (
                                        <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                                            {lang.name} {lang.level && `· ${lang.level}`}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;