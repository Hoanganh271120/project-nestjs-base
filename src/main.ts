import * as dotenv from "dotenv";
dotenv.config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'winston-daily-rotate-file';
import { LoggingService } from './common/logging/logging.service';
import morgan from 'morgan';
import * as https from 'https'
import axios from 'axios'
import { generateSwaggerFile } from "./swagger";
import globalConfig from "./common/config/global.config";

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });

  // use if want to ignore ssl
  // axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  app.useGlobalPipes(new ValidationPipe());

  const loggingService = app.get(LoggingService);
  const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => loggingService.getLogger().child({ label: 'API' }).http(message.trim()),
      },
    }
  );
  app.use(morganMiddleware);
  const port = globalConfig().app.port;
  generateSwaggerFile(app);

  await app.listen(port);
  console.log(`App runs on port ${port}`);

}
bootstrap();
