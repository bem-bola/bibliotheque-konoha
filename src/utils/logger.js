const winston = require('winston');

require('winston-mongodb');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.MongoDB({
            db: process.env.MONGODB_URI || 'mongodb://localhost:27017/konoha',
            collection: 'logs',
            level: 'error',
            options: { useUnifiedTopology: true },
        }),
    ],
});

module.exports = logger;
