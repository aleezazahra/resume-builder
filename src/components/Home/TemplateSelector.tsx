import { Check, Layout } from "lucide-react";
import { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const templates = [
        { id: "classic",       name: "Classic",       preview: "A clean, traditional resume format with clear sections and typography" },
        { id: "modern",        name: "Modern",        preview: "Sleek design with strategic use of color and modern font choices" },
        { id: "minimal-image", name: "Minimal Image", preview: "Minimal design with a single image and clean typography" },
        { id: "minimal",       name: "Minimal",       preview: "Ultra-clean design that puts your content front and center" },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-sm"
            >
                <Layout size={14} />
                <span className="max-sm:hidden">Template</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 p-3 space-y-2 z-10
                    bg-zinc-900 border border-white/10 rounded-xl shadow-2xl">
                    {templates.map((template) => {
                        const active = selectedTemplate === template.id;
                        return (
                            <div
                                key={template.id}
                                onClick={() => { onChange(template.id); setIsOpen(false); }}
                                className={`relative p-3 border rounded-lg cursor-pointer transition-all
                                    ${active
                                        ? "border-white/40 bg-white/10"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                    }`}
                            >
                                {active && (
                                    <div className="absolute top-3 right-2 size-5 bg-white rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-black" />
                                    </div>
                                )}
                                <h4 className="font-medium text-white text-sm">{template.name}</h4>
                                <p className="text-xs text-white/40 mt-0.5">{template.preview}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;