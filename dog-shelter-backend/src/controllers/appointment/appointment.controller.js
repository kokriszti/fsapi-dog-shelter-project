const logger = require("../../config/logger")
const createError = require("http-errors")
const appointmentService = require("./appointment.service")



//READ
exports.findAll = async (req, res, next) => {
    try{
        const appointments = await appointmentService.findAll()
        logger.debug(`Get all documents, returning ${appointments.length} items`)
        res.json(appointments)
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

//READ BY ID
exports.findOne = (req, res, next) => {
    return appointmentService.findOne(req.params.id)            //thenable objektumot ad vissza, nem teljesen Promise, de olyasmi
        .then(appointment => {
            //ha ID formátuma jó, de nincs ilyen rekord, null-t ad vissza, nullcheck:
            if (!appointment) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
            logger.debug(`Get Document by ID ${req.params.id}`)
            res.json(appointment);
        })
        .catch(err => {
            logger.error(err);
            if (err.kind === "ObjectId") return next(new createError.BadRequest("Invalid ID format"))
            return next(new createError.InternalServerError(err))
        })

}

//CREATE
exports.create = async (req, res, next) => {
    //toDo: validáció ehelyett:

    // if(!req.body["first_name"] || !req.body["last_name"] || !req.body["email"]) {
    //     return next(new createError.BadRequest("Invalid request body"))     //ahhoz, hogy felismerje a hibatípust: npm i @types/http-errors
    // }                                                                           //BadRequest már tartalmazza a 400-as st kódot
    //szét lehet szedni a feltételt, és külön hibaüziket írni
    try {
        const appointment = await appointmentService.create(req.body)
        res.status(201).json(appointment)
    } catch (err) {
        logger.error(err)
        return next(new createError.InternalServerError(err))
    }
}


//DELETE
exports.delete = async (req, res, next) => {
    try {
        const appointment = await appointmentService.delete(req.params.id);
        if (!appointment) return next(new createError.NotFound(`Document with ID ${req.params.id} not found`))
        logger.debug(`Document with ID ${req.params.id} deleted`)
        res.json({})
    } catch (err) {
        if (err.kind === "ObjectId") return next(new createError.BadRequest("Invalid ID format"))
        return next(new createError.InternalServerError(err))
    }
}



