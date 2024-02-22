import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { generateDocument } from './doc';
// import { FastifyLogger } from './common/logger';
import fastify from 'fastify';
async function bootstrap() {
  // const fastifyInstance = {
  //   logger: FastifyLogger,
  // };
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: '2', //全局配制版本
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // swagger文档相关
  generateDocument(app);
  await app.listen(3003);
}
bootstrap();
