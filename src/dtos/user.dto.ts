import { IsEmail, IsNotEmpty, IsIn, IsString, IsStrongPassword, Min, MinLength } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @IsString()
    name!: string;
    @IsEmail()
    email!: string;
    @IsIn(["Admin", "Staff"])
    userRole!: string
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(8)
    password!: string
}