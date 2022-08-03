import { createLogger, transports, format } from 'winston';
import morgan from 'morgan';
const { combine, colorize, timestamp, printf } = format;
import winstonTimestampColorize from 'winston-timestamp-colorize';
import { format as dateFormat } from 'date-fns';
import chalk from 'chalk';

/**
 * creating the logger.
 *
 * minimumloglevel: info
 * Format: json
 * error logs are written to the file `logs/error.log`
 * other logs are written to the file `logs/combined.log`
 */
export const winston = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: {
    service: 'user-service'
  }
});

/**
 * setting the print format for the output in the console.
 */
const consoleFormat = printf(({ level, message, metadata, timestamp }) => {
  return `[${timestamp}] ${metadata.class}.${metadata.method} ${level}: ${message}`;
});

/**
 * in production every output gets written to the console.
 */
if (process.env.NODE_ENV !== 'production') {
  winston.add(
    new transports.Console({
      format: combine(
        timestamp({
          format: 'HH:mm:ss'
        }),
        winstonTimestampColorize({
          color: 'grey'
        }),
        colorize({
          all: true
        }),
        consoleFormat
      )
    })
  );
}

/**
 * outputs every log with statuscode >= 400 to the console.
 */
export const consoleMorgan = morgan(
  (tokens: any, req: any, res: any) => {
    return [
      chalk.white('['),
      chalk.gray(dateFormat(new Date(), 'HH:mm:ss')),
      chalk.white('] '),
      chalk.white(tokens.url(req, res)),
      chalk.green(' ' + tokens.method(req, res)),
      chalk.white(': '),
      chalk.blue(tokens.status(req, res)),
      chalk.yellow(' ' + tokens['response-time'](req, res) + ' ms '),
      chalk.yellow(tokens['remote-addr'](req, res)),
      chalk.red(' from ' + tokens.referrer(req, res)),
      chalk.red(' with ' + tokens['user-agent'](req, res))
    ].join('');
  },
  {
    skip: function (req: any, res: any) {
      return res.statusCode < 400;
    }
  }
);
