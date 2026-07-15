import { GraduationCap, Plus, Trash } from "lucide-react"

interface Education {
    institution: string;
    degree: string;
    field: string;
    graduation_date: string;
    gpa: string;
    is_current: boolean;
    end_date?: string;
}

interface EducationformProps {
    data: Education[];
    onChange: (data: Education[]) => void;
}

const Educationform = ({ data, onChange }: EducationformProps) => {

    const addEducatione = () => {
        const newEducation: Education = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
            is_current: false,
        }
        onChange([...data, newEducation])
    }

    const removeEducation = (index: number) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
    }

    const updateEducation = (index: number, field: keyof Education, value: string | boolean) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }

        if (field === "is_current" && value) {
            updated[index].end_date = "";
        }
        onChange(updated)
    }

    return (
        <div>
            <div className="space-y-6 ">
                <div className="flex items-center justify-between ">

                    <button onClick={addEducatione} className="btn px-8 flex">
                        <Plus className="size-4" />
                        Add Education
                    </button>
                </div>

                {data.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 border border-dashed  rounded-lg">
                        <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300 mt-4" />
                        <p className="text-sm">No education added yet</p>
                        <p className="mt-3">Add education to get started</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data.map((education, index) => (
                            <div key={index} className="p-4 border border-gray-400 rounded-lg space-y-3">
                                <div className="flex justify-between items-start">
                                    <h4>Education #{index + 1}</h4>
                                    <button onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700 transition-colors">
                                        <Trash className="size-4" />
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3 ">
                                    <input value={education.institution || ""} onChange={(e) => updateEducation(index, "institution", e.target.value)} type="text" placeholder="Institute name" className="px-3 border border-white/30 py-2 text-sm border-dashed" />
                                    <input value={education.degree || ""} onChange={(e) => updateEducation(index, "degree", e.target.value)} type="text" placeholder="Degree name" className="px-3 py-2 text-sm border border-dashed  border-white/30" />
                                    <input value={education.field || ""} onChange={(e) => updateEducation(index, "field", e.target.value)} type="text" placeholder="Field of study" className="px-3 py-2 text-sm rounded-lg border-dashed border-white/30 border" />
                                    <input value={education.graduation_date || ""} onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} type="month" className="px-3 py-2 text-sm border border-dashed border-white/30 " />
                                    <input value={education.gpa || ""} onChange={(e) => updateEducation(index, "gpa", e.target.value)} type="text" placeholder="GPA/Grade (optional)" className="px-3 py-2 text-sm border border-dashed border-white/30" />
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={education.is_current || false} onChange={(e) => updateEducation(index, "is_current", e.target.checked)} />
                                        <span className="text-sm">Currently studying here</span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Educationform;