import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowBigLeftIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  EyeIcon,
  EyeOff,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2,
  Sparkles,
  User
} from "lucide-react";

import PersonalInfoForm from "../components/Home/PersonalInfoForm";
import ResumePreviewer from "../components/Home/ResumePreviewer";
import TemplateSelector from "../components/Home/TemplateSelector";
import ColorPicker from "../components/Home/ColorPicker";
import Summaryform from "../components/Home/Summaryform";
import ExperienceForm from "../components/Home/ExperienceForm";
import Educationform from "../components/Home/Educationform";
import ProjectsForm from "../components/Home/ProjectsForm";
import SkillsForm from "../components/Home/SkillsForm";

interface ResumeStructure {
  _id: string;
  title: string;
  personal_info: Record<string, any>;
  professional_summary: string;
  experience: any[];
  education: any[];
  project: any[];
  skills: any[];
  template: string;
  accent_color: string;
  public: boolean;
}

const Builder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState<ResumeStructure>({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3882F6",
    public: false
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: FileText },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles }
  ];

  const activeSelection = sections[activeSectionIndex];

  // LOAD RESUME
  const loadExistingResume = () => {
    const resume = dummyResumeData.find(
      (r) => r._id === resumeId
    );

    if (resume) {
      setResumeData((prev) => ({
        ...prev,
        ...resume
      }));

      document.title = resume.title || "Resume Builder";
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  // VISIBILITY TOGGLE
  const ChangeResumeVisiblity = () => {
    setResumeData((prev) => ({
      ...prev,
      public: !prev.public
    }));
  };

  // SHARE
  const handleShare = () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({
        title: "My Resume",
        text: "Check out my resume",
        url: resumeUrl
      });
    } else {
      alert("Share not supported");
    }
  };

  // DOWNLOAD
  const DownloadResume = () => {
    window.print();
  };

  return (
    <div>
      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700"
        >
          <ArrowBigLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}
          <div className="lg:col-span-5 bg-white rounded-lg border p-6">

            {/* TOP CONTROLS */}
            <div className="flex justify-between items-center mb-4">
              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(template) =>
                  setResumeData((prev) => ({
                    ...prev,
                    template
                  }))
                }
              />

              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(color) =>
                  setResumeData((prev) => ({
                    ...prev,
                    accent_color: color
                  }))
                }
              />
            </div>

            {/* NAV BUTTONS */}
            <div className="flex justify-between mb-6">
              <button
                disabled={activeSectionIndex === 0}
                onClick={() =>
                  setActiveSectionIndex((p) => Math.max(p - 1, 0))
                }
              >
                <ChevronLeft /> Prev
              </button>

              <button
                disabled={activeSectionIndex === sections.length - 1}
                onClick={() =>
                  setActiveSectionIndex((p) =>
                    Math.min(p + 1, sections.length - 1)
                  )
                }
              >
                Next <ChevronRight />
              </button>
            </div>

            {activeSelection.id === "personal" && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    personal_info: data
                  }))
                }
                removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}
              />
            )}

            {activeSelection.id === "summary" && (
              <Summaryform
                data={resumeData.professional_summary}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    professional_summary: data
                  }))
                }
              />
            )}

            {activeSelection.id === "experience" && (
              <ExperienceForm
                data={resumeData.experience}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    experience: data
                  }))
                }
              />
            )}

            {activeSelection.id === "education" && (
              <Educationform
                data={resumeData.education}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    education: data
                  }))
                }
              />
            )}

            {activeSelection.id === "projects" && (
              <ProjectsForm
                data={resumeData.project}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    project: data
                  }))
                }
              />
            )}

            {activeSelection.id === "skills" && (
              <SkillsForm
                data={resumeData.skills}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    skills: data
                  }))
                }
              />
            )}
          </div>

          {/* RIGHT PREVIEW */}
          <div className="lg:col-span-7 bg-slate-100 p-4 rounded-lg border sticky top-6">

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-2 mb-4">
              <button onClick={ChangeResumeVisiblity}>
                {resumeData.public ? <EyeIcon /> : <EyeOff />}
                {resumeData.public ? "Public" : "Private"}
              </button>

              {resumeData.public && (
                <button onClick={handleShare}>
                  <Share2 /> Share
                </button>
              )}

              <button onClick={DownloadResume}>
                <Download /> Download
              </button>
            </div>

            {/* PREVIEW */}
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