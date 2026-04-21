import { Entity,PrimaryGeneratedColumn,Column, ManyToOne,} from "typeorm";
import { Category } from "./category.entities";
import { OrderItems } from "./orderItems.entities";
@Entity()
export class Product{
@PrimaryGeneratedColumn()
id!:number
@Column({unique:true})
productName!:string
@Column({ unique: true })
sku!: string;
@Column()
price!:number
@Column()
stock!:number
@ManyToOne(()=>Category,(category)=>category.product)
category!:Category
@ManyToOne(()=>OrderItems,(orderitems)=>orderitems.product)
items!:OrderItems
}