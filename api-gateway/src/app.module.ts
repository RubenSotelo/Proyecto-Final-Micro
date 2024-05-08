import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import configurationApp from 'config/configutation-app';


@Module({
  imports: [
    ConfigModule.forRoot({ 
      load: [configurationApp],
      isGlobal: true }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}