import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { validateOrReject } from "class-validator";
import { Request,Response,NextFunction } from "express"

export const dtoValidation=(DtoClas:new()=>object)=>{
return async(req:Request,res:Response,next:NextFunction)=>{
const dto=plainToInstance(DtoClas,req.body)
const error = await validate(dto);
if(error.length>0)
{
    return res.status(400).json(error);
}
req.body=dto;
next();
}
};
