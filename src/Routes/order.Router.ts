import express from "express"
import { dtoValidation } from "../middleware/dtoMiddlware";
import { Order } from "../entities/order.entities";
import { OrderCreate } from "../controllers/order.controllers";
import { OrderDto } from "../dtos/order.dto";
import { AuthMiddlleware } from "../middleware/authMiddleware";
 const OrderRouter=express.Router();
 OrderRouter.post("/orders",AuthMiddlleware,dtoValidation(OrderDto),OrderCreate);
export default OrderRouter;