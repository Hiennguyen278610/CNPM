import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || process.env.NEXT_PUBLIC_PORT_BACK_END;
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted: true
  }));
  app.setGlobalPrefix('backend/api', {exclude : ['']});
  await app.listen(port);
}
bootstrap();