import winston from 'winston';

export default function () {
  return new(winston.Logger)({
    transports: [
      // colorize the output to the console
      new(winston.transports.Console)({
        timestamp: new Date().toLocaleTimeString(),
        colorize: true,
      })
    ]
  });
}