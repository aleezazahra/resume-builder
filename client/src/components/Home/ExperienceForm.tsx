import {
  Briefcase,
  Plus,
  Sparkles,
  Trash,
  Loader2,
} from "lucide-react";
import { useState } from "react";

const ExperienceForm = ({ data = [], onChange }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleEnhanceDesc = async (index) => {
    const description = data[index]?.description || "";

    if (!description.trim()) return;

    setLoadingIndex(index);

    try {
      const response = await fetch("/api/ai/enhance-job-des", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userContent: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to enhance");
      }

      const result = await response.json();

      if (result.enhancedContent) {
        const updated = [...data];

        updated[index] = {
          ...updated[index],
          description: result.enhancedContent,
        };

        onChange(updated);
      }
    } catch (error) {
      console.error("Failed to enhance:", error);
    } finally {
      setLoadingIndex(null);
    }
  };

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    if (field === "is_current" && value) {
      updated[index].end_date = "";
    }

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addExperience}
          className="btn flex items-center gap-2 py-2 px-4 text-sm"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
          <Briefcase className="w-10 h-10 mx-auto mb-3 text-gray-300" />
          <p className="text-sm font-medium">
            No work experience added yet
          </p>
          <p className="text-xs">
            Click "Add Experience" to get started
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-5 border border-gray-600 rounded-xl shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-200">
                  Experience #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company name"
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="text"
                  placeholder="Job title"
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="month"
                  disabled={experience.is_current}
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm text-gray-300">
                  Currently working here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Job description
                  </label>

                  <button
                    type="button"
                    onClick={() => handleEnhanceDesc(index)}
                    disabled={loadingIndex === index}
                    className="flex items-center gap-1 px-3 py-1 text-xs btn"
                  >
                    {loadingIndex === index ? (
                      <Loader2 className="animate-spin" size={17} />
                    ) : (
                      <Sparkles size={17} />
                    )}

                    {loadingIndex === index
                      ? "Enhancing..."
                      : "AI Enhance"}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe your responsibilities and achievements"
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;