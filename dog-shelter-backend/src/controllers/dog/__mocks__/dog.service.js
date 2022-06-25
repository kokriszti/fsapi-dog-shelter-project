const dogService = jest.mock("./dog.service")

let mockData;

dogService.findOne = jest.fn(id => {
    return Promise.resolve(mockData.find(p => p.id === id))
});

dogService.update = jest.fn((id, update) => {
    return Promise.resolve(Object.assign(mockData.find(p => p.id === id), update));
});


dogService.__setMockData = data => {
    mockData = data;
}

module.exports = dogService;
