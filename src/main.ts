import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptor/response-success.interceptor';
import { AllExceptionFilter } from './common/filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseSuccessInterceptor(reflector));
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS')
    .setDescription('The NestJS API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
