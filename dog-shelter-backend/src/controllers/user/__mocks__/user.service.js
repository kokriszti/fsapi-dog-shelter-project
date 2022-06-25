const userService = jest.mock("./user.service");

let mockData;

userService.findOne = jest.fn(id => {
    return Promise.resolve(mockData.find(p => p.id === id))
});

userService.update = jest.fn((id, update) => {
    return Promise.resolve(Object.assign(mockData.find(p => p.id === id), update));
});

userService.__setMockData = data => {
    mockData = data;
}

module.exports = userService;
