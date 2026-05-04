import { AppDataSource } from "../config/db"
import { Product } from "../entities/product.enetities";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(Product);
        const { productName, sku, price, stock,categoryId} = req.body;
        console.log(req.body);
        console.log(categoryId);
        if (!productName || !sku || !price || !stock||!categoryId) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const findproduct = await repo.findOneBy({ sku });
        if (findproduct) {
            // return res.status(400).json({ message: "" })
            throw new AppError(" Product Already Found", 400);
        }
        const product = repo.create({
            productName,
            sku,
            price,
            stock,
            category:{id:categoryId}
        })
        await repo.save(product);
        return res.status(200).json({ message: "Product Created Successfuly", data: product })

    } catch (error) {
        next(error)
    }


};
export const DeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(Product);
        const productid = Number(req.params.id);
        const findProduct = await repo.findOneBy({ id: productid })
        if (!findProduct) {
            throw new AppError("product not found", 404)
        }
        await repo.delete(productid);

        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        next(error)
    }
};
export const UpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(Product);
        const productid = Number(req.params.id);
        const { productName, sku, price, stock } = req.body;
        const findProduct = await repo.findOneBy({ id: productid })
        if (!findProduct) {

            throw new AppError("product not found", 404)

        }
        repo.merge(findProduct, { productName, sku, price, stock });
        const result = await repo.save(findProduct);
        return res.status(201).json({ message: "Updated Successfully", data: result })
    } catch (error) {
        next(error);
    }
};
export const GetAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(Product);

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const [data, total] = await repo.findAndCount({
              relations: ["category"], 
            skip: (page - 1) * limit,
            take: limit,
        });
        const product = await repo.find();
        return res.json({
            data,
            total,
            page,
            product,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        next(error);
    }
}
export const GetProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repo = AppDataSource.getRepository(Product);
        const productid = Number(req.params.id);
        const findProduct = await repo.findOne({
            where: { id: productid },
            relations: ["category"],
        });
        if (!findProduct) {
            throw new AppError("product not found", 404)
        }
        return res.status(200).json({
            message: "Product is here",
            data: findProduct
        })
    } catch (error) {
        next(error);
    }
}