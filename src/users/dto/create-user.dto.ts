import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto{
    @ApiProperty({example:'user@gmail.com', description:'Поштова адреса'})
    @IsString({message:"Повинно бути строкою"})
    @IsEmail({}, {message:'Невірний email'})
    readonly email:string
    @ApiProperty({example:'qwerty123456', description:'Пароль користувача'})
    @IsString({message:"Повинно бути строкою"})
    @Length(4,16,{message:'Пароль більше 4 і менше 16 '})
    readonly password:string
}