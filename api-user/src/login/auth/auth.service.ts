import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.interface';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private jwtTokenService: JwtService, private configService:ConfigService){}

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 12);
    }

    async comparePassword(password: string, passwordCrypt: string){
        return await bcrypt.compare(password, passwordCrypt);
    }

    async authUsuario(usuario: string){
        usuario = usuario.toUpperCase()
        return await this.userRepository.findOne({where: {usuario}});
    }

    createToken(user: User){
        const data  = {id: user.id_user, name: user.nombre}
        return this.jwtTokenService.sign(data);
    }

    desToken(token:any){       
        return this.jwtTokenService.decode(token, this.configService.get('config.token'));
    }
}
