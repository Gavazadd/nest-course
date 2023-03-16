import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary:'Створення користувача'})
    @ApiResponse({status:200, type:User})
    @Post()
    create(@Body() userDto:CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary:'Отримання всіх користувачів'})
    @ApiResponse({status:200, type:[User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersService.getUsers()
    }

    @ApiOperation({summary:'Призначення ролей'})
    @ApiResponse({status:200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto)
    }

    @ApiOperation({summary:'Забанити користувача'})
    @ApiResponse({status:200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
        return this.usersService.ban(dto)
    }
}
