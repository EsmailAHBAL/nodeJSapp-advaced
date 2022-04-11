const winston = require("winston");


class LoggerService {

    constructor(route){
        this.route = route;
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.printf(info =>{
                let message = ` ${info.level.toUpperCase()} || ${info.message} || `;
                message = info.obj ? message + `data ${JSON.stringify(info.obj)} | ` : message; 
                return message;
            }),
            transports: [
              new winston.transports.Console(),
              new winston.transports.File({ filename: `./log/${route}.log` }),
            ],
          });
          this.logger = logger;
    }

    async info (message){
        this.logger.log('info' , message);
    }

    async info (message , obj){
        this.logger.log('info' , message , {obj});
    }

    async error (message){
        this.logger.log('error' , message);
    }

    async error (message , obj){
        this.logger.log('error' , message , {obj});
    }

    async debug (message){
        this.logger.log('debug' , message);
    }

    async debug (message , obj){
        this.logger.log('debug' , message , {obj});
    }
}

module.exports = LoggerService;