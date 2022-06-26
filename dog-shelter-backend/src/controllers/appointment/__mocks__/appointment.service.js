const appointmentService = jest.mock("./appointment.service")

let mockData;

appointmentService.findOne = jest.fn(id => {
    return Promise.resolve(mockData.find(p => p.id === id))
});

appointmentService.findAll = jest.fn((filter, sorted) => {
    return Promise.resolve(mockData)
});

appointmentService.delete = jest.fn((id) => {
    return Promise.resolve({})
});


appointmentService.__setMockData = data => {
    mockData = data;
}

module.exports = appointmentService;
