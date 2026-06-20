import { Plus, X } from "lucide-react";
import { useState } from "react";

type Language = { name: string; level: string };

type LanguagesProps = {
  data: Language[];
  onChange: (langs: Language[]) => void;
};

const Languages = ({ data, onChange }: LanguagesProps) => {
  const [newLang, setNewLang] = useState<Language>({ name: "", level: "" });
  const isValid = newLang.name.trim() && newLang.level.trim();

  const addLanguage = () => {
    if (isValid) {
      onChange([...data, { ...newLang }]);
      setNewLang({ name: "", level: "" });
    }
  };

  const removeLanguage = (index: number) => onChange(data.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Language (e.g. Japanese)"
            className="w-1/2 py-2 px-3 text-sm border border-gray-600 rounded bg-transparent"
            value={newLang.name}
            onChange={(e) => setNewLang({ ...newLang, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Level (e.g. Native)"
            className="w-1/2 py-2 px-3 text-sm border border-gray-600 rounded bg-transparent"
            value={newLang.level}
            onChange={(e) => setNewLang({ ...newLang, level: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && addLanguage()}
          />
        </div>
        <button
          onClick={addLanguage}
          disabled={!isValid}
          className="flex items-center justify-center gap-2 py-2 px-4 text-sm border border-gray-600 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          <Plus className="size-4" />
          Add Language
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((lang, index) => (
            <div
              key={index}
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 border border-gray-600 rounded-full text-sm"
            >
              <span className="font-medium">{lang.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                {lang.level}
              </span>
              <button
                onClick={() => removeLanguage(index)}
                className="opacity-50 hover:opacity-100 transition-opacity"
                aria-label={`Remove ${lang.name}`}
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p className="text-sm">No languages added yet</p>
        </div>
      )}
    </div>
  );
};

export default Languages;