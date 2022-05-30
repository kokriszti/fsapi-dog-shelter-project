const Appointment = require("../../models/appointment.model")


//READ:
exports.findAll = () => {
    return Appointment.find()
        .populate("dog", {name: 1, _id: 0})
        .populate("user", {"adoptionForm.firstName": 1, "adoptionForm.lastName": 1, _id: 0})
}

//READ BY ID:
exports.findOne = id => {
    return Appointment.findById(id)
      .populate("dog", {name: 1, _id: 0})
      .populate("user", {"adoptionForm.firstName": 1, "adoptionForm.lastName": 1, _id: 0})
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
