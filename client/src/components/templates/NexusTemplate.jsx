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

const NexusTemplate = ({ data, accentColor }) => {
    if (!data) return <div className="p-10 text-center">Loading...</div>;

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const parts = dateStr.split("-");
        if (parts.length < 2) return dateStr;
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-4xl mx-auto flex leading-relaxed bg-white text-gray-900 font-sans shadow-lg">
            {/* Sidebar */}
            <aside className="w-1/3 shrink-0 p-8 text-white flex flex-col gap-8" style={{ backgroundColor: accentColor }}>
                {data.personal_info?.image && (
                    <div className="mb-2">
                        <img
                            src={typeof data.personal_info.image === "string" 
                                ? data.personal_info.image 
                                : URL.createObjectURL(data.personal_info.image)}
                            alt="Profile"
                            className="w-36 h-36 object-cover rounded-full mx-auto border-2 border-white/20"
                        />
                    </div>
                )}

                <h1 className="text-3xl font-bold leading-tight">{data.personal_info?.full_name || "Your Name"}</h1>
                {data.personal_info?.title && <p className="text-sm opacity-80 -mt-6">{data.personal_info.title}</p>}

                <section>
                    <h2 className="text-sm uppercase tracking-wider font-bold mb-4 opacity-80">Contact</h2>
                    <div className="space-y-2 text-sm opacity-90">
                        {data.personal_info?.email && (
                            <div className="flex items-center gap-2"><Mail className="size-4 shrink-0" /><span>{data.personal_info.email}</span></div>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-2"><Phone className="size-4 shrink-0" /><span>{data.personal_info.phone}</span></div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-2"><MapPin className="size-4 shrink-0" /><span>{data.personal_info.location}</span></div>
                        )}
                    </div>
                </section>

                {/* Fixed SKILLS section */}
                {hasContent(data.skills) && (
                    <section>
                        <h2 className="text-sm uppercase tracking-wider font-bold mb-3">SKILLS</h2>
                        <div className="text-sm opacity-90 ql-editor !p-0" dangerouslySetInnerHTML={{ __html: data.skills }} />
                    </section>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-2/3 min-w-0 p-8 flex flex-col gap-6">
                {hasContent(data.professional_summary) && (
                    <section>
                        <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>SUMMARY</h2>
                        <div className="text-gray-700 text-sm ql-editor !p-0" dangerouslySetInnerHTML={{ __html: data.professional_summary }} />
                    </section>
                )}

                {data.experience?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>PROFESSIONAL EXPERIENCE</h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="border-l-2 pl-4" style={{ borderColor: accentColor }}>
                                    <h3 className="font-semibold text-gray-900 text-sm">{exp.position}</h3>
                                    <p className="text-gray-700 text-sm font-medium mb-1">{exp.company}</p>
                                    <p className="text-xs text-gray-500 mb-2">{formatDate(exp.start_date)} – {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    {exp.description && <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.project?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>PROJECTS</h2>
                        <div className="space-y-3">
                            {data.project.map((proj, i) => (
                                <div key={i} className="border-l-2 border-gray-300 pl-4">
                                    <p className="font-semibold text-gray-800 text-sm">{proj.name}</p>
                                    <p className="text-gray-600 text-sm">{proj.description}</p>
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