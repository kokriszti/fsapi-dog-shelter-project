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
//ToDo: csak egy féle kapcsolat maradjon
//simán beégetve:
mongoose.connect("mongodb+srv://demo:demo@democluster.g1k5w.mongodb.net/testdb?retryWrites=true&w=majority")
.then(() => logger.info("MongoDB connection has been established successfully"))
    .catch((err) => {
        logger.error(err);
        process.exit();
    })


//configból docker nélkül, de akkor configban "database"-hez ez kell: {
//     "user": "demo",
//     "password": "demo",
//     "host": "democluster.g1k5w.mongodb.net/testdb?retryWrites=true&w=majority"
//   }
// mongoose.connect(`mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}`)
//     .then(() => logger.info("MongoDB connection has been established successfully"))
//     .catch((err) => {
//         logger.error(err);
//         process.exit();
//     })

//dockeres-s csatlakozás, configban "database"-hez ez kell: {
//     "host": "mongo:27017/testdb?retryWrites=true&w=majority"
//   }
// mongoose.connect(`mongodb://${config.database.host}`)
//     .then(() => {
//         logger.info("MongoDB connection has been established successfully")
//     })
//     .catch((err) => {
//         logger.error(err);
//         process.exit();
//     })

app.listen(port, () => {
    console.log(`App is listening on localhost:${port}`)
})
