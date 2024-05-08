import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
export default ClientsModule.registerAsync([
  {
    name: 'SERVICE_USER',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => (
      {
      transport: Transport.TCP,
      options: {
        host: configService.get('config.microservices.user.host'),
        port: configService.get('config.microservices.user.port'),
      },
    }),
  },
])