import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2,
  Sparkles,
  User,
  Award,
  CheckCircle,
  LanguagesIcon,
  Link2,
  Wrench,
  Building2Icon,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../configs/api.ts"; 

import PersonalInfoForm from "../components/Home/PersonalInfoForm";
import ResumePreviewer from "../components/Home/ResumePreviewer";
import TemplateSelector from "../components/Home/TemplateSelector";
import ColorPicker from "../components/Home/ColorPicker";
import Summaryform from "../components/Home/Summaryform";
import ExperienceForm from "../components/Home/ExperienceForm";
import Educationform from "../components/Home/Educationform";
import ProjectsForm from "../components/Home/ProjectsForm";
import Languages from "../components/Home/Languages";
import SkillsForm from "../components/Home/SkillsForm";
import AddSocials from "../components/Home/AddSocials";
import Certifications from "../components/Home/Certifications.tsx";
import type { Social } from "../components/Home/AddSocials";
import type { Language } from "../components/Home/Languages";

interface ResumeStructure {
  _id: string;
  title: string;
  personal_info: Record<string, any>;
  professional_summary: string;
  experience: any[];
  education: any[];
  project: any[];
  skills: any[];
  certifications:string;
  languages: Language[];
  socials: Social[];
  template: string;
  accent_color: string;
  public: boolean;
}

const EMPTY_RESUME: ResumeStructure = {
  _id: "",
  title: "",
  personal_info: {},
  professional_summary: "",
  experience: [],
  education: [],
  project: [],
  skills: [],
  certifications:"",
  languages: [],
  socials: [],
  template: "classic",
  accent_color: "#3882F6",
  public: false,
};

const sections = [
  { id: "personal",   name: "Personal Info", icon: User          },
  { id: "summary",    name: "Summary",       icon: FileText      },
  { id: "experience", name: "Experience",    icon: Building2Icon      },
  { id: "education",  name: "Education",     icon: GraduationCap },
  { id: "projects",   name: "Projects",      icon: FolderIcon    },
  { id: "skills",     name: "Skills",        icon: Wrench     },
  { id: "languages",  name: "Languages",     icon: LanguagesIcon },
  { id: "socials",    name: "Socials",       icon: Link2         },
  {id:"certifications",name:"Certifications and Courses",icon:Award}
];

