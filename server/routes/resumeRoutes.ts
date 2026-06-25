import express from "express"
import protect from "../middleware/authMiddleware.ts"
import { createResume,deleteResume,getResumeById,updateResume } from "../controllers/resumeController.ts"
import upload from "../configs/multer.ts"
const resumeRouter=express.Router()

resumeRouter.post('/create',protect,createResume)
resumeRouter.put('/update',upload.single('image'),protect,updateResume)
resumeRouter.delete('delete/:resumeId',protect,deleteResume)
resumeRouter.get('/get/:resumeId',getResumeById)

export default resumeRouter;