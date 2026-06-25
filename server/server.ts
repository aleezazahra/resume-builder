import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.ts";
import userRouter from "./routes/userRoutes.ts";
import resumeRouter from "./routes/resumeRoutes.ts"
import aiRouter from "./routes/aiRoutes.ts";
const app = express();

const PORT: number = Number(process.env.PORT) || 5173;
await connectDB()
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send("server is live");
});
app.use('/api/users',userRouter)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});