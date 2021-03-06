const config = require("config")
require("dotenv").config()
const mongoose = require("mongoose")

const logger = require("./config/logger")
const app = require("./server")

const port = config.port;

//ellenőrzés, ha nem talál pl adatbázis config adatokat, álljon le:
if(!config.has("database")){
    logger.error("No database config found");
    process.exit()
}

mongoose.connect(`mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}`)
    .then(() => logger.info("MongoDB connection has been established successfully"))
    .catch((err) => {
        logger.error(err);
        process.exit();
    })



app.listen(port, () => {
    console.log(`App is listening on localhost:${port}`)
})
