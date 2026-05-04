import { IsNotEmpty, IsNumber, IsString, Matches, Min, } from "class-validator"
import { Unique } from "typeorm/browser"

export class Product{
    @IsNotEmpty()
    @IsString()
    productName!:string
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z0-9-]+$/, {
    message: "SKU must contain only uppercase letters, numbers, and hyphens"
  })
    sku!:string
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    price!:number
    @IsNotEmpty()
    @IsNumber()
    stock!:number
}