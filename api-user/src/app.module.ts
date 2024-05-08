import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import pgConnection from 'config/pg.connection';
import configurationApp from 'config/configuration-app';

@Module({
  imports: [LoginModule,
            pgConnection,
            ConfigModule.forRoot({
              envFilePath: './env/.env',
              load: [configurationApp],
              isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
