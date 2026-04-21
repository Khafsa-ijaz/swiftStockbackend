import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToOne } from "typeorm";
import { Product } from "./product.enetities";
import { Order } from "./order.entities";

@Entity()
export class OrderItems{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    quantity!:number
    @Column()
    price!:number
    @OneToMany(()=>Product,(product)=>product.items)
   product!:Product
   @ManyToOne(()=>Order,(order)=>order.item)
   order!: Order
}