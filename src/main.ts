import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Express } from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const express = require('express');


  const options = new DocumentBuilder()
    .setTitle('Ventas REST API')
    .setDescription('API REST para Ventas de Camilacharry')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(4001);
}
bootstrap();
