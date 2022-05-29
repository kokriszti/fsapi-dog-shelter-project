const Dog = require("../../models/dog.model")


//READ:
exports.findAll = () => {
    return Dog.find()
}

//READ BY ID:
exports.findOne = id => {
    return Dog.findById(id)
      //  .populate("appointments", {date: 1, _id: 0})          //toDo: ezzel a sorral nem jó, megnézni
}

//CREATE:
exports.create = dogData => {
    const dog = new Dog(dogData);
    return dog.save();
}

//UPDATE PUT:
exports.update = (id, updateData) => {
    return Dog.findByIdAndUpdate(id, updateData, {new: true, overwrite: true})       //toDo: overwrite:true felülírja az objektumot, kipróbálni
}

//UPDATE PATCH:
exports.patch = (id, updateData) => {
    return Dog.findByIdAndUpdate(id, updateData, {new: true})
}

//DELETE
exports.delete = (id) => {
    return Dog.findByIdAndRemove(id)
}
