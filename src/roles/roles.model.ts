import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationalAtribute{
    value:string
    description:string
}

@Table({tableName:"roles"})
export class Role extends Model<Role, RoleCreationalAtribute>{

    @ApiProperty({example:'1', description:'Унікальний ідентифікатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number

    @ApiProperty({example:'ADMIN', description:'Роль користувача'})
    @Column({type: DataType.STRING, allowNull:false})
    value:string

    @ApiProperty({example:'Адміністратор', description:'Опис ролі'})
    @Column({type: DataType.STRING, allowNull:false })
    description:string

    @BelongsToMany(()=>User, ()=>UserRoles)
    users: User[]

}