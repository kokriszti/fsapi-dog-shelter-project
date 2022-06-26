const dogService = jest.mock("./dog.service")

let mockData;

dogService.findOne = jest.fn(id => {
    return Promise.resolve(mockData.find(p => p.id === id))
});

dogService.update = jest.fn((id, update) => {
    return Promise.resolve(Object.assign(mockData.find(p => p.id === id), update));
});

dogService.findAll = jest.fn((filter) => {
    return Promise.resolve(mockData)
});

dogService.delete = jest.fn((id) => {
    return Promise.resolve({})
});


dogService.__setMockData = data => {
    mockData = data;
}

module.exports = dogService;
