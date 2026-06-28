import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://resume-builder-1v7l.vercel.app",
    "https://resume-builder-pied-mu.vercel.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send("server is live");
});

app.use('/api/users', userRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/ai', aiRouter);

connectDB();

export default app;