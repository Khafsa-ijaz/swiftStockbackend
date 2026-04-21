import "reflect-metadata";
import { ArrayNotEmpty, IsArray, ValidateNested,} from "class-validator"
import { OrderItemsDto } from "./orderitems.dto"
import { Type } from "class-transformer";

export class OrderDto{
    @IsArray()
    @ArrayNotEmpty({message:"array should not be empty"})
    @ValidateNested({each:true})
    @Type(()=>OrderItemsDto)
    items!:OrderItemsDto[]
}