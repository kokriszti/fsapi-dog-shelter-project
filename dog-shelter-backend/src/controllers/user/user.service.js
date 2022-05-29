const User = require("../../models/user.model")


//READ:
exports.findAll = () => {
    return User.find()
}

//READ BY ID:
exports.findOne = id => {
    return User.findById(id)
    //  .populate("appointments", {_id: 0})          //toDo: ezzel a sorral megnézni
}

//CREATE:
exports.create = userData => {
    const user = new User(userData);
    return user.save();
}

//UPDATE PUT:
exports.update = (id, updateData) => {
    return User.findByIdAndUpdate(id, updateData, {new: true, overwrite: true})       //toDo: overwrite:true felülírja az objektumot, kipróbálni
}

//UPDATE PATCH:
exports.patch = (id, updateData) => {
    return User.findByIdAndUpdate(id, updateData, {new: true})
}

