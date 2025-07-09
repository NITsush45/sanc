import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: "*" });
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, "0.0.0.0");
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
}
bootstrap();
