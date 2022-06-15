const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const logger = require("./config/logger");
const createError = require("http-errors")
const dogRoutes = require("./controllers/dog/dog.routes");
const userRoutes = require("./controllers/user/user.routes")
const appointmentRoutes = require("./controllers/appointment/appointment.routes")

const app = express();

app.use(cors());

//auth
const authenticationByJWT = require("./auth/authenticate")
const login = require("./auth/login")             //refresh nélküli működés, authHandler kiváltotta
const adminRoleHandler = require ("./auth/adminOnly")
const authHandler = require("./auth/authHandler")

app.use(morgan("combined", {
    stream: {
        write: (message) => logger.info(message)        //winston loggernek átadja
    }
}));

//express 4.16 felett:
app.use(express.json());

//auth végpont:
// app.post("/login", login)            //refresh nélküli működés
app.post("/login", authHandler.login)
app.post("/refresh", authHandler.refresh)
app.post("/logout", authHandler.logout)

//autentikáció, autorizáció:
//app.use("/dog", authenticationByJWT, adminRoleHandler, dogRoutes)
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
