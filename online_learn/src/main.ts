import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Online Learn API')
    .setDescription('Online Learn Application API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: 'http://localhost:3001', // 요청을 허용할 도메인
    credentials: true, // 인증 정보를 포함한 요청 허용
  });

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}

bootstrap();

