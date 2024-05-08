import { Injectable } from '@nestjs/common';
import { User } from './user/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user/user.dto';
import { AuthService } from './auth/auth.service';
@Injectable()
export class LoginService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly authServices: AuthService){}

    async allUsers() {
        return this.userRepository.find();
    }
    //user
    async idUser(id_user: number) {
        const userSelec = await this.userRepository.findOne({where: {id_user}});
        if(userSelec == null){
            return {"Error" : "Usuario No Encontrado" };
        }
        return userSelec;
    }
    async login(usuario: string, password: string){
        var usuarioLogin = await this.authServices.authUsuario(usuario);
        if(usuarioLogin != null){
            var bandera = await this.authServices.comparePassword(password, usuarioLogin?.clave)
            if (bandera) {
                var token = this.authServices.createToken(usuarioLogin)
                var payloat = this.authServices.desToken(token);
                return {"Token" : payloat.name};
            }    
        } 
        return {"Error" : "Usuario o Password Incorrecto" };
    }

    async registro(user: UserDto){
        var userNew: User = new User();
        userNew = user;
        userNew.usuario = user.usuario.toUpperCase()
        var claveCrip: string = String(await this.authServices.hashPassword(user.clave))
        if(await this.authServices.authUsuario(user.usuario) == null){
            userNew.clave = claveCrip
            const userCreate = this.userRepository.create(user);
            return await this.userRepository.save(userCreate);
        }else{
            return {"Error" : "Usuario Ya Regristrado" }
        }
    }

    async editUser(id_user: number, user: User){
        const userSelec = await this.userRepository.findOne({where: {id_user}});
        const usuario = user.usuario;
        if(userSelec != null){
            const usuarioSelect = await this.userRepository.findOne({where: {usuario}});
            console.log("Los Usuarios" );
            

            if (usuarioSelect == null || usuario == userSelec.usuario ) {
                return await this.userRepository.update(id_user, user);            
            }else{
                return {"Error" : "Usuario Ya Registrado" }
            }
        }else{
            return {"Error" : "Usuario No Encontrado" }
        }
    }

    async elimUser(id: number){
        return this.userRepository.delete(id);
    }    
}
