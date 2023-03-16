import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example:'ADMIN', description:'Роль користувача'})
    readonly value:string
    @ApiProperty({example:'Адміністратор', description:'Опис ролі'})
    readonly description:string
}