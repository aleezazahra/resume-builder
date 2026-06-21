import { Check, Layout } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const templates = [
        { id: "classic", name: "Classic", preview: "A clean, traditional resume format." },
        { id: "modern", name: "Modern", preview: "Sleek design with strategic use of color." },
        { id: "minimal-image", name: "Minimal Image", preview: "Minimal design with a single image." },
        { id: "minimal", name: "Minimal", preview: "Ultra-clean, content-focused layout." },
        { id: "tech", name: "Tech", preview: "High-density layout designed for developers." },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors border border-white/10"
            >
                <Layout size={14} />
                <span className="max-sm:hidden">Template</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 p-2 space-y-1 z-50
                    bg-zinc-900 border border-white/10 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                    {templates.map((template) => {
                        const active = selectedTemplate === template.id;
                        return (
                            <div
                                key={template.id}
                                onClick={() => { onChange(template.id); setIsOpen(false); }}
                                className={`relative p-3 rounded-lg cursor-pointer transition-all border
                                    ${active
                                        ? "border-white/40 bg-white/10"
                                        : "border-transparent hover:border-white/10 hover:bg-white/5"
                                    }`}
                            >
                                {active && (
                                    <div className="absolute top-3 right-3 size-5 bg-white rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-black" />
                                    </div>
                                )}
                                <h4 className="font-medium text-white text-sm">{template.name}</h4>
                                <p className="text-xs text-white/50 mt-0.5 pr-6">{template.preview}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;