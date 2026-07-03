import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define a simple interface to fix the req.userId TypeScript error
interface AuthRequest extends Request {
    userId?: string;
}

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    // 1. Get the header
    const authHeader = req.headers.authorization;
    
    // 2. Check if it exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // 3. Extract just the token part
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        
        // 4. Assign the ID
        req.userId = decoded.userId; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};

export default protect;