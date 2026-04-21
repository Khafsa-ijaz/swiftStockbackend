import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { Product } from "../entities/product.enetities";
import { OrderItems } from "../entities/orderItems.entities";
import { Order } from "../entities/order.entities";
import { AppError } from "../utils/AppError";

export const OrderCreate = async (req: Request, res: Response,next:NextFunction) => {
    const queryRunner = AppDataSource.createQueryRunner();
    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const productrepo = queryRunner.manager.getRepository(Product);
        const itemsrepo = queryRunner.manager.getRepository(OrderItems);
        const orderrepo = queryRunner.manager.getRepository(Order);
        const { items } = req.body;
        let totalbill = 0;
        const OrderItemsStore: OrderItems[] = [];
        for (const item of items) {
            const { productid, quantity } = item;
            const findProduct = await productrepo.findOneBy({ id: productid })
            if (!findProduct || findProduct.stock < quantity) {
                await queryRunner.rollbackTransaction();
               throw new AppError("Product not found or insufficient stock",401)
            }
            findProduct.stock -= quantity;
            await productrepo.save(findProduct);
            const itemsPrice = Number(findProduct.price) * quantity;
            totalbill = totalbill + itemsPrice;
            const orderitems = itemsrepo.create({
                product: findProduct,
                quantity,
                price: Number(findProduct.price)
            })
            OrderItemsStore.push(orderitems)
        }
        const order = orderrepo.create({
            totalAmount: totalbill
        })
        console.log(totalbill);
        const saveorder = await orderrepo.save(order);
        for (const items of OrderItemsStore) {
            items.order = saveorder;
            await itemsrepo.save(items)
        }
        await queryRunner.commitTransaction();
        return res.status(201).json({
            message: "Order created Successfully",
            success: true,
            OrderItemsStore,
            saveorder
        })

    } catch (error) {
        await queryRunner.rollbackTransaction();
        next(error);
     await queryRunner.release();
    }
}