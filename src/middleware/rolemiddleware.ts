import { NextFunction, Request,Response } from "express";
interface AuthRequest extends Request {
  user?: {
    id:number;
    role: string;

  };
}
export const RoleCheck=(...roleCheck:string[])=>{
   return async(req:AuthRequest,res:Response,next:NextFunction)=>
   {
    if(!req.user||!roleCheck.includes(req.user.role))
    {
        return res.status(403).json({message:"Access Denied"})
    }
    next();
   }
}