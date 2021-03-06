const logger = require("../../config/logger")
const createError = require("http-errors")
const dogService = require("./dog.service")



//READ
exports.findAll = async (req, res, next) => {
    const queryString = req.query
    let filter = {};
    if (queryString.name_like) {                 // URLSearchParams.has
        filter.name = {$regex: new RegExp(queryString.name_like, "i")}         // URLSearchParams.get
    }
    if (queryString.status) {
        filter.status = queryString.status
    }
    if (queryString.size) {
        filter.size = queryString.size
    }
    if (queryString.gender) {
        filter.gender = queryString.gender
    }


    try{
        const dogs = await dogService.findAll(filter)
        logger.debug(`Get all documents, returning ${dogs.length} items`)
        res.json(dogs)
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

//READ BY ID
exports.findOne = (req, res, next) => {
    return dogService.findOne(req.params.id)            //thenable objektumot ad vissza, nem teljesen Promise, de olyasmi
        .then(dog => {
            //ha ID formátuma jó, de nincs ilyen rekord, null-t ad vissza, nullcheck:
            if (!dog) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
            logger.debug(`Get Document by ID ${req.params.id}`)
            res.json(dog);
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
        const dog = await dogService.create(req.body)
        res.status(201).json(dog)
    } catch (err) {
        logger.error(err)
        return next(new createError.InternalServerError(err))
    }
}

//UPDATE
exports.update = async (req, res, next) => {


    try {
        const dog = await dogService.update(req.params.id, req.body)        //{new: true} - válaszban a módosítottat adja vissza, nem az eredetit
        //ha ID formátuma jó, de nincs ilyen rekord, null-t ad vissza, nullcheck:
        if (!dog) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
        logger.debug(`Updated person by ID ${req.params.id}`)
        res.json(dog)
    }
    catch (err) {
        if (err.kind === "ObjectId") return next(new createError.BadRequest("Invalid ID format"))
        return next(new createError.InternalServerError(err))
    }
}

//PATCH
exports.patch = async (req, res, next) => {

    try {
        const dog = await dogService.patch(req.params.id, req.body)        //{new: true} - válaszban a módosítottat adja vissza, nem az eredetit
        //ha ID formátuma jó, de nincs ilyen rekord, null-t ad vissza, nullcheck:
        if (!dog) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
        logger.debug(`Updated document by ID ${req.params.id}`)
        res.json(dog)
    }
    catch (err) {
        if (err.kind === "ObjectId") return next(new createError.BadRequest("Invalid ID format"))
        return next(new createError.InternalServerError(err))
    }
}

//DELETE
exports.delete = async (req, res, next) => {
    try {
        const dog = await dogService.delete(req.params.id);
        if (!dog) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
        logger.debug(`Document with ID ${req.params.id} deleted`)
        res.json({})
    } catch (err) {
        if (err.kind === "ObjectId") return next(new createError.BadRequest("Invalid ID format"))
        return next(new createError.InternalServerError(err))
    }
}



