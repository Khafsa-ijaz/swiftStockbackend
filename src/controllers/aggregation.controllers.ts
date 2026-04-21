
import { MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../config/db";
import { Order } from "../entities/order.entities";
import { Request,Response, NextFunction } from "express";
export const DashboardAnalytics=async(req:Request,res:Response,next:NextFunction)=>{
    try {
       const orderRepo=AppDataSource.getRepository(Order);
    const totalOrders=await orderRepo.count();
    const revenue=await orderRepo.createQueryBuilder("order").select("SUM(order.totalAmount)","totalRevenue").getRawOne();
   const totalRevenue = Number(revenue.totalRevenue) || 0;
   return res.json({
success:true,
totalOrders,
totalRevenue
   });
    } catch (error) {
        next(error)
    }
    
}
export const DaySales=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const today = new Date();
today.setHours(0, 0, 0, 0);
        const orderrepo=AppDataSource.getRepository(Order);
        const totalOrders=await orderrepo.count({  where: {
    createdAt: MoreThanOrEqual(today)
  }})
  return res.status(201).json({
    message:"Todays Sales",
    totalOrders,
  })
    } catch (error) {
        next(error)
    }
}