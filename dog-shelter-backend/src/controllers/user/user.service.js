const User = require("../../models/user.model")


//READ:
exports.findAll = () => {
    return User.find()
}

//READ BY ID:
exports.findOne = id => {
    return User.findById(id)
}

//CREATE:
exports.create = userData => {
    const user = new User(userData);
    return user.save();
}

//UPDATE PUT:
exports.update = (id, updateData) => {
    return User.findByIdAndUpdate(id, updateData, {new: true, overwrite: true, runValidators: true})
}

//UPDATE PATCH:
exports.patch = (id, updateData) => {
    return User.findByIdAndUpdate(id, updateData, {new: true, runValidators: true})
}

