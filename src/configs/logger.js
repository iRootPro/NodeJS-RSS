const { createLogger, format, transports } = require('express-winston');
const path = require('path');

module.exports = createLogger({
  format:
    format.combine(format.timestamp(), format.simple(),
      format.prettyPrint()),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.simple(),
      colorize: true,
      json: false,
      handleExceptions: true
    }),
    new transports.File({
      maxsize: 512000,
      maxFiles: 3,
      filename: path.join(__dirname, '../../', 'logs', 'info.log'),
      level: 'info',
      colorize: true,
      json: true,
      handleExceptions: true
    })
  ]
});
