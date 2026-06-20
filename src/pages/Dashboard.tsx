import {
  FilePenIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadIcon,
  XIcon
} from "lucide-react";

import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState<any[]>([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const loadAllResumes = () => {
    setAllResumes(dummyResumeData);
  };

  const createResume = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowCreateResume(false);

    navigate(`/app/builder/res123`);
  };

  const uploadResume = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowUploadResume(false);

    navigate(`/app/builder/res123`);
  };

  const editTtitle = async (event: React.FormEvent) => {
    event.preventDefault();
    setEditResumeId("");
  };

  const deleteResume = async (resumeId: string) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this Resume?"
    );

    if (isConfirm) {
      setAllResumes((prev) =>
        prev.filter((resume) => resume._id !== resumeId)
      );
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Aleeza Zahra
        </p>

        {/* CREATE / UPLOAD */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 p-2.5 bg-indigo-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadIcon className="size-11 p-2.5 bg-indigo-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">
              Upload Resume
            </p>
          </button>
        </div>

        <hr className="border-slate-200 my-8" />

        {/* RESUME LIST */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={resume._id}
                onClick={() =>
                  navigate(`/app/builder/${resume._id}`)
                }
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40"
                }}
              >
                <FilePenIcon className="size-7" />

                <p
                  className="text-sm px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on{" "}
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* ACTIONS */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 hidden group-hover:flex items-center bg-white/80 rounded shadow-sm"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:text-red-600"
                  />

                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* CREATE MODAL */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg w-full max-w-sm relative"
            >
              <h2 className="text-xl font-bold mb-4">
                Create Resume
              </h2>

              <input
                type="text"
                className="w-full border p-2 mb-4"
                placeholder="Enter title"
                required
              />

              <button className="w-full bg-green-600 text-white py-2 rounded">
                Create
              </button>

              <XIcon
                onClick={() => setShowCreateResume(false)}
                className="absolute top-3 right-3 cursor-pointer"
              />
            </div>
          </form>
        )}

        {/* UPLOAD MODAL */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg w-full max-w-sm relative"
            >
              <h2 className="text-xl font-bold mb-4">
                Upload Resume
              </h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="w-full border p-2 mb-4"
                placeholder="Enter title"
              />

              <label className="block cursor-pointer border p-4 text-center mb-4">
                {resume ? resume.name : "Select PDF"}

                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={(e) =>
                    setResume(e.target.files?.[0] || null)
                  }
                />
              </label>

              <button className="w-full bg-green-600 text-white py-2 rounded">
                Upload
              </button>

              <XIcon
                onClick={() => setShowUploadResume(false)}
                className="absolute top-3 right-3 cursor-pointer"
              />
            </div>
          </form>
        )}

        {/* EDIT MODAL */}
        {editResumeId && (
          <form
            onSubmit={editTtitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg w-full max-w-sm relative"
            >
              <h2 className="text-xl font-bold mb-4">
                Edit Resume
              </h2>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 mb-4"
              />

              <button className="w-full bg-green-600 text-white py-2 rounded">
                Update
              </button>

              <XIcon
                onClick={() => setEditResumeId("")}
                className="absolute top-3 right-3 cursor-pointer"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;