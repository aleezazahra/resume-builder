import express from "express";
import { getUserById, getUserResumes, loginUser, registerUser } from "../controllers/usercontroller";
import protect from "../middleware/authMiddleware";

const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data', protect, getUserById)


export default userRouter;