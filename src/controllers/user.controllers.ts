import { AppDataSource } from "../config/db";
import bcrypt from "bcrypt";
import { User } from "../entities/user.entities"
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
export const CreateUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(User);
        const { name, email, userRole, password } = req.body;
        const findUser = await repo.findOneBy({ email })
        if (findUser) {
           
            throw new AppError("User Already Found",404)
        }
        console.log("you are inside User Cretae");
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = repo.create({ name, password: hashedPassword, email, userRole });
        const saveUser = await repo.save(user);
        return res.status(201).json({ message: "successfully created", saveUser })
    } catch (error) {
       next( error)
    }
};
export const GetUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(User);
        const userid = Number(req.params.id);
        const getuser = await repo.findOneBy({ id: Number(userid) })
        if (!getuser) {
            throw new AppError("user not found",404);
        }
        return res.status(200).json({ data: getuser })
    } catch (error) {
        next(error)
    }

};
export const UpdateUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(User);
        const userid = Number(req.params.id);
        
        const { name, email, userRole, password } = req.body
        const updateUser = await repo.findOneBy({ id: userid });
        if (!updateUser) {
           
            throw new AppError("user not found",404)
        }
        if (isNaN(userid)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }
        const hashedPassword = await bcrypt.hash(password, 10)
        repo.merge(updateUser, { name, email, userRole, password: hashedPassword });
        const result = await repo.save(updateUser);
        return res.status(201).json({ message: "Updated Successfully", data: result })
    } catch (error) {
       next(error);
    }
};
export const DeleteUser = async (req: Request, res: Response,next:NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(User);
        const userid = Number(req.params.id);
        const findUser = await repo.findOneBy({ id: Number(userid) })
        if (!findUser) {
       
            throw new AppError("user not found",401)
        }
        await repo.delete(findUser);
        return res.status(201).json({ message: "User Deleted Successfully" })
    } catch (error) {
        next(error)
    }
};
export const GetAllUsers =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const repo=AppDataSource.getRepository(User);
        const users=await repo.find();
        return res.status(200).json({message:"All users are Here",
            users,
        })
    } catch (error) {
        next(error)
    }
}