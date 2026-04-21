import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator"

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
    price!:number
    @IsNotEmpty()
    @IsNumber()
    stock!:number
}