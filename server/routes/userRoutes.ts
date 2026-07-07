import express from "express";
import { getUserById, getUserResumes, loginUser, registerUser } from "../controllers/usercontroller.js";
import protect from "../middleware/authMiddleware.js";

const userRouter=express.Router()

userRouter.post('/register',protect,registerUser)
userRouter.post('/login',protect,loginUser)
userRouter.get('/data', protect, getUserById)


export default userRouter;