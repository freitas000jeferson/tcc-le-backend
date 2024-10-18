import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SetupSwagger(app: INestApplication): any {
  const options = new DocumentBuilder()
    .setTitle('Learn English')
    .setDescription('Serviço de Mensagens para aplicativo Móvel')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'DEV')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'x-client-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}
