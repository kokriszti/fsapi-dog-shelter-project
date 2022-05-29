const Appointment = require("../../models/appointment.model")


//READ:
exports.findAll = () => {
    return Appointment.find()
}

//READ BY ID:
exports.findOne = id => {
    return Appointment.findById(id)
      //.populate("dogs", {name: 1, _id: 0})          //toDo: ezzel a sorral megnézni
      //.populate("users", {adoptionForm.firstName: 1, adoptionForm.lastName: 1, _id: 0})       //toDo: ezzel a sorral megnézni
}

//CREATE:
exports.create = appointmentData => {
    const appointment = new Appointment(appointmentData);
    return appointment.save();
}


//DELETE
exports.delete = (id) => {
    return Appointment.findByIdAndRemove(id)
}
