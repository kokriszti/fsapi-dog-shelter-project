const mongoose = require("mongoose")


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
        type: {
            ownerLastName: {
                type: String,
                required: true
            },
            ownerFirstName: {
                type: String,
                required: true
            },
            ownerEmail: {
                type: String,
                required: true
            },
            ownerPhone: {
                type: String,
                required: true
            },
            ownerAddress: {
                zip: {
                    type: Number,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                },
                streetAndNr: {
                    type: String,
                    required: true
                }
            },
            dateOfAdoption: {
                type: String,
                required: true
            }
        },
        required: false
    }
}, {
    timestamps: true
});

//name: nagybetű, egyesszám, collection amit keres majd kisbetűvel többesszám
module.exports = mongoose.model("Dog", DogSchema)
