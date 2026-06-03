import { FilePenIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
    const [allResumes, setAllResumes] = useState([]);
    const[showCreateResume,setShowCreateResume]=useState(false)
    const[showUploadResume,setShowUploadResume]=useState(false)
    const[title,setTitle]=useState('')
    const[resume,setResume]=useState(null)
    const[editResumeId,setEditResumeId]=useState('')
    const navigate=useNavigate()

    const loadAllResumes = () => {
        setAllResumes(dummyResumeData);
    };

    const createResume=async(event)=>{
        event.preventDefault()
        setShowCreateResume(false)
        navigate(`/app/builder/res123`)
    }

    const uploadResume=async(event)=>{
            event.preventDefault()
            setShowUploadResume(false)
            navigate(`/app/builder/res123`)
    }
    
    const editTtitle=async(event)=>{
        event.preventDefault()


    }
    const deleteResume=async(resumeId)=>{
        const confirm = window.confirm('Are you sure you want to delete this Resume?')
        if(confirm){
            setAllResumes(prev=> prev.filter(resume => resume._id!==resumeId))
        }
    }
    useEffect(() => {
        loadAllResumes();
    }, []);

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-8">
         
                <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
                    Welcome, Aleeza Zahra
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                    <button onClick={()=> setShowCreateResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 text-white rounded-full" />
                        <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">Create Resume</p>
                    </button>

                    <button onClick={()=>setShowUploadResume(true)} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <UploadIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 text-white rounded-full" />
                        <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">Upload Resume</p>
                    </button>
                </div>

                <hr className="border-slate-200 my-8" />

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4">
                    {allResumes.map((resume, index) => {
                        const baseColor = colors[index % colors.length];
                        return (
                            <button 
                                key={index} 
                                onClick={()=> navigate(`app/builder/${resume._id}`)}
                                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer" 
                                style={{
                                    background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, 
                                    borderColor: baseColor + '40'
                                }}
                            >
                                <FilePenIcon className="size-7 group-hover:scale-105 transition-all" />
                                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }}>
                                    {resume.title}
                                </p>

                                <p className="absolute bottom-1 text-[11px] group-hover:text-slate-500 transition-all duration-300 px-2 text-center" style={{ color: baseColor + '90' }}>
                                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
        
                                <div onClick={e=> e.stopPropagation()} className="absolute top-1 right-1 hidden group-hover:flex items-center bg-white/80 rounded shadow-sm backdrop-blur-xs">
                                    <TrashIcon onClick={()=> {deleteResume(resume._id)}} className="size-7 p-1.5 hover:bg-red-50 hover:text-red-600 rounded text-slate-700 transition-colors" />
                                    <PencilIcon onClick={()=> {setEditResumeId(resume._id);setTitle(resume.title)}} className="size-7 p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors" />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {
                    showCreateResume && (
                        <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)} className='fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50'>
                            <div onClick={e=> e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 mx-4">
                                <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
                                <input type="text" placeholder="Enter Resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 border rounded" required/>
                                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                    Create a Resume
                                </button>
                                <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" 
                                onClick={()=> {setShowCreateResume(false); setTitle('')}}/>
                            </div>
                        </form>
                    )
                }

                {
                    showUploadResume &&(
                        <form onSubmit={uploadResume} onClick={()=> setShowUploadResume(false)} className='fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50'>
                            <div onClick={e=> e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 mx-4">
                                <h2 className="text-xl font-bold mb-4">Upload a Resume</h2>
                                <input onChange={(e)=>setTitle(e.target.value)} value={title}
                                 type="text" placeholder="Enter Resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 border rounded" required/>
                                 <div>
                                    <label htmlFor="resume-input"  className="block text-sm text-slate-700">
                                        Select Resume file
                                        <div className="flex flex-col items-center justify-center gap-2 border text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                                            {resume ? (
                                                <p className="text-green-700">{resume.name}</p>
                                            ) : (
                                                <>
                                                    <UploadCloud className="size-14 stroke-1" />
                                                    <p>Upload Resume</p>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                    <input type="file" id="resume-input" accept=".pdf" hidden onChange={(e)=> setResume(e.target.files[0])}></input>
                                 </div>
                                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                   Upload Resume
                                </button>
                                <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" 
                                onClick={()=> {setShowUploadResume(false); setTitle('')}}/>
                            </div>
                        </form>
                    )
                }

                  {
                    editResumeId && (
                        <form onSubmit={editTtitle} onClick={()=> setEditResumeId('')} className='fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50'>
                            <div onClick={e=> e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6 mx-4">
                                <h2 className="text-xl font-bold mb-4">Edit Resume title</h2>
                                <input type="text" placeholder="Enter Resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 border rounded" required/>
                                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                   Update
                                </button>
                                <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" 
                                onClick={()=> {setEditResumeId(''); setTitle('')}}/>
                            </div>
                        </form>
                    )
                }
            </div>
        </div>
    );
};

export default Dashboard;