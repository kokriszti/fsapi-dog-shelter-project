const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const path = require("path")
const logger = require("./config/logger");
const createError = require("http-errors");
const YAML = require("yamljs")
const swaggerUI = require("swagger-ui-express")
const dogRoutes = require("./controllers/dog/dog.routes");
const userRoutes = require("./controllers/user/user.routes")
const appointmentRoutes = require("./controllers/appointment/appointment.routes")
const angularAppPath = path.join(__dirname, "..", "public", "angular")

const app = express();

app.use(cors());

//auth
const authenticationByJWT = require("./auth/authenticate")
const adminRoleHandler = require ("./auth/adminOnly")
const authHandler = require("./auth/authHandler")

app.use(morgan("combined", {
    stream: {
        write: (message) => logger.info(message)        //winston loggernek átadja
    }
}));


app.use(express.json());

app.use("/api/api-docs", swaggerUI.serve, swaggerUI.setup(YAML.load("./docs/openapi.yaml")))

//auth végpont:
app.post("/api/login", authHandler.login)
app.post("/api/refresh", authHandler.refresh)
app.post("/api/logout", authHandler.logout)


app.use("/api/dog", dogRoutes)
app.use("/api/user", userRoutes)
app.use("/api/appointment", appointmentRoutes)

//angular statikus kiszolgálása
app.use("/", express.static(angularAppPath))

app.get("*", (req, res) => {
    res.sendFile(angularAppPath + "/index.html")
})

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
