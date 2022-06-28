const logger = require("../../config/logger")
const createError = require("http-errors")
const userService = require("./user.service")



//READ
exports.findAll = async (req, res, next) => {
    try{
        const users = await userService.findAll()
        logger.debug(`Get all documents, returning ${users.length} items`)
        res.json(users)
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

//READ BY ID
exports.findOne = (req, res, next) => {
    return userService.findOne(req.params.id)            //thenable objektumot ad vissza, nem teljesen Promise, de olyasmi
        .then(user => {
            //ha ID formátuma jó, de nincs ilyen rekord, null-t ad vissza, nullcheck:
            if (!user) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
            logger.debug(`Get Document by ID ${req.params.id}`)
            res.json(user);
        })
        .catch(err => {
            logger.error(err);
            if (err.kind === "ObjectId") return next(new createError.BadRequest("Invalid ID format"))
            return next(new createError.InternalServerError(err))
        })

}

//CREATE
exports.create = async (req, res, next) => {

    try {
        const user = await userService.create(req.body)
        res.status(201).json(user)
    } catch (err) {
        logger.error(err)
        return next(new createError.InternalServerError(err))
    }
}

//UPDATE
exports.update = async (req, res, next) => {

    try {
        const user = await userService.update(req.params.id, req.body)        //{new: true} - válaszban a módosítottat adja vissza, nem az eredetit
        //ha ID formátuma jó, de nincs ilyen rekord, null-t ad vissza, nullcheck:
        if (!user) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
        logger.debug(`Updated document by ID ${req.params.id}`)
        res.json(user)
    }
    catch (err) {
        if (err.kind === "ObjectId") return next(new createError.BadRequest("Invalid ID format"))
        return next(new createError.InternalServerError(err))
    }
}

//PATCH
exports.patch = async (req, res, next) => {

    try {
        const user = await userService.patch(req.params.id, req.body)        //{new: true} - válaszban a módosítottat adja vissza, nem az eredetit
        //ha ID formátuma jó, de nincs ilyen rekord, null-t ad vissza, nullcheck:
        if (!user) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
        logger.debug(`Updated person by ID ${req.params.id}`)
        res.json(user)
    }
    catch (err) {
        if (err.kind === "ObjectId") return next(new createError.BadRequest("Invalid ID format"))
        return next(new createError.InternalServerError(err))
    }
}

