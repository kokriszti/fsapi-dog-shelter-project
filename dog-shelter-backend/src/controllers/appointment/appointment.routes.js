const express = require("express");
const router = express.Router();
const controller = require("./appointment.controller")

//auth
const authenticationByJWT = require("../../auth/authenticate")
const adminRoleHandler = require ("../../auth/adminOnly")
const authHandler = require("../../auth/authHandler")

router.get("/", authenticationByJWT, (req, res, next) => {
    return controller.findAll(req, res, next)
})

router.get("/:id", authenticationByJWT, (req, res, next) => {
    return controller.findOne(req, res, next)
})

router.post("/", (req, res, next) =>{
    return controller.create(req, res, next)
})

router.delete("/:id", authenticationByJWT, (req, res, next) => {
    return controller.delete(req, res, next)
})

module.exports = router;
