
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";

import { ConfigModule, ConfigService } from "@nestjs/config";


export default JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        secret: configService.get('config.token'),
        
    })
  })
