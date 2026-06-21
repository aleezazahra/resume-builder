import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

const PORT: number = Number(process.env.PORT) || 5173;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send("server is live");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});