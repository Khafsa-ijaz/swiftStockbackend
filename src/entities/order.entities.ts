import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entities";
import { OrderItems } from "./orderItems.entities";
@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id!:number
    @Column()
   totalAmount!:number
  @Column({
    type: "enum",
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  })
  status!: string;
  @CreateDateColumn()
  createdAt!:Date
  @ManyToOne(()=>User,(user)=>user.order)
  user!:User
  @OneToMany(()=>OrderItems,(orderitem)=>orderitem.order)
  item!:OrderItems[];
}
