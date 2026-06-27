import express from "express";
import protect from "../middleware/authMiddleware.ts";
import {
  enhanceProfessionalSummary,
  enhanceJobDescription,

} from "../controllers/aiController.ts";

const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum", enhanceProfessionalSummary);
aiRouter.post("/enhance-job-des", enhanceJobDescription);


export default aiRouter;