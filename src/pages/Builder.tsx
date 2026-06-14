import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowBigLeftIcon, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User } from "lucide-react";
import PersonalInfoForm from "../components/Home/PersonalInfoForm";
import ResumePreviewer from "../components/Home/ResumePreviewer";
import TemplateSelector from "../components/Home/TemplateSelector";
import ColorPicker from "../components/Home/ColorPicker";
import Summaryform from "../components/Home/Summaryform";
import ExperienceForm from "../components/Home/ExperienceForm";

interface ResumeStructure {
    _id: string;
    title: string;
    personal_info: Record<string, any>;
    professional_summary: string;
    experience: any[];
    education: any[];
    project: any[];
    skills: string[];
    template: string;
    accent_color: string;
    public: boolean;
}

const Builder = () => {
    const { resumeId } = useParams();

    const [resumeData, setResumeData] = useState<ResumeStructure>({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3882F6",
        public: false,
    });

    const loadExistingResume = async () => {
        const resume = dummyResumeData.find(resume => resume._id == resumeId);
        if (resume) {
            setResumeData(prev => ({
                ...prev,
                ...resume
            }));
            document.title = resume.title;
        }
    };

    const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
    const [removeBackground, setRemoveBackground] = useState(false);

    useEffect(() => {
        loadExistingResume();
    }, [resumeId]);

    useEffect(() => {
        console.log(resumeData.accent_color);
    }, [resumeData.accent_color]);

    const sections = [
        { id: "personal", name: "personal info", icon: User },
        { id: "summary", name: "Summary", icon: FileText },
        {id:"experience",name:"Experience" ,icon:FileText},
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "projects", name: "Projects", icon: FolderIcon },
        { id: "skills", name: "Skills", icon: Sparkles },
    ];

    const activeSelection = sections[activeSectionIndex];

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link to={`/app`} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
                    <ArrowBigLeftIcon className="size-4 " />Back to Dashboard
                </Link>
            </div>

            <div className="maz-w-7xl mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-12 gap-8">

                    <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">

                            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />

                            <hr
                                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                                style={{
                                    width: `${activeSectionIndex * 100 / (sections.length - 1)}%`
                                }}
                            />

                            <div className="flex items-center gap-2">

                                <div className="flex justify-between items-center mb-6 border border-gray-300 py-1">
                                    <TemplateSelector
                                        selectedTemplate={resumeData.template}
                                        onChange={(template) =>
                                            setResumeData(prev => ({ ...prev, template }))
                                        }
                                    />

                                    <ColorPicker
                                        selectedColor={resumeData.accent_color}
                                        onChange={(color) =>
                                            setResumeData(prev => ({ ...prev, accent_color: color }))
                                        }
                                    />
                                </div>

                                <div className="flex items-center">

                                    {activeSectionIndex !== 0 && (
                                        <button
                                            onClick={() =>
                                                setActiveSectionIndex(prev => Math.max(prev - 1, 0))
                                            }
                                            className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                                            disabled={activeSectionIndex === 0}
                                        >
                                            <ChevronLeft className="size-4" /> Previous
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            setActiveSectionIndex(prev =>
                                                Math.min(prev + 1, sections.length - 1)
                                            )
                                        }
                                        className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && "opacity-50"}`}
                                        disabled={activeSectionIndex === sections.length - 1}
                                    >
                                        <ChevronRight className="size-4" /> Next
                                    </button>

                                </div>
                            </div>

                            <div className="space-y-6">

                                {activeSelection.id === 'personal' && (
                                    <PersonalInfoForm
                                        data={resumeData.personal_info}
                                        onChange={(data) =>
                                            setResumeData(prev => ({
                                                ...prev,
                                                personal_info: data
                                            }))
                                        }
                                        removeBackground={removeBackground}
                                        setRemoveBackground={setRemoveBackground}
                                    />
                                )}
                                {
                                    activeSelection.id==='summary'&&(
                                        <Summaryform data={resumeData.professional_summary} onChange={(data)=>
                                            setResumeData(prev=>({
                                                ...prev,
                                                professional_summary:data
                                            })
                                           
                                        )
                                        }  setResumeData={setResumeData}/>
                                    )
                                }
                                  {
                                    activeSelection.id==='experience'&&(
                                        <ExperienceForm data={resumeData.experience} onChange={(data)=>
                                            setResumeData(prev=>({
                                                ...prev,
                                               experience:data
                                            })
                                           
                                        )
                                        }  />
                                    )
                                }


                            </div>

                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-slate-100 rounded-lg p-4 border border-slate-200 min-h-[800px] sticky top-6">

                        <div className="mb-4 flex justify-between items-center">
                            <div></div>
                        </div>

                        <ResumePreviewer
                            data={resumeData}
                            template={resumeData.template}
                            accentColor={resumeData.accent_color}
                        />

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Builder;