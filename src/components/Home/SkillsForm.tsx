import { Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";

const SkillsForm=({data,onChange})=>{

    const [newSkill,SetnewSkill]=useState("")

    const addSkill=()=>{
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data,newSkill.trim()])
            SetnewSkill("")
        }
    }
    const removeSkill=(index)=>{
        onChange(data.filter((_,index1)=>index1 !=index))
    }
    const handlekeypress=(e)=>{
        if(e.key==="Enter"){
            e.preventDefault();
            addSkill()
        }

    }


    return(
        <div className="space-y-4">
           
           


            <div className="flex gap-2">
                <input type="text" placeholder="Enter a skill" className="flex-1 py-2 px-3 text-sm"
                onChange={(e)=>SetnewSkill(e.target.value)} value={newSkill} onKeyDown={handlekeypress} ></input>

                <button onClick={addSkill} disabled={!newSkill.trim()} className="btn py-2">
                    <Plus className="size-4"></Plus>
                    Add
                </button>


            </div>
            {data.length >0?(
                <div className="flex flex-wrap gap-2">
                    {data.map((skill,index)=>(
                        <span key={index} className="flex items-center gap-1 px-3 py-1 bg-gray-500 rounded-full text-sm">
                            {skill}
                            <button>
                                <X className="w-3 h-3"/>
                            </button>


                        </span>
                    ))}

                </div>
            ):
            (
                <div className="text-center py-6 text-gray-300">
                    <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p>No skills added yet</p>
                    <p className="text-sm">Add your technical skills and soft skills</p>

                </div>
            ) }
            <div>
                <p className="text-sm text-gray-500 text-center"> <strong>Tip: </strong>
                    Add 8-12 relevant skills, include both tecnical skills(programming , languages, tools ) andd skills (leadership, communication)</p>

            </div>

        </div>
    )

}
export default SkillsForm;