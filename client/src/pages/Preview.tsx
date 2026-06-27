import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Share2,
  CheckCircle,
  Lock,
  FileX,
  Loader2,
  Pencil,
} from "lucide-react";

import ResumePreviewer from "../components/Home/ResumePreviewer";

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
  interests:string;
  languages: any[];
  socials: any[];
  template: string;
  accent_color: string;
  public: boolean;
}

type Status = "loading" | "not_found" | "ready";

const PAGE_WIDTH_PX = 794; 
const PAGE_HEIGHT_PX = 1123; 

const Preview = () => {
  const { resumeID } = useParams();

  const [resumeData, setResumeData] = useState<ResumeStructure | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [isPrinting, setIsPrinting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState(1);

  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("resumes") || "[]");
      const resume = all.find((r: any) => r._id === resumeID);

      if (!resume) {
        setStatus("not_found");
        return;
      }
   

      setResumeData(resume);
      document.title = resume.title ? `${resume.title} — Resume` : "Resume Preview";
      setStatus("ready");
    } catch {
      setStatus("not_found");
    }
  }, [resumeID]);


  useEffect(() => {
    const updateScale = () => {
      const available = window.innerWidth - 32; 
      setScale(Math.min(1, available / PAGE_WIDTH_PX));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);



  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="size-6 text-white/40 animate-spin" />
      </div>
    );
  }

  if (status === "not_found") {
    return (
      <EmptyState
        icon={FileX}
        title="Resume not found"
        subtitle="This link doesn't match any resume we could find. It may have been deleted, or the link is incomplete."
      />
    );
  }


  if (!resumeData) return null;

  return (
    <div className="min-h-screen bg-black font-sans">
      <header className="sticky top-0 z-20 bg-black border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors shrink-0"
            >
              <ArrowLeft className="size-4" />
              Home
            </Link>
            <span className="text-white/20 select-none">|</span>
            <h1 className="text-sm font-semibold text-white/80 truncate">
              {resumeData.title || "Untitled Resume"}
            </h1>
          </div>

          
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center">
        <div
          style={{
            width: PAGE_WIDTH_PX * scale,
            height: PAGE_HEIGHT_PX * scale,
          }}
        >
          <div
            ref={resumeRef}
            style={{
              width: "210mm",
              minHeight: "297mm",
              background: "white",
              boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
              boxSizing: "border-box",
              overflow: "hidden",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
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

      <footer className="text-center text-xs text-white/30 pb-8">
        Made with Rsume ·{" "}
        <Link to="/" className="underline hover:text-white/60">
          Build your own
        </Link>
      </footer>
    </div>
  );
};

const EmptyState = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof FileX;
  title: string;
  subtitle: string;
}) => (
  <div className="min-h-screen bg-black flex items-center justify-center px-4">
    <div className="text-center max-w-sm">
      <div className="size-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="size-5 text-white/40" />
      </div>
      <h1 className="text-white text-lg font-semibold mb-2">{title}</h1>
      <p className="text-white/50 text-sm mb-6">{subtitle}</p>
      <Link to="/" className="btn-filled btn-sm inline-flex">
        <ArrowLeft className="size-4" />
        Back to dashboard
      </Link>
    </div>
  </div>
);

export default Preview;