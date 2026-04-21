import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Product } from "./product.enetities";
@Entity()
 export class Category{
 @PrimaryGeneratedColumn()
 id!:number
 @Column({unique:true})
 name!:string
@Column()
description!:string
@OneToMany(()=>Product,(product)=>product.category)
product!:Product
 }