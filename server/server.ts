import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.ts";
import userRouter from "./routes/userRoutes.ts";
import resumeRouter from "./routes/resumeRoutes.ts"
import aiRouter from "./routes/aiRoutes.ts";
const app = express();

const PORT: number = Number(process.env.PORT) || 3000;
await connectDB()
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send("server is live");
});
app.use('/api/users',userRouter)
app.use('/api/resume',resumeRouter)
app.use('/api/ai',aiRouter)

console.log("BASE_URL:", process.env.OPENAI_BASE_URL);
console.log("MODEL:", process.env.OPENAI_MODEL);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});