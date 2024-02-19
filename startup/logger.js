import config from 'config';
import winston from 'winston';
import 'winston-mongodb';

const db_url = config.get('db_url');
const db_name = config.get('db_name');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.MongoDB({db:`${db_url}${db_name}`})
    ],
    handleExceptions:true,
    handleRejections:true
  });

  export default logger;