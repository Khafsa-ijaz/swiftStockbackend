import { Response,Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { error } from "node:console";
import { AppError } from "../utils/AppError";
interface AuthRequest extends Request {
  user?: {
    id:number;
    role: string;

  }

}
  interface JwtPayload {
  id: number;
  role: string;
}
export const AuthMiddlleware=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader)
    {
        throw new AppError("Token not found",401)
    }
    try {
       const token = authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;
        req.user=decoded;
        next();
    } catch (error) {
      next(error)
    }
    
}