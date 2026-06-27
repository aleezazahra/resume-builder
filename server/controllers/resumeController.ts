import Resume from "../models/Resume.ts";


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

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;

    let resumeId;
    let updateData = {};

    if (req.is("multipart/form-data")) {
      resumeId = req.body.resumeId;
      updateData = JSON.parse(req.body.resumeData);
    } else {
      resumeId = req.body.resumeId;
      updateData = req.body.resumeData || req.body;
    }

    const resume = await Resume.findOneAndUpdate(
      {
        _id: resumeId,
        userId,
      },
      updateData,
      {
        new: true,
      }
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      message: "Saved successfully",
      resume,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    const resumes = await Resume.find({ userId }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      resumes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};