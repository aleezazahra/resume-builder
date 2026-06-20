import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  XIcon,
  PlusIcon,
  UploadIcon,
  FilePenIcon,
  TrashIcon,
  PencilIcon
} from "lucide-react";


type Resume = {
  _id: string;
  title: string;
  updatedAt?: string;
};

const Dashboard = () => {
  const colors: string[] = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a"
  ];

  const [allResumes, setAllResumes] = useState<Resume[]>([]);
  const [showCreateResume, setShowCreateResume] = useState<boolean>(false);
  const [showUploadResume, setShowUploadResume] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);
  const [editResumeId, setEditResumeId] = useState<string>("");

  const navigate = useNavigate();



  const loadAllResumes = () => {
    setAllResumes(dummyResumeData as Resume[]);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);



  const createResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowCreateResume(false);

    navigate(`/app/builder/res123`);
  };



  const uploadResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowUploadResume(false);

    navigate(`/app/builder/res123`);
  };



  const editTtitle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditResumeId("");
  };



  const deleteResume = async (resumeId: string) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this Resume?"
    );

    if (isConfirm) {
      setAllResumes((prev) =>
        prev.filter((r) => r._id !== resumeId)
      );
    }
  };



  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-xl mb-10 font-medium mb-6">
          Welcome, Aleeza Zahra
        </p>

       
        <div className="flex flex-wrap gap-4 mb-8">

          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center border-gray-500 justify-center border rounded-lg "
          >
            <PlusIcon className="size-6 mb-4 text-gray-700" />
            Create Resume
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center border border-gray-500 rounded-lg"
          >
            <UploadIcon className="size-6 mb-4 text-gray-700" />
            Upload Resume
          </button>
        </div>

 
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={resume._id}
                onClick={() =>
                  navigate(`/app/builder/${resume._id}`)
                }
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center border rounded-lg"
                style={{
                  borderColor: baseColor
                }}
              >
                <FilePenIcon className="size-6" />

                <p style={{ color: baseColor }}>
                  {resume.title}
                </p>

                <p className="text-xs">
  {resume.updatedAt
    ? `Updated ${new Date(resume.updatedAt).toLocaleDateString()}`
    : "No update date"}
        </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 flex gap-2"
                >
                  <TrashIcon
                    className="size-5 cursor-pointer"
                    onClick={() => deleteResume(resume._id)}
                  />

                  <PencilIcon
                    className="size-5 cursor-pointer"
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
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
            className="fixed inset-0 flex items-center justify-center bg-black/60"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg w-full max-w-sm relative"
            >
              <h2>Create Resume</h2>

              <input
                className="border w-full p-2 mb-4"
                placeholder="Title"
              />

              <button className="w-full bg-green-600 text-white py-2">
                Create
              </button>

              <XIcon
                onClick={() => setShowCreateResume(false)}
                className="absolute top-2 right-2 cursor-pointer"
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 flex items-center justify-center bg-black/60"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg w-full max-w-sm"
            >
              <h2>Upload Resume</h2>

              <input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                className="border w-full p-2 mb-4"
              />

              <label className="border p-4 block text-center mb-4">
                {resume ? resume.name : "Select File"}

                <input
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setResume(e.target.files?.[0] || null)
                  }
                />
              </label>

              <button className="w-full bg-green-600 text-white py-2">
                Upload
              </button>
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTtitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 flex items-center justify-center bg-black/60"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg w-full max-w-sm"
            >
              <h2>Edit Resume</h2>

              <input
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                className="border w-full p-2 mb-4"
              />

              <button className="w-full bg-green-600 text-white py-2">
                Update
              </button>

              <XIcon
                onClick={() => setEditResumeId("")}
                className="absolute top-2 right-2"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;