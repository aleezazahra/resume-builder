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

// ── helpers ──────────────────────────────────────────────────────────────────

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

/** Generate a unique resume ID like "res_a3f9b2c1" */
const generateId = () =>
  "res_" + Math.random().toString(36).slice(2, 10);

const loadResumes = (): Resume[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveResumes = (resumes: Resume[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));

// ─────────────────────────────────────────────────────────────────────────────

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

  // Load from localStorage on mount
  useEffect(() => {
    setAllResumes(loadResumes());
  }, []);

  // ── Create ────────────────────────────────────────────────────────────────
  const createResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newResume: Resume = {
      _id: generateId(),           // ✅ unique ID every time
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
    saveResumes(updated);              // ✅ persists to localStorage

    setTitle("");
    setShowCreateResume(false);
    navigate(`/app/builder/${newResume._id}`);
  };

  // ── Upload ────────────────────────────────────────────────────────────────
  const uploadResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newResume: Resume = {
      _id: generateId(),             // ✅ unique ID every time
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
    saveResumes(updated);              // ✅ persists to localStorage

    setTitle("");
    setUploadFile(null);
    setShowUploadResume(false);
    navigate(`/app/builder/${newResume._id}`);
  };

  // ── Edit title ────────────────────────────────────────────────────────────
  const handleEditTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    const updated = allResumes.map((r) =>
      r._id === editResumeId
        ? { ...r, title: editTitle.trim(), updatedAt: new Date().toISOString() }
        : r
    );
    setAllResumes(updated);
    saveResumes(updated);              // ✅ persists
    setEditResumeId("");
    setEditTitle("");
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const deleteResume = (resumeId: string) => {
    if (!window.confirm("Delete this resume? This cannot be undone.")) return;
    const updated = allResumes.filter((r) => r._id !== resumeId);
    setAllResumes(updated);
    saveResumes(updated);              // ✅ persists
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <p className="text-xl font-medium mb-8">Welcome, Aleeza Zahra</p>

        {/* ── Quick actions ── */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button
            onClick={() => { setTitle(""); setShowCreateResume(true); }}
            className="w-full sm:w-36 h-48 flex flex-col items-center justify-center gap-3
              border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500
              hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            <PlusIcon className="size-6" />
            Create Resume
          </button>

          <button
            onClick={() => { setTitle(""); setUploadFile(null); setShowUploadResume(true); }}
            className="w-full sm:w-36 h-48 flex flex-col items-center justify-center gap-3
              border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-500
              hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            <UploadIcon className="size-6" />
            Upload Resume
          </button>
        </div>

        {/* ── Resume grid ── */}
        {allResumes.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No resumes yet — create or upload one above.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResumes.map((resume, index) => {
              const color = colors[index % colors.length];
              return (
                <button
                  key={resume._id}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="relative w-full sm:w-36 h-48 flex flex-col items-center justify-center
                    gap-2 border-2 rounded-xl bg-white hover:shadow-md transition"
                  style={{ borderColor: color }}
                >
                  <FilePenIcon className="size-6 text-slate-500" />

                  <p className="text-sm font-medium text-center px-2 leading-tight" style={{ color }}>
                    {resume.title}
                  </p>

                  <p className="text-xs text-slate-400">
                    {resume.updatedAt
                      ? `Updated ${new Date(resume.updatedAt).toLocaleDateString()}`
                      : "No date"}
                  </p>

                  {/* Trash + Edit — stop propagation so card click doesn't fire */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 flex gap-1.5"
                  >
                    <button
                      onClick={() => deleteResume(resume._id)}
                      className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition"
                      title="Delete"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                    <button
                      onClick={() => { setEditResumeId(resume._id); setEditTitle(resume.title); }}
                      className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
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

      {/* ── CREATE modal ───────────────────────────────────────────────────── */}
      {showCreateResume && (
        <div
          onClick={() => setShowCreateResume(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
        >
          <form
            onSubmit={createResume}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl relative"
          >
            <button
              type="button"
              onClick={() => setShowCreateResume(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              <XIcon className="size-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Create Resume</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume title"
              required
              className="border border-slate-200 rounded-lg w-full px-3 py-2 mb-4
                text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg
                text-sm font-medium transition"
            >
              Create
            </button>
          </form>
        </div>
      )}

      {/* ── UPLOAD modal ───────────────────────────────────────────────────── */}
      {showUploadResume && (
        <div
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
        >
          <form
            onSubmit={uploadResume}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl relative"
          >
            <button
              type="button"
              onClick={() => setShowUploadResume(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              <XIcon className="size-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resume title"
              required
              className="border border-slate-200 rounded-lg w-full px-3 py-2 mb-3
                text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="flex flex-col items-center justify-center border-2 border-dashed
              border-slate-200 rounded-lg p-4 mb-4 cursor-pointer hover:border-blue-400 transition">
              <UploadIcon className="size-5 text-slate-400 mb-1" />
              <span className="text-sm text-slate-500">
                {uploadFile ? uploadFile.name : "Select PDF"}
              </span>
              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg
                text-sm font-medium transition"
            >
              Upload
            </button>
          </form>
        </div>
      )}

      {/* ── EDIT TITLE modal ───────────────────────────────────────────────── */}
      {editResumeId && (
        <div
          onClick={() => setEditResumeId("")}
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
        >
          <form
            onSubmit={handleEditTitle}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl relative"
          >
            <button
              type="button"
              onClick={() => setEditResumeId("")}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              <XIcon className="size-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Rename Resume</h2>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="New title"
              required
              className="border border-slate-200 rounded-lg w-full px-3 py-2 mb-4
                text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg
                text-sm font-medium transition"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;