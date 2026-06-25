import express from "express";
import { getUserById, getUserResumes, loginUser, registerUser } from "../controllers/usercontroller.ts";
import protect from "../middleware/authMiddleware.ts";

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/data',protect ,getUserById)
userRouter.get('/resumes',protect,getUserResumes)

export default userRouter;