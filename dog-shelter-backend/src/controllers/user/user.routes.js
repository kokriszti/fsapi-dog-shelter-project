const express = require("express");
const router = express.Router();
const controller = require("./user.controller")

//auth
const authenticationByJWT = require("../../auth/authenticate")
const login = require("../../auth/login")             //refresh nélküli működés, authHandler kiváltotta
const adminRoleHandler = require ("../../auth/adminOnly")
const authHandler = require("../../auth/authHandler")

router.get("/", (req, res, next) => {
    return controller.findAll(req, res, next)
})

router.get("/:id", authenticationByJWT, (req, res, next) => {
    return controller.findOne(req, res, next)
})

router.post("/", (req, res, next) =>{
    return controller.create(req, res, next)
})

router.put("/:id", (req, res, next) => {
    return controller.update(req, res, next)
})

router.patch("/:id", authenticationByJWT, (req, res, next) => {
    return controller.patch(req, res, next)
})

module.exports = router;
