const express = require("express");
const morgan = require("morgan");
const logger = require("./config/logger");
const createError = require("http-errors")
const dogRoutes = require("./controllers/dog/dog.routes");
const userRoutes = require("./controllers/user/user.routes")
const appointmentRoutes = require("./controllers/appointment/appointment.routes")

const app = express();

app.use(morgan("combined", {
    stream: {
        write: (message) => logger.info(message)        //winston loggernek átadja
    }
}));

//express 4.16 felett:
app.use(express.json());

app.use("/dog", dogRoutes)
app.use("/user", userRoutes)
app.use("/appointment", appointmentRoutes)

app.use("/", (req, res, next) => {
    return next(new createError.BadRequest("Endpoint does not exist"))
})

//hibakezelő middleware (middlewarek között utolsóként kell létrehozni):
app.use((err, req, res, next) => {
    logger.error(`ERROR ${err.statusCode}: ${err.message}`);         //winstonos logolás, error szintű log, file-ban jelenik meg options szerint
    res.status(err.statusCode)
    res.json({
        hasError: true,
        message: err.message
    });
})

module.exports = app;