const Builder = () => {
  const { resumeID } = useParams();

  const [resumeData, setResumeData] = useState<ResumeStructure>(EMPTY_RESUME);
  const [loading, setLoading] = useState(true);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!resumeID) return;
    setLoading(true);
    api
      .get(`/api/resume/get/${resumeID}`)
      .then(({ data }) => {
        setResumeData((prev) => ({ ...prev, ...data.resume }));
        document.title = data.resume.title || "Resume Builder";
      })
      .catch((error) => {
  console.log(error.response?.data);

  if (error.response?.status === 404) {
    toast.error("Resume not found");
  } else {
    toast.error(
      error.response?.data?.message ||
      "Failed to load resume"
    );
  }
})
      .finally(() => {
        setLoading(false);
    
        setTimeout(() => { isInitialized.current = true; }, 0);
      });
  }, [resumeID]);

 
  useEffect(() => {
    if (!isInitialized.current || !resumeData._id) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        setIsSaving(true);
        const formData = new FormData();
        formData.append("resumeId", resumeData._id);
        formData.append("resumeData", JSON.stringify(resumeData));
     
        await api.put("/api/resume/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch {
        
      } finally {
        setIsSaving(false);
      }
    }, 1500);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [resumeData, removeBackground]);


  const handlePrint = useCallback(() => {
    if (!resumeRef.current) return;
    const styleId = "resume-print-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @media print {
          body > * { display: none !important; }
          #resume-print-portal { display: block !important; }
          @page { size: A4 portrait; margin: 0; }
          html, body {
            width: 210mm !important; height: 297mm !important;
            margin: 0 !important; padding: 0 !important;
            background: white !important; background-color: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact; color-adjust: exact;
          }
          #resume-print-portal {
            position: fixed; inset: 0; z-index: 99999;
            background: white !important; background-color: white !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    let portal = document.getElementById("resume-print-portal");
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "resume-print-portal";
      document.body.appendChild(portal);
    }
    portal.innerHTML = "";
    const clone = resumeRef.current.cloneNode(true) as HTMLElement;
    clone.style.cssText = "width:210mm;min-height:297mm;margin:0;padding:0;box-sizing:border-box;background:white;";
    portal.appendChild(clone);
    setIsPrinting(true);
    requestAnimationFrame(() => {
      window.print();
      setIsPrinting(false);
      portal!.innerHTML = "";
    });
  }, []);


  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/view/${resumeID}`;
    if (navigator.share) {
      try { await navigator.share({ title: "My Resume", text: "Check out my resume", url }); } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      prompt("Copy this link:", url);
    }
  }, [resumeID]);

  const activeSection = sections[activeSectionIndex];
  const isFirst = activeSectionIndex === 0;
  const isLast  = activeSectionIndex === sections.length - 1;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/40 text-sm animate-pulse">Loading resume…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans">

      <header className="sticky top-0 z-20 bg-black border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4" />
            Dashboard
          </Link>
          <span className="text-white/20 select-none">|</span>
          <h1 className="text-sm font-semibold text-white/80 truncate">
            {resumeData.title || "Untitled Resume"}
          </h1>
     
          {isSaving && (
            <span className="ml-auto text-xs text-white/30 animate-pulse">Saving…</span>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6 items-start">

          <aside className="lg:col-span-5 flex flex-col gap-4">

            <div className="bg-zinc-900 rounded-xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-4 sm:grid-cols-8">
                {sections.map((s, i) => {
                  const Icon = s.icon;
                  const active = i === activeSectionIndex;
                  return (
                  <button
  key={s.id}
  onClick={() => setActiveSectionIndex(i)}
  title={s.name}
  className={`relative group flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors border-b-2
    ${active
      ? "border-white text-white bg-white/5"
      : "border-transparent text-white/30 hover:text-white/60 hover:bg-white/5"
    }`}
>
  <Icon className="size-4" />
       <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-medium bg-zinc-700 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-75 delay-0 pointer-events-none z-50"
  style={{ transitionDelay: '0ms' }}
>
  {s.name}
</span>
</button>
                
                  );
                })}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-white/10 p-6">
              <h2 className="text-base font-semibold text-white mb-5">
                {activeSection.name}
              </h2>

              {activeSection.id === "personal" && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(data) => setResumeData((p) => ({ ...p, personal_info: data }))}
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}
              {activeSection.id === "summary" && (
                <Summaryform
                  data={resumeData.professional_summary}
                  onChange={(data) => setResumeData((p) => ({ ...p, professional_summary: data }))}
                />
              )}
              {activeSection.id === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) => setResumeData((p) => ({ ...p, experience: data }))}
                />
              )}
              {activeSection.id === "education" && (
                <Educationform
                  data={resumeData.education}
                  onChange={(data) => setResumeData((p) => ({ ...p, education: data }))}
                />
              )}
              {activeSection.id === "projects" && (
                <ProjectsForm
                  data={resumeData.project}
                  onChange={(data) => setResumeData((p) => ({ ...p, project: data }))}
                />
              )}
              {activeSection.id === "skills" && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) => setResumeData((p) => ({ ...p, skills: data }))}
                />
              )}
              {activeSection.id==="certifications" &&(
                <Certifications data={resumeData.certifications}
                 onChange={(data) => setResumeData((p) => ({ ...p, certifications: data }))}
                />
              )

              }
              {activeSection.id === "languages" && (
                <Languages
                  data={resumeData.languages}
                  onChange={(data) => setResumeData((p) => ({ ...p, languages: data }))}
                />
              )}
              {activeSection.id === "socials" && (
                <AddSocials
                  data={resumeData.socials}
                  onChange={(data) => setResumeData((p) => ({ ...p, socials: data }))}
                />
              )}

              <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveSectionIndex((p) => Math.max(p - 1, 0))}
                  disabled={isFirst}
                  className="btn btn-sm disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="size-4" /> Back
                </button>
                <button
                  onClick={() => setActiveSectionIndex((p) => Math.min(p + 1, sections.length - 1))}
                  disabled={isLast}
                  className="btn-filled btn-sm disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7 flex flex-col gap-4">

            <div className="bg-zinc-900 rounded-xl border border-white/10 px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onChange={(t) => setResumeData((p) => ({ ...p, template: t }))}
                />
                <ColorPicker
                  selectedColor={resumeData.accent_color}
                  onChange={(c) => setResumeData((p) => ({ ...p, accent_color: c }))}
                />
              </div>

              <div className="flex items-center gap-2">
                <button onClick={handleShare} className="btn btn-sm">
                  {copied
                    ? <><CheckCircle className="size-4" /> Copied!</>
                    : <><Share2 className="size-4" /> Share</>
                  }
                </button>

                <button
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="btn-filled btn-sm disabled:opacity-50"
                >
                  <Download className="size-4" />
                  {isPrinting ? "Preparing…" : "Download PDF"}
                </button>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-xl p-4 flex justify-center overflow-auto">
              <div
                ref={resumeRef}
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  background: "white",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                <ResumePreviewer
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;