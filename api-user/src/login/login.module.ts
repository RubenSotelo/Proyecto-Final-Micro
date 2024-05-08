import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { User } from './user/user.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import jwtConstants from 'config/jwt.constants';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
            jwtConstants],
  controllers: [LoginController],
  providers: [LoginService, AuthService]
})
export class LoginModule {}
