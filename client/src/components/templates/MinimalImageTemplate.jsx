import { Mail, Phone, MapPin } from "lucide-react";
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
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const parts = dateStr.split("-");
        if (parts.length < 2) return dateStr;
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    if (!data) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800">
            <div className="grid grid-cols-3">
                <div className="col-span-1 py-10">
                    {data.personal_info?.image && (
                        <div className="mb-6">
                            <img
                                src={typeof data.personal_info.image === "string" 
                                    ? data.personal_info.image 
                                    : URL.createObjectURL(data.personal_info.image)}
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
                        </div>
                    </section>

                    {hasContent(data.skills) && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest mb-3" style={{ color: accentColor }}>
                                SKILLS
                            </h2>
                            <div
                                className="text-zinc-700 leading-relaxed text-sm ql-editor !p-0"
                                dangerouslySetInnerHTML={{ __html: data.skills }}
                            />
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
                </main>
            </div>
        </div>
    );
};

export default MinimalImageTemplate;