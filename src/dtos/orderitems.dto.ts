import "reflect-metadata";
import { IsNotEmpty, IsNumber,Min } from "class-validator";

export class OrderItemsDto{
@IsNotEmpty()
@IsNumber()
productId!:number;
@IsNotEmpty()
@IsNumber()
@Min(1)
quantity!:number

}