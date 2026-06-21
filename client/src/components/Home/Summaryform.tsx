import { Sparkles } from "lucide-react";

const Summaryform=({data,onChange})=>{
    return(
        <div className="space-y-4">
        <div className="flex items-center justify-between"></div>
        <div>
            <p className="-mt-8 text-sm text-gray-500">Add summary to your resume here.</p>
        </div>
        <button className="btn py-2 px-6">

            <Sparkles size={17} />
            AI enhance
        </button>
        <div className="mt-6">
            <textarea value={data || ""} onChange={(e)=>onChange(e.target.value)} rows={7} id="" className="w-full px-4 p-3 border text-s, border-gray-300 rounded-lg focus:ring focus:ring-blue-500
            focus:border-blue-500 outline-none transition-colors resize-none" placeholder="
            Write a compelling professioal summary that highlights your objectives clearly......"></textarea>
            <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center"
            >Tip: Keep it concise (3-4 sentences) and focus on your next relevant skill set </p>
            
        </div>
        </div>
    )
      

}
export default Summaryform;