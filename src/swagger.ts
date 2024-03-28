import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function generateSwaggerFile(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Project Base Nestjs')
    .setDescription('Project Base Nestjs API description')
    .setVersion('1.0')
    .addTag('Project Base Nestjs')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  fs.writeFileSync('./swagger.yaml', yaml.dump(document));
}
