import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
@Module({
  imports: [DemoModule],
  controllers: [AppController],
  providers: [AppService],
})
// 中间件注册
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('demo');
  }
}
