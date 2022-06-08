const mongoose = require("mongoose")

const RefreshTokenSchema = new mongoose.Schema({
    token: String
    }
)
// const RefreshTokenSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     token: String,
//     expires: Date,
//     created: { type: Date, default: Date.now },
//     createdByIp: String,
//     revoked: Date,
//     revokedByIp: String,
//     replacedByToken: String
// });
//
// RefreshTokenSchema.virtual('isExpired').get(function () {
//     return Date.now() >= this.expires;
// });
//
// RefreshTokenSchema.virtual('isActive').get(function () {
//     return !this.revoked && !this.isExpired;
// });
//
// RefreshTokenSchema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         // remove these props when object is serialized
//         delete ret._id;
//         delete ret.id;
//         delete ret.user;
//     }
// });

//name: nagybetű, egyesszám, collection amit keres majd kisbetűvel többesszám
module.exports = mongoose.model("RefreshToken", RefreshTokenSchema)
