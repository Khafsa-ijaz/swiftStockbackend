import { NextFunction, Request,Response } from "express";
import { AppDataSource } from "../config/db";
import { Category } from "../entities/category.entities";
import { AppError } from "../utils/AppError";

export const CategoryController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
         const repo=AppDataSource.getRepository(Category)
         const {name,sku,description}=req.body;
         if(!name||!sku||!description)
         {
              throw new AppError("All field are required",400)
         }
         const findcategory=await repo.findOneBy({sku})
         if(findcategory)
         {
            throw new AppError("Category already found",400)
         }
         const category=repo.create({
            name,
            sku,
            description
         })
         await repo.save(category)
          return res.status(200).json({ message: "Category Created Successfuly", data: category })

    } catch (error) {
        next(error)
    }

}
export const Getcategory=async(req:Request,res:Response,next:NextFunction)=>{
    try {
          const repo=AppDataSource.getRepository(Category);
    const categories=await repo.find();
    return res.status(200).json({message:"categories are here",
        categories
    })
    } catch (error) {
        next(error)
    }
  
}