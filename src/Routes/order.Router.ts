import express from "express"
import { dtoValidation } from "../middleware/dtoMiddlware";
import { Order } from "../entities/order.entities";
import { OrderCreate } from "../controllers/order.controllers";
import { OrderDto } from "../dtos/order.dto";
import { AuthMiddlleware } from "../middleware/authMiddleware";
import { PermissionMiddleware } from "../middleware/permission.middleware";
 const OrderRouter=express.Router();
/**
 * @swagger
 * /api/admin/order/orders:
 *   post:
 *     summary: Create order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productid
 *                     - quantity
 *                   properties:
 *                     productid:
 *                       type: number
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 */
 OrderRouter.post("/orders",AuthMiddlleware,PermissionMiddleware("order:create"),dtoValidation(OrderDto),OrderCreate);
export default OrderRouter;