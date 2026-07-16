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
  Heart,
  Home,
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
import Interests from "../components/Home/Interest.tsx";

interface ResumeStructure {
  _id: string;
  title: string;
  personal_info: Record<string, any>;
  professional_summary: string;
  experience: any[];
  education: any[];
  project: any[];
  skills: string; // Fixed: Changed from any[] to string
  certifications: string;
  interests: string;
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
  skills: "", // Fixed: Changed from [] to ""
  certifications: "",
  interests: "",
  languages: [],
  socials: [],
  template: "classic",
  accent_color: "#3882F6",
  public: false,
};

const sections = [
  { id: "personal", name: "Personal Info", icon: User },
  { id: "summary", name: "Summary", icon: FileText },
  { id: "experience", name: "Experience", icon: Building2Icon },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "projects", name: "Projects", icon: FolderIcon },
  { id: "skills", name: "Skills", icon: Wrench },
  { id: "languages", name: "Languages", icon: LanguagesIcon },
  { id: "socials", name: "Socials", icon: Link2 },
  { id: "certifications", name: "Certifications and Courses", icon: Award },
  { id: "interests", name: "Interests", icon: Heart }
];

const Builder = () => {
  const { resumeId } = useParams();
  const isGuest = !resumeId;

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
    if (!resumeId) {
      setLoading(false);
      isInitialized.current = true;
      return;
    }
    setLoading(true);
    api
      .get(`/api/resume/get/${resumeId}`)
      .then(({ data }) => {
        setResumeData((prev) => ({ ...prev, ...data.resume }));
        document.title = data.resume.title || "Resume Builder";
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          toast.error("Resume not found");
        } else {
          toast.error(error.response?.data?.message || "Failed to load resume");
        }
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => { isInitialized.current = true; }, 0);
      });
  }, [resumeId]);

  useEffect(() => {
    if (isGuest || !isInitialized.current || !resumeData._id) return;

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
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      @media print {
        body > * { display: none !important; }
        #resume-print-portal { display: block !important; }
        @page { size: A4 portrait; margin: 0; }
        html, body { width: 210mm !important; margin: 0 !important; }
        #resume-print-portal { position: absolute; top: 0; left: 0; width: 210mm; background: white !important; }
      }
    `;

    let portal = document.getElementById("resume-print-portal");
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "resume-print-portal";
      document.body.appendChild(portal);
    }
    portal.innerHTML = "";
    const clone = resumeRef.current.cloneNode(true) as HTMLElement;
    clone.style.cssText = "width:210mm;margin:0;padding:0;background:white;";
    portal.appendChild(clone);

    setIsPrinting(true);
    requestAnimationFrame(() => {
      window.print();
      setIsPrinting(false);
      portal!.innerHTML = "";
    });
  }, []);

  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/view/${resumeId}`;
    if (navigator.share) {
      try { await navigator.share({ title: "My Resume", text: "Check out my resume", url }); } catch { }
      return;
    }
    if (isGuest) { toast.error("login to get a shareable link"); return; }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { prompt("Copy this link:", url); }
  }, [resumeId, isGuest]);

  const activeSection = sections[activeSectionIndex];

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white/40">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-black font-sans">
      <header className="sticky top-0 z-20 bg-black border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link to="/app" className="inline-flex items-center gap-1.5 text-sm text-white/50"><ArrowLeft className="size-4" /> Dashboard</Link>
          <span className="text-white/20">|</span>
          <h1 className="text-sm font-semibold text-white/80">{resumeData.title || "Untitled Resume"}</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-zinc-900 rounded-xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-4 sm:grid-cols-8">
                {sections.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <button key={s.id} onClick={() => setActiveSectionIndex(i)} className={`py-3 flex flex-col items-center ${i === activeSectionIndex ? "bg-white/5 border-b-2 border-white" : "text-white/30"}`}>
                      <Icon className="size-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-white/10 p-6">
              <h2 className="text-base font-semibold text-white mb-5">{activeSection.name}</h2>
              {activeSection.id === "personal" && <PersonalInfoForm data={resumeData.personal_info} onChange={(d) => setResumeData((p) => ({ ...p, personal_info: d }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />}
              {activeSection.id === "summary" && <Summaryform data={resumeData.professional_summary} onChange={(d) => setResumeData((p) => ({ ...p, professional_summary: d }))} />}
              {activeSection.id === "experience" && <ExperienceForm data={resumeData.experience} onChange={(d) => setResumeData((p) => ({ ...p, experience: d }))} />}
              {activeSection.id === "education" && <Educationform data={resumeData.education} onChange={(d) => setResumeData((p) => ({ ...p, education: d }))} />}
              {activeSection.id === "projects" && <ProjectsForm data={resumeData.project} onChange={(d) => setResumeData((p) => ({ ...p, project: d }))} />}
              {activeSection.id === "skills" && <SkillsForm data={resumeData.skills} onChange={(d) => setResumeData((p) => ({ ...p, skills: d as string }))} />}
              {activeSection.id === "certifications" && <Certifications data={resumeData.certifications} onChange={(d) => setResumeData((p) => ({ ...p, certifications: d }))} />}
              {activeSection.id === "interests" && <Interests data={resumeData.interests} onChange={(d) => setResumeData((p) => ({ ...p, interests: d }))} />}
              {activeSection.id === "languages" && <Languages data={resumeData.languages} onChange={(d) => setResumeData((p) => ({ ...p, languages: d }))} />}
              {activeSection.id === "socials" && <AddSocials data={resumeData.socials} onChange={(d) => setResumeData((p) => ({ ...p, socials: d }))} />}
            </div>
          </aside>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-zinc-900 rounded-xl border border-white/10 p-4 flex gap-2">
              <TemplateSelector selectedTemplate={resumeData.template} onChange={(t) => setResumeData((p) => ({ ...p, template: t }))} />
              <ColorPicker selectedColor={resumeData.accent_color} onChange={(c) => setResumeData((p) => ({ ...p, accent_color: c }))} />
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 overflow-auto">
              <div ref={resumeRef} style={{ width: "210mm", minHeight: "297mm", background: "white" }}>
                <ResumePreviewer data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;