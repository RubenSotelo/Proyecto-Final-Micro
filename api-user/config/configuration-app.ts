import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
    port: parseInt(process.env.PORT, 10) || 3010, // Parsea a entero y sino hay puerto hagarra el puerto 3000
    token: process.env.SECRET_TOKEN || 'chocolatey',
    database: {
      host: process.env.HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432, // Parsea a entero y sino hay puerto hagarra el puerto 5432 para la base
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'saber123',
      db: process.env.DB || 'userDB' 
    }
}));

