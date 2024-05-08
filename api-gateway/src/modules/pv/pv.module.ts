import { Module } from '@nestjs/common';
import { PvController } from './pv.controller';
import { PvService } from './pv.service';

@Module({
  controllers: [PvController],
  providers: [PvService]
})
export class PvModule {}
