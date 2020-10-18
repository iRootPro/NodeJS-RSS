const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

expressWinston.requestWhitelist = ['url', 'query', 'body'];

const requestLogger = expressWinston.logger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      prettyPrint: true
    }),
    new winston.transports.File({
      level: 'info',
      maxsize: 512000,
      maxFiles: 3,
      filename: path.join(__dirname, '../../', 'logs', 'info.log'),
      handleExceptions: true,
      format: winston.format.simple()
    })
  ],
  exitOnError: false
});

process.on('uncaughtException', err => winston.error('uncaught exception: ', err));
process.on('unhandledRejection', (reason, p) => winston.error('unhandled rejection: ', reason, p));

const errorLogger = expressWinston.errorLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      level: 'error',
      handleExceptions: true
    }),
    new winston.transports.File({
      level: 'error',
      maxsize: 512000,
      maxFiles: 3,
      filename: path.join(__dirname, '../../', 'logs', 'error.log'),
      handleExceptions: true
    })
  ],
  exitOnError: true
});

module.exports = { request: requestLogger, error: errorLogger };
