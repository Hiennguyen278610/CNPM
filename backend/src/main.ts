import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const fullport = `http://${process.env.IPURLBE}:3000`;
  const configService = app.get(ConfigService);
  const port =
    configService.get('PORT') || process.env.NEXT_PUBLIC_PORT_BACK_END;
  // Enable CORS
  // app.enableCors({
  //   origin: ['http://localhost:3000', `http://${process.env.IPURLBE}:3000`], // Thêm đúng origin FE của bạn
  //   credentials: true,
  // });

  const options = {
    origin: fullport,
    // origin: `http://192.168.1.172:3000`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };
  
  app.enableCors(options);
  //   origin: '*', // Allow requests from all origins,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type,Authorization',
  //   credentials: false,
  // });
  
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('backend/api', {exclude: ['']});
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}/backend/api`);
}
bootstrap();
