import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationalAtribute{
    email:string
    password:string
}

@Table({tableName:"users"})
export class User extends Model<User, UserCreationalAtribute>{

    @ApiProperty({example:'1', description:'Унікальний ідентифікатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number

    @ApiProperty({example:'user@gmail.com', description:'Поштова адреса'})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    email:string

    @ApiProperty({example:'qwerty123456', description:'Пароль користувача'})
    @Column({type: DataType.INTEGER, allowNull:false })
    password:string

    @ApiProperty({example:'true', description:'Користувач забанений чи ні'})
    @Column({type: DataType.BOOLEAN, defaultValue:false })
    banned:boolean

    @ApiProperty({example:'За хуліганство', description:'Причина блокування'})
    @Column({type: DataType.STRING, allowNull:true })
    banReason:string
}