import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities/user.entities";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { permissions } from "../rbac/permissions.rbac";
import { rolePermissions } from "../rbac/roles.rbac";

export const LoginUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(User)
        const { email, password } = req.body;
        const user = await repo.findOneBy({ email })
        if (!user) {
            throw new AppError("User not found",400);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AppError("invalid credentials",401)
        }
        const token = jwt.sign(
  { id: user.id, role: user.userRole },
  process.env.JWT_SECRET as string,
  { expiresIn:"1h" }
);
return res.status(201).json({message:"login successfully",
    success:true,
    user,
    token,
    permissions:rolePermissions[user.userRole]
})
    } catch (error) {
next(error); 
    }
}