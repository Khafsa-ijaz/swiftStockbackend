import { Entity,PrimaryGeneratedColumn,Column, OneToMany }  from "typeorm"
import { Order } from "./order.entities"
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!:number
    @Column()
    name!:string
    @Column()
    password!:string
    @Column({unique:true})
    email!:string
    @Column({
        type:"enum",
        enum: ["Admin","Staff"],
        default:"Admin",
    })
    userRole!:"Admin" | "Staff"
@OneToMany(()=>Order,(order)=>order.user)
order!:Order
}