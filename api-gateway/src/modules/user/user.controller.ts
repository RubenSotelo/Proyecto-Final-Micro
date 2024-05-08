import { Controller, Delete, Get, Post, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user';

@Controller('')
export class UserController {

    constructor(private readonly appService: UserService) {}

    @Get('users/all')
    allUsers(){
        return this.appService.allUsers();
    }
  
    @Get('user/:id')
    idUser(@Param('id') id: number){
        return this.appService.idUser(id);
    }
    
    @Get('user/login/:usuario/:password')
    login(@Param('usuario') usuario: string, @Param('password') password: string){
        return this.appService.login(usuario, password);
    }

    @Post('user/registro')
    registro(@Body() user: UserDto){
        return this.appService.registro(user);
    }
    
    @Put('user/edit/:id')
    editUser(@Param('id') id: number, @Body() user: UserDto){
        return this.appService.editUser(id, user);
    }
    
    @Delete('user/elim/:id')
    elimUser(@Param('id') id: number){
        return this.appService.elimUser(id);
    }

}
