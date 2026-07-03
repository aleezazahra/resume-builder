import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import passport from 'passport';
import './services/passport'; 
import authRouter from './routes/authRoutes.js';
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://resume-builder-1v7l.vercel.app",
    "https://resume-builder-pied-mu.vercel.app",
    "https://naqshresume.vercel.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "DB connection failed" });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send("server is live");
});
app.use(passport.initialize());
app.use('/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/ai', aiRouter);
if (process.env.NODE_ENV !== "production") {
  app.listen(Number(process.env.PORT) || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}


export default app;