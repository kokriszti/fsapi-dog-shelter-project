const mongoose = require("mongoose")
const idValidator = require("mongoose-id-validator")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    adoptionForm: {
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        nrOfPplInHousehold: {
            type: Number,
            required: true
        },
        childrenInHousehold: {
            type: Boolean,
            required: true
        },
        ageOfYoungestChild: String,
        typeOfHouse: {
            type: String,
            required: true
        },
        otherDog: {
            type: Boolean,
            required: true
        },
        otherPet: {
            type: Boolean,
            required: true
        },
        otherPetDetails: String,
        nrOfHoursAlone: {
            type: Number,
            required: true
        },
        nrOfDailyWalks: {
            type: Number,
            required: true
        },
        wantedSizeSmall: {
            type: Boolean,
            required: true
        },
        wantedSizeMedium: {
            type: Boolean,
            required: true
        },
        wantedSizeBig: {
            type: Boolean,
            required: true
        },
        wantedAgePuppy: {
            type: Boolean,
            required: true
        },
        wantedAgeYoung: {
            type: Boolean,
            required: true
        },
        wantedAgeAdult: {
            type: Boolean,
            required: true
        },
        wantedAgeOld: {
            type: Boolean,
            required: true
        },
        introduction: {
            type: String,
            required: true
        }
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,       //ehhez kell: npm i mongoose-id-validator
        ref: "Appointment"
    }
}, {
    timestamps: true
});

UserSchema.plugin(idValidator);

//name: nagybetű, egyesszám, collection amit keres majd kisbetűvel többesszám
module.exports = mongoose.model("User", UserSchema)
