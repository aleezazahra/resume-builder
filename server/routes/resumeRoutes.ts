import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../configs/multer.js";

import {
  createResume,
  deleteResume,
  getResumeById,
  getUserResumes,
  updateResume,
} from "../controllers/resumeController.js";


const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.get("/list", protect, getUserResumes);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.put("/update", protect, upload.single("image"), updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);

export default resumeRouter;