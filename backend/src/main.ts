import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

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

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Backend server is running on: http://localhost:${port}/api`);
}

bootstrap();
