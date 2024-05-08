import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginService } from './login.service';
import { UserDto } from './user/user.dto'; 

@Controller()
export class LoginController {
    constructor(private readonly appService: LoginService) {}

  @MessagePattern({ cmd: 'all-users' })
  allUsers(){
    return this.appService.allUsers();
  }

  @MessagePattern({ cmd: 'id-user' })
  idUser(id: number){
    return this.appService.idUser(id);
  }

  @MessagePattern({ cmd: 'login-user' })
  login(payload: { usuario: string, password: string }){
    return this.appService.login(payload.usuario, payload.password);
  }

  @MessagePattern({ cmd: 'registro-user' })
  crearUser(user: UserDto){
    return this.appService.registro(user);
  }

  @MessagePattern({ cmd: 'edit-user' })
  editUser(payload: { id:number, user: UserDto }){
    return this.appService.editUser(payload.id, payload.user);
  }

  @MessagePattern({ cmd: 'elim-user' })
  elimUser(id: number){
    return this.appService.elimUser(id);
  }
}
