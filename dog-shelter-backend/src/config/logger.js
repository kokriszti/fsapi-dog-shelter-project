const winston = require('winston');
const path = require("path")

const options = {
    console: {
        //level: "debug",
        level: process.env.LOG_LEVEL_CONSOLE,
        format: winston.format.combine(
            winston.format.colorize(),      //színezi, error piros, stb
            winston.format.simple()         //.jsonnal nem működne a színes
        )
    },
    file: {
        //level: "info",
        level: process.env.LOG_LEVEL_FILE,
        filename: path.join(__dirname, "..", "..", "app.log"),
        format: winston.format.json()
    }
}

const logger = winston.createLogger({
    format: winston.format.simple(),        //azokra vonatkozik, amiket nem adunk meg külön options-ben
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ],
    exitOnError: false          //hiba esetén ne álljon le
})


module.exports = logger;
