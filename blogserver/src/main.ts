import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const CORS_OPTIONS = {
  origin: ['http://localhost:4200'], // oder '*' oder was immer gebraucht wird
  allowedHeaders: [
  'Access-Control-Allow-Origin',
  'Origin',
  'X-Requested-With',
  'Accept',
  'Content-Type',
  'Authorization',
  ],
  exposedHeaders: 'Authorization',
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  };

  const adapter = new FastifyAdapter();
  adapter.enableCors(CORS_OPTIONS);
  const app = await NestFactory.create<NestFastifyApplication>(
  AppModule, adapter);
  
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
