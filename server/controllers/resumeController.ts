import Resume from "../models/Resume.ts";

// POST: /api/resume/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });
    return res.status(201).json({ message: "Resume created successfully", resume: newResume });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET: /api/resume/:resumeId
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    return res.status(200).json({ resume });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE: /api/resume/:resumeId
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOneAndDelete({ _id: resumeId, userId });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    return res.status(200).json({ message: "Resume deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//UPDATE 
//PUT : /api/resumesupdate
export const updateResume=async(req,res)=>{
  try{
    const userId=req.userId;
    const {resumeId,resumeData,removeBackground}=req.body
    const image=req.file;

    const resumeDataCopy=JSON.parse(resumeData)

    const resume= await Resume.findOneAndUpdate({userId,_id:resumeId},resumeDataCopy,{new:true})

    return res.status(200).json({message:"saved successfully",resume})
    
  }catch(error){
    return res.status(400).json({message:error.message})
  }


}

