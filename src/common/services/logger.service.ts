import { LoggerService } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';
import * as fs from 'fs';

const logFormat = format.printf(
  ({ label, timestamp, level, message, context, stack, ms }) => {
    const wrappedContext = context ? ` [${context}]` : '';
    return `[${label}] [${level}] ${timestamp}${wrappedContext} (${ms}) ${
      stack ? stack : message
    }`;
  },
);

const logFileOptions = {
  datePattern: 'YYYY-MM-DD',
  maxFiles: 30,
  json: false,
  zippedArchive: true,
};

const logFileDir = path.resolve(__dirname, '../../../../logs');

if (!fs.existsSync(logFileDir)) {
  fs.mkdirSync(logFileDir);
}

const INFO = 'info';
const WARN = 'warn';
const ERROR = 'error';

export const CustomLoggerService: LoggerService = WinstonModule.createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format.label({ label: 'NestWinston' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.ms(),
    logFormat,
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.label(), utilities.format.nestLike()),
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: INFO,
      dirname: `${logFileDir}/${INFO}`,
      filename: '%DATE%.log',
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: WARN,
      dirname: `${logFileDir}/${WARN}`,
      filename: `%DATE%.${WARN}.log`,
    }),
    new transports.DailyRotateFile({
      ...logFileOptions,
      level: ERROR,
      dirname: `${logFileDir}/${ERROR}`,
      filename: `%DATE%.${ERROR}.log`,
      handleExceptions: true,
    }),
  ],
});
