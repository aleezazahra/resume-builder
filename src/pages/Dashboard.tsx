import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  XIcon,
  PlusIcon,
  UploadIcon,
  FilePenIcon,
  TrashIcon,
  PencilIcon,
} from "lucide-react";

const STORAGE_KEY = "resumes";

type Resume = {
  _id: string;
  title: string;
  updatedAt: string;
  personal_info: Record<string, any>;
  professional_summary: string;
  experience: any[];
  education: any[];
  project: any[];
  skills: any[];
  template: string;
  accent_color: string;
  public: boolean;
};

const generateId = () => "res_" + Math.random().toString(36).slice(2, 10);

const loadResumes = (): Resume[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
};

const saveResumes = (resumes: Resume[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState<Resume[]>([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => { setAllResumes(loadResumes()); }, []);

  const createResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newResume: Resume = {
      _id: generateId(),
      title: title.trim(),
      updatedAt: new Date().toISOString(),
      personal_info: {},
      professional_summary: "",
      experience: [],
      education: [],
      project: [],
      skills: [],
      template: "classic",
      accent_color: "#3882F6",
      public: false,
    };
    const updated = [newResume, ...allResumes];
    setAllResumes(updated);
    saveResumes(updated);
    setTitle("");
    setShowCreateResume(false);
    navigate(`/app/builder/${newResume._id}`);
  };

  const uploadResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newResume: Resume = {
      _id: generateId(),
      title: title.trim(),
      updatedAt: new Date().toISOString(),
      personal_info: {},
      professional_summary: "",
      experience: [],
      education: [],
      project: [],
      skills: [],
      template: "classic",
      accent_color: "#3882F6",
      public: false,
    };
    const updated = [newResume, ...allResumes];
    setAllResumes(updated);
    saveResumes(updated);
    setTitle("");
    setUploadFile(null);
    setShowUploadResume(false);
    navigate(`/app/builder/${newResume._id}`);
  };

  const handleEditTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    const updated = allResumes.map((r) =>
      r._id === editResumeId
        ? { ...r, title: editTitle.trim(), updatedAt: new Date().toISOString() }
        : r
    );
    setAllResumes(updated);
    saveResumes(updated);
    setEditResumeId("");
    setEditTitle("");
  };

  const deleteResume = (resumeId: string) => {
    if (!window.confirm("Delete this resume? This cannot be undone.")) return;
    const updated = allResumes.filter((r) => r._id !== resumeId);
    setAllResumes(updated);
    saveResumes(updated);
  };

  const inputClass = "w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition";

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <p className="text-xl font-medium text-white mb-8">Welcome, Aleeza Zahra</p>

        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={() => { setTitle(""); setShowCreateResume(true); }}
            className="w-full sm:w-36 h-48 flex flex-col items-center justify-center gap-3
              border border-dashed border-white/20 rounded-xl text-sm text-white/40
              hover:border-white/60 hover:text-white hover:bg-white/5 transition"
          >
            <PlusIcon className="size-6" />
            Create Resume
          </button>

          <button
            onClick={() => { setTitle(""); setUploadFile(null); setShowUploadResume(true); }}
            className="w-full sm:w-36 h-48 flex flex-col items-center justify-center gap-3
              border border-dashed border-white/20 rounded-xl text-sm text-white/40
              hover:border-white/60 hover:text-white hover:bg-white/5 transition"
          >
            <UploadIcon className="size-6" />
            Upload Resume
          </button>
        </div>

        {allResumes.length === 0 ? (
          <p className="text-white/30 text-sm">No resumes yet — create or upload one above.</p>
        ) : (
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResumes.map((resume, index) => {
              const color = colors[index % colors.length];
              return (
                <button
                  key={resume._id}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="relative w-full sm:w-36 h-48 flex flex-col items-center justify-center
                    gap-2 border rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
                  style={{ borderColor: color + "55" }}
                >
                  <FilePenIcon className="size-6 text-white/40" />
                  <p className="text-sm font-medium text-center px-2 leading-tight" style={{ color }}>
                    {resume.title}
                  </p>
                  <p className="text-xs text-white/30">
                    {resume.updatedAt
                      ? `Updated ${new Date(resume.updatedAt).toLocaleDateString()}`
                      : "No date"}
                  </p>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 flex gap-1"
                  >
                    <button
                      onClick={() => deleteResume(resume._id)}
                      className="p-1 rounded text-white/20 hover:text-red-400 hover:bg-white/5 transition"
                      title="Delete"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                    <button
                      onClick={() => { setEditResumeId(resume._id); setEditTitle(resume.title); }}
                      className="p-1 rounded text-white/20 hover:text-white hover:bg-white/5 transition"
                      title="Rename"
                    >
                      <PencilIcon className="size-4" />
                    </button>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {showCreateResume && (
        <div
          onClick={() => setShowCreateResume(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
        >
          <form
            onSubmit={createResume}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-sm shadow-2xl relative"
          >
            <button type="button" onClick={() => setShowCreateResume(false)}
              className="absolute top-3 right-3 text-white/30 hover:text-white transition">
              <XIcon className="size-5" />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">Create Resume</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume title" required className={inputClass + " mb-4"} />
            <button type="submit" className="btn-filled w-full justify-center">Create</button>
          </form>
        </div>
      )}

      {showUploadResume && (
        <div
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
        >
          <form
            onSubmit={uploadResume}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-sm shadow-2xl relative"
          >
            <button type="button" onClick={() => setShowUploadResume(false)}
              className="absolute top-3 right-3 text-white/30 hover:text-white transition">
              <XIcon className="size-5" />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">Upload Resume</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume title" required className={inputClass + " mb-3"} />
            <label className="flex flex-col items-center justify-center border border-dashed
              border-white/20 rounded-lg p-4 mb-4 cursor-pointer hover:border-white/40 transition">
              <UploadIcon className="size-5 text-white/30 mb-1" />
              <span className="text-sm text-white/40">
                {uploadFile ? uploadFile.name : "Select PDF"}
              </span>
              <input type="file" hidden accept=".pdf"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
            </label>
            <button type="submit" className="btn-filled w-full justify-center">Upload</button>
          </form>
        </div>
      )}

      {editResumeId && (
        <div
          onClick={() => setEditResumeId("")}
          className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
        >
          <form
            onSubmit={handleEditTitle}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-sm shadow-2xl relative"
          >
            <button type="button" onClick={() => setEditResumeId("")}
              className="absolute top-3 right-3 text-white/30 hover:text-white transition">
              <XIcon className="size-5" />
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">Rename Resume</h2>
            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
              placeholder="New title" required className={inputClass + " mb-4"} />
            <button type="submit" className="btn-filled w-full justify-center">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;