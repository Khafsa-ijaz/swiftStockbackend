import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { metadata } from "reflect-metadata/no-conflict";
import { User } from "../entities/user.entities";
import { Product } from "../entities/product.enetities";
import { Category } from "../entities/category.entities";
import { Order } from "../entities/order.entities";
import { OrderItems } from "../entities/orderItems.entities";
dotenv.config();
 export const AppDataSource = new DataSource({
  type:"mysql",
  host:process.env.DB_HOST,
  username:process.env.DB_ROOT,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
  entities:[User,Product,Category,Order,OrderItems],
  synchronize:true,
})

