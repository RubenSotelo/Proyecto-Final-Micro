import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
export default ClientsModule.registerAsync([
  {
    name: 'SERVICE_PV',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => (
      {
      transport: Transport.TCP,
      options: {
        host: configService.get('config.microservices.PV.host'),
        port: configService.get('config.microservices.PV.port'),
      },
    }),
  },
])