import express from "express";
import protect from "../middleware/authMiddleware.ts";
import {
  enhanceProfessionalSummary,
  enhanceJobDescription,
  uploadResume,
} from "../controllers/aiController.ts";

const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-des", protect, enhanceJobDescription);
aiRouter.post("/upload-resume", protect, uploadResume);

export default aiRouter;