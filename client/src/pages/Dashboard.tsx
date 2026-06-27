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
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

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
  certifications:string;
  interests:string;
  template: string;
  accent_color: string;
  public: boolean;
};

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [allResumes, setAllResumes] = useState<Resume[]>([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await api.get("/api/resume/list");
        setAllResumes(data.resumes || []);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to load resumes"
        );
      }
    };

    if (user) {
      fetchResumes();
    }
  }, [user]);

  const createResume = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const { data } = await api.post("/api/resume/create", {
        title: title.trim(),
      });

      setAllResumes((prev) => [data.resume, ...prev]);

      setTitle("");
      setShowCreateResume(false);

      navigate(`/app/builder/${data.resume._id}`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create resume"
      );
    }
  };

  

const handleEditTitle = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!editTitle.trim()) return;

  try {
    await api.put("/api/resume/update", {
      resumeId: editResumeId,
    resumeData: {
  title: editTitle.trim(),
},
      removeBackground: false,
    });

    setAllResumes((prev) =>
      prev.map((resume) =>
        resume._id === editResumeId
          ? {
              ...resume,
              title: editTitle.trim(),
              updatedAt: new Date().toISOString(),
            }
          : resume
      )
    );

    setEditResumeId("");
    setEditTitle("");

    toast.success("Resume renamed");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to rename resume"
    );
  }
};

const deleteResume = async (resumeId: string) => {
  if (!window.confirm("Delete this resume?")) return;

  try {
    await api.delete(`/api/resume/delete/${resumeId}`);

    setAllResumes((prev) =>
      prev.filter((resume) => resume._id !== resumeId)
    );

    toast.success("Resume deleted");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message ||
        "Failed to delete resume"
    );
  }
};

const inputClass =
  "w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition";

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">

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

        
        </div>

        {allResumes.length === 0 ? (
          <p className="text-white/30 text-sm">No resumes yet — create or upload one above.</p>
        ) : (
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {allResumes.map((resume) => (
              <button
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:w-36 h-48 flex flex-col items-center justify-center
                  gap-2 border rounded-sm border-slate-600 bg-zinc-900 hover:bg-zinc-800 transition"
              >
                <FilePenIcon className="size-6 text-white/40" />
                <p className="text-sm font-medium text-center px-2 leading-tight">
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
            ))}
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