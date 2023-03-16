import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {where} from "sequelize";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userModel: typeof User,
                private roleService:RolesService){}

    async createUser(dto:CreateUserDto){
        const user = await this.userModel.create(dto)
        const role = await this.roleService.getRoleByValue('USER')
        await user.$set('roles',[role.id])
        user.roles = [role]
        return user

    }

    async getUsers(){
        const users = await this.userModel.findAll({include:{all:true}})
        return users
    }

    async getUserByEmail(email:string){
        const user = await this.userModel.findOne({where:{email}, include:{all:true}})
        return user
    }

    async addRole(dto:AddRoleDto){
        const user = await this.userModel.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if (role && user){
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException("Користувача або роль не знайдено", HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userModel.findByPk(dto.userId)
        if (!user) throw new HttpException("Користувача не знайдено", HttpStatus.NOT_FOUND)

        user.banned = true
        user.banReason = dto.banReason
        await user.save()
        return user
    }
}
