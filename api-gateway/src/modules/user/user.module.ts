import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import userMicro from 'config/user.conectio';

@Module({
  imports:  [userMicro],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
