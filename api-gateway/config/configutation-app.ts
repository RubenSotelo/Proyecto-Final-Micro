import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
    port: parseInt(process.env.PORT, 10) || 3000, // Parsea a entero y sino hay puerto hagarra el puerto 3000    
    microservices:{
      user:{
          host: process.env.USER_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.USER_SERVICE_PORT, 10) || 3010
      },
      pv:{
          host: process.env.PV_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.PV_SERVICE_PORT, 10) || 3020
      },
    },
    database: {
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432, // Parsea a entero y sino hay puerto hagarra el puerto 5432 para la base
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'saber123',
      db: process.env.DB || '' 
    }
}));

