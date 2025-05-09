import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";
import cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors()); 
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted: true
  }));
  app.setGlobalPrefix('backend/api', {exclude : ['']});
  await app.listen(port);
}
bootstrap();