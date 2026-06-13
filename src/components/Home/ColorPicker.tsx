import { Check, Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ onChange, selectedColor }) => {
    const colors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Indigo", value: "#6366F1" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Green", value: "#10B981" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F97316" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Pink", value: "#EC4899" },
        { name: "Gray", value: "#6B7280" },
        { name: "Black", value: "#1F2937" }
    ];

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 hover:ring ring-purple-200 transition-all px-3 py-2 rounded-lg"
            >
                <Palette size={16} />
                <span className="max-sm:hidden">Accent</span>
            </button>

            {isOpen && (
                <div className="grid grid-cols-5 w-64 gap-3 absolute top-full left-0 mt-2 z-10 bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                    {colors.map((color) => {
                        const isActive = selectedColor === color.value;

                        return (
                            <div
                                key={color.value}
                                onClick={() => {
                                    onChange(color.value);
                                    setIsOpen(false);
                                }}
                                className="relative cursor-pointer group flex flex-col items-center"
                            >
                                <div className="relative w-10 h-10">
                                    <div
                                        className={`w-full h-full rounded-full border-2 transition-all ${
                                            isActive
                                                ? "border-purple-500 scale-105 shadow-sm"
                                                : "border-transparent group-hover:border-gray-300"
                                        }`}
                                        style={{ backgroundColor: color.value }}
                                    />

                                    {isActive && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Check className="size-4 text-white drop-shadow-sm" />
                                        </div>
                                    )}
                                </div>

                                <p className="text-[10px] font-medium text-center mt-1 text-gray-500 truncate w-full">
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