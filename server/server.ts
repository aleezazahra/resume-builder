import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.ts";
import userRouter from "./routes/userRoutes.ts";
import resumeRouter from "./routes/resumeRoutes.ts";
import aiRouter from "./routes/aiRoutes.ts";

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;
await connectDB();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://resume-builder-1v7l.vercel.app"
  ],
  credentials: true
}));

app.get('/', (req: Request, res: Response) => {
    res.send("server is live");
});
app.use('/api/users', userRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});