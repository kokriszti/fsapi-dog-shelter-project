const Dog = require("../../models/dog.model")


//READ:
exports.findAll = (filter) => {
    return Dog.find(filter)
}

//READ BY ID:
exports.findOne = id => {
    return Dog.findById(id)
      //  .populate("appointments", {date: 1, _id: 0})
}

//CREATE:
exports.create = dogData => {
    const dog = new Dog(dogData);
    return dog.save();
}

//UPDATE PUT:
exports.update = (id, updateData) => {
    return Dog.findByIdAndUpdate(id, updateData, {new: true, overwrite: true, runValidators: true})       //toDo: overwrite:true felülírja az objektumot, kipróbálni
}

//UPDATE PATCH:
exports.patch = (id, updateData) => {
    return Dog.findByIdAndUpdate(id, updateData, {new: true, runValidators: true})
}

//DELETE
exports.delete = (id) => {
    return Dog.findByIdAndRemove(id)
}
