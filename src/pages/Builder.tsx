import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2,
  Sparkles,
  User,
  CheckCircle,
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

const sections = [
  { id: "personal",    name: "Personal Info", icon: User         },
  { id: "summary",     name: "Summary",       icon: FileText     },
  { id: "experience",  name: "Experience",    icon: FileText     },
  { id: "education",   name: "Education",     icon: GraduationCap},
  { id: "projects",    name: "Projects",      icon: FolderIcon   },
  { id: "skills",      name: "Skills",        icon: Sparkles     },
];

const Builder = () => {
  const { resumeID } = useParams();
  const resumeId = resumeID;

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
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);

  /* ── Load resume from localStorage ──────────────────────── */
  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("resumes") || "[]");
      const resume = all.find((r: any) => r._id === resumeId);
      if (resume) {
        setResumeData((prev) => ({ ...prev, ...resume }));
        document.title = resume.title || "Resume Builder";
      }
    } catch {
      // nothing stored yet
    }
  }, [resumeId]);

  /* ── Save resume to localStorage whenever data changes ───── */
  useEffect(() => {
    if (!resumeData._id) return; // don't save empty state
    try {
      const all: any[] = JSON.parse(localStorage.getItem("resumes") || "[]");
      const idx = all.findIndex((r) => r._id === resumeData._id);
      const updated = { ...resumeData, updatedAt: new Date().toISOString() };
      if (idx >= 0) {
        all[idx] = updated;
      } else {
        all.unshift(updated);
      }
      localStorage.setItem("resumes", JSON.stringify(all));
    } catch {
      // storage full or unavailable
    }
  }, [resumeData]);

  /* ── Print / Download (proper A4) ───────────────────────── */
  const handlePrint = useCallback(() => {
    if (!resumeRef.current) return;

    // Inject a dedicated print style into <head> once
    const styleId = "resume-print-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @media print {
          /* Hide everything on the page … */
          body > *                { display: none !important; }
          /* … except our portal root */
          #resume-print-portal    { display: block !important; }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            color-adjust: exact;
          }

          #resume-print-portal {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: white;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Create / reuse a print portal
    let portal = document.getElementById("resume-print-portal");
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "resume-print-portal";
      document.body.appendChild(portal);
    }

    // Clone the resume node into the portal
    portal.innerHTML = "";
    const clone = resumeRef.current.cloneNode(true) as HTMLElement;
    clone.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background: white;
    `;
    portal.appendChild(clone);

    setIsPrinting(true);
    requestAnimationFrame(() => {
      window.print();
      setIsPrinting(false);
      portal!.innerHTML = "";
    });
  }, []);

  /* ── Share / Copy link ───────────────────────────────────── */
  const handleShare = useCallback(async () => {
    const url = `${window.location.origin}/view/${resumeId}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "My Resume", text: "Check out my resume", url });
      } catch {
        // user cancelled – silent
      }
      return;
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Last resort
      prompt("Copy this link:", url);
    }
  }, [resumeId]);

  /* ── Visibility toggle ───────────────────────────────────── */
  const changeVisibility = () =>
    setResumeData((prev) => ({ ...prev, public: !prev.public }));

  const activeSection = sections[activeSectionIndex];
  const isFirst = activeSectionIndex === 0;
  const isLast  = activeSectionIndex === sections.length - 1;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Top bar ───────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Dashboard
          </Link>

          <span className="text-slate-300 select-none">|</span>

          <h1 className="text-sm font-semibold text-slate-700 truncate">
            {resumeData.title || "Untitled Resume"}
          </h1>
        </div>
      </header>

      {/* ── Main grid ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6 items-start">

          {/* ── LEFT: editor panel ──────────────────────── */}
          <aside className="lg:col-span-5 flex flex-col gap-4">

            {/* Section tabs */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 sm:grid-cols-6">
                {sections.map((s, i) => {
                  const Icon = s.icon;
                  const active = i === activeSectionIndex;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSectionIndex(i)}
                      className={`flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors border-b-2
                        ${active
                          ? "border-blue-500 text-blue-600 bg-blue-50"
                          : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      <Icon className="size-4" />
                      <span className="hidden sm:block">{s.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-base font-semibold text-slate-800 mb-5">
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

              {/* Prev / Next */}
              <div className="flex justify-between mt-8 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setActiveSectionIndex((p) => Math.max(p - 1, 0))}
                  disabled={isFirst}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                    text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="size-4" /> Back
                </button>

                <button
                  onClick={() => setActiveSectionIndex((p) => Math.min(p + 1, sections.length - 1))}
                  disabled={isLast}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium
                    text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* ── RIGHT: preview ──────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Action bar */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 flex items-center justify-between gap-2 flex-wrap">

              {/* Left: Template + Color */}
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

              {/* Right: Visibility / Share / Download */}
              <div className="flex items-center gap-2">

              {/* Visibility */}
              <button
                onClick={changeVisibility}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition
                  ${resumeData.public
                    ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {resumeData.public ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                {resumeData.public ? "Public" : "Private"}
              </button>

              {/* Share (only when public) */}
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border
                    border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition"
                >
                  {copied
                    ? <><CheckCircle className="size-4 text-green-500" /> Copied!</>
                    : <><Share2 className="size-4" /> Share</>
                  }
                </button>
              )}

              {/* Download */}
              <button
                onClick={handlePrint}
                disabled={isPrinting}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold
                  text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition shadow-sm"
              >
                <Download className="size-4" />
                {isPrinting ? "Preparing…" : "Download PDF"}
              </button>

              </div>{/* end right group */}
            </div>{/* end action bar */}

            {/* A4 preview shell */}
            <div className="bg-slate-300 rounded-xl p-4 flex justify-center overflow-auto">
              {/*
                The outer div is just a visual frame.
                resumeRef points ONLY to the A4 content below —
                exactly what gets cloned for print.
              */}
              <div
                ref={resumeRef}
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  background: "white",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
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