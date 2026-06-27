import { Check, Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ onChange, selectedColor }) => {
    const colors = [
        { name: "Blue",   value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Green",  value: "#10B981" },
        { name: "Red",    value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal",   value: "#14B8A6" },
        { name: "Pink",   value: "#EC4899" },
        { name: "Gray",   value: "#6B7280" },
        { name: "Black",  value: "#1F2937" },
        {name:"hot pink",value:"#c213a2"},
        {name:"black2",value:"#1a1a1a"},
        {name:"um",value:"#5c9990"}
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="btn btn-sm"
            >
                <Palette size={16} />
                <span className="max-sm:hidden">Accent</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 z-10
                    bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-3
                    grid grid-cols-5 gap-3 w-52">
                    {colors.map((color) => {
                        const active = selectedColor === color.value;
                        return (
                            <div
                                key={color.value}
                                onClick={() => { onChange(color.value); setIsOpen(false); }}
                                className="flex flex-col items-center cursor-pointer group"
                            >
                                <div className="relative w-8 h-8">
                                    <div
                                        className={`w-full h-full rounded-full border-2 transition-all
                                            ${active
                                                ? "border-white scale-110 shadow-lg"
                                                : "border-transparent group-hover:border-white/40"
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                    />
                                    {active && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Check className="size-3.5 text-white drop-shadow" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-[9px] text-white/30 mt-1 truncate w-full text-center">
                                    {color.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ColorPicker;