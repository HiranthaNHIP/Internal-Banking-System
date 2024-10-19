// logger.js
const winston = require('winston');
const {createLogger, format, transports} = require('winston');

//LOGGING FUNCTION
const authLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/auth.log',
            level: "info",
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename: 'logs/error-auth.log',
            level: "error",
            format: format.combine(format.timestamp(),format.json())
        })
    ]
});

const accountLogger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/info-account.log',
            level: "info",
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename: 'logs/error-account.log',
            level: "error",
            format: format.combine(format.timestamp(),format.json())
        })
    ]
});

module.exports = { authLogger, accountLogger };


