const express = require("express");
const router = express.Router();
const controller = require("./dog.controller")

//auth
const authenticationByJWT = require("../../auth/authenticate")
const adminRoleHandler = require ("../../auth/adminOnly")
const authHandler = require("../../auth/authHandler")

router.get("/", (req, res, next) => {
    return controller.findAll(req, res, next)
})

router.get("/:id", (req, res, next) => {
    return controller.findOne(req, res, next)
})

router.post("/", authenticationByJWT, (req, res, next) =>{
    return controller.create(req, res, next)
})

router.put("/:id", (req, res, next) => {
    return controller.update(req, res, next)
})

router.patch("/:id", (req, res, next) => {
    return controller.patch(req, res, next)
})

router.delete("/:id", authenticationByJWT, adminRoleHandler, (req, res, next) => {
    return controller.delete(req, res, next)
})

module.exports = router;
