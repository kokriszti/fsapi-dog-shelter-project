const mongoose = require("mongoose")
const idValidator = require("mongoose-id-validator")

const AppointmentSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    comment: String,
    dog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dog",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

AppointmentSchema.plugin(idValidator);

//name: nagybetű, egyesszám, collection amit keres majd kisbetűvel többesszám
module.exports = mongoose.model("Appointment", AppointmentSchema)
