import winston from 'winston';

//se crea una cn=onstante con los lvls y colores
const customLevelsOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		debug: 4,
	},
	colors: {
		fatal: 'red',
		error: 'yellow',
		warning: 'black',
		info: 'green',
		debug: 'magenta',
	},
};

export const logger = winston.createLogger({
    levels: customLevelsOptions.levels, //defino mis lvls
    transports: [
        new winston.transports.Console({ 
            level: 'info', //el lvl debe conicidir con el que muestro en la informacion
            //agregamos el formato
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),

        new winston.transports.File({ 
            filename: './logs/errors.log', 
            level: 'warning',
            format: winston.format.simple()
        })
    ]
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`Request ${req.method} - ${req.url} - Date: ${new Date().toLocaleString()}`);
    next();
};