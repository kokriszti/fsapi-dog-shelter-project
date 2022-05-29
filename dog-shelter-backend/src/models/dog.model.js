const mongoose = require("mongoose")

//toDo: owner nem required, de ha van, a mezői igen:
const DogSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    isVaccinated: {
        type: Boolean,
        required: true
    },
    isSterilized: {
        type: Boolean,
        required: true
    },
    kennelNr: {
        type: String,
        required: true
    },
    activity: String,
    toChild: Boolean,
    toFlat: Boolean,
    appointments: [{                                   //nem muszáj ID validátor, mert post létrejöttekor kerül ide be
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    }],
    owner: {
        ownerLastName: String,
        ownerFirstName: String,
        ownerEmail: String,
        ownerPhone: String,
        ownerAddress: {
            zip: Number,
            city: String,
            streetAndNr: String
        },
        dateOfAdoption: String
    }
}, {
    timestamps: true
});

//name: nagybetű, egyesszám, collection amit keres majd kisbetűvel többesszám
module.exports = mongoose.model("Dog", DogSchema)
