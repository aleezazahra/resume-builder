import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowBigLeftIcon ,FileText,FolderIcon,GraduationCap,Sparkles,User} from "lucide-react";

const Builder=()=>{
    const {resumeId}=useParams()
    interface ResumeStructure {
    _id: string;
    title: string;
    personal_info: Record<string, any>;
    professional_summary: string;
    experience: any[];
    education: any[];
    project: any[];
    skills: string[];
    template: string;
    accent_color: string;
    public: boolean;
}
    const [resumeData,setResumeData]=useState<ResumeStructure>({
        _id:'',
        title:'',
        personal_info:{},
        professional_summary:"",
        experience:[],
        education:[],
        project:[],
        skills:[],
        template:"classic",
        accent_color:"#3882F6",
        public:false,

    })
    const loadExistingResume=async()=>{
        const resume=dummyResumeData.find(resume=> resume._id==resumeId)
        if(resume){
            setResumeData(resume)
            document.title=resume.title

        }
    }

    const[activeSectionIndex,setActiveSectionIndex]=useState<number>(0)
    const[removeBackground,setRemoveBackground]=useState(false);

    const sections=[
        {id:"personal",name:"personal info",icon:User},
        {id:"summary",name:"Summary",icon:FileText},
        {id:"education",name:"Education",icon:GraduationCap},
        {id:"projects",name:"Projects",icon:FolderIcon},
        {id:"skills",name:"Skills",icon:Sparkles},
    ]
    const activeSelection=sections[activeSectionIndex]

    useEffect(()=>{
        loadExistingResume()
    },[resumeId])
    return(
        <div>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link to={`/app`} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
                <ArrowBigLeftIcon className="size-4 " />Back to Dashboard
                </Link>
            </div>
            <div className="maz-w-7xl mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/*left side */}
                    <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                            

                        </div>

                    </div>


                    {/* right panel or preview of resume */}
                    <div></div>
                </div>

            </div>
        </div>
    )
}
export default Builder;


