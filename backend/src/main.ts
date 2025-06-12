import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for the API
  app.setGlobalPrefix("api");

  // Enable CORS for frontend communication
  app.enableCors({
    origin: ["http://localhost:5173"], // Frontend URL, adjust if needed
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('GPS Tracker API')
    .setDescription('API documentation for the GPS Tracker application')
    .setVersion('1.0')
    .addTag('gps')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Backend server is running on: http://localhost:${port}/api`);
  Logger.log(`📚 Swagger documentation is available at: http://localhost:${port}/api/docs`);
}

bootstrap();
