import { Injectable, OnModuleInit } from '@nestjs/common';
import Winston from 'winston';
import  'winston-daily-rotate-file';


@Injectable()
export class LoggingService implements OnModuleInit{
    
    private logger: Winston.Logger;
    private myFormat = Winston.format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    });

    fileTransport = new Winston.transports.DailyRotateFile({
        filename: 'logs/applications/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d'
    });

    errorFileTransport = new Winston.transports.DailyRotateFile({
        filename: 'logs/errors/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d',
        level: 'error'
    });

    expTransport = new Winston.transports.DailyRotateFile({
        filename: 'logs/exceptions/exceptions-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d'
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
    
    onModuleInit() : void {
        this.logger = Winston.createLogger({
            level: 'http',
            format: Winston.format.combine(
                Winston.format.timestamp(),
                this.myFormat
            ),
            transports: [
                new Winston.transports.Console({ handleExceptions: true }),
                this.fileTransport,
                this.errorFileTransport
            ],
            exceptionHandlers: [
                this.expTransport
            ],
            exitOnError: false,
        });
    }

    public getLogger() : Winston.Logger {
        return this.logger;
    }
}
