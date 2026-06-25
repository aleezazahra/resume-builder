import express from "express"
import protect from "../middleware/authMiddleware.ts";
import { enhanceProfessionalSummary } from "../controllers/aiController.ts";
import { updateResume } from "../controllers/resumeController.ts";

const aiRouter=express.Router();

aiRouter.post('/enhance-pro-sum',protect,enhanceProfessionalSummary)
aiRouter.post('/enhance-job-des',protect,enhanceProfessionalSummary)
aiRouter.post('/upload-resume',protect,updateResume)
export default aiRouter;