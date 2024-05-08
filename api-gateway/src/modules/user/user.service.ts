import {  Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from './dto/user';

@Injectable()
export class UserService {
  constructor(
    @Inject('SERVICE_USER') private readonly clientUser: ClientProxy,
  ){}

  allUsers(){
    return this.clientUser.send({ cmd: 'all-users' },{})
  }

  idUser(id: number){
    return this.clientUser.send({ cmd: 'id-user' }, id)
  }

  login(usuario: string, password: string){
    const pattern = { cmd: 'login-user' };
    const payload = { usuario: usuario, password: password};
    return this.clientUser.send(pattern,payload)
  }

  registro(user: UserDto){
    return this.clientUser.send({ cmd: 'registro-user' }, user)
  }

  editUser(id: number, user: UserDto){
    const pattern = { cmd: 'edit-user' };
    const payload = { id: id, user: user};
    return this.clientUser.send(pattern, payload)
  }
  
  elimUser(id: number){
    return this.clientUser.send({ cmd: 'elim-user' }, id)
  }

}
