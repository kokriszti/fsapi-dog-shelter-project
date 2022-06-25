const {mockRequest, mockResponse} = require("jest-mock-req-res")
const createError = require("http-errors");
const userController = require("./user.controller")
const userService = require("./user.service")
const dogController = require("../dog/dog.controller");
const dogService = require("../dog/dog.service");

jest.mock("./user.service")

describe("UserController tests", () => {

    let mockData;

    let response;
    let nextFunction;


    beforeEach(() => {
        mockData = [{
            "id": "1",
            "username": "user1",
            "password": "user1",
            "isAdmin": false
        }, {
            "id": "2",
            "username": "admin",
            "password": "admin",
            "isAdmin": true
        }, {
            "id": "3",
            "username": "user3",
            "password": "user3",
            "isAdmin": false
        }, {
            "id": "4",
            "username": "user4",
            "password": "user4",
            "isAdmin": false
        }];



        userService.__setMockData(mockData)

        response = mockResponse();
        nextFunction = jest.fn();
    })

    test("findOne() with valid ID", () => {
        const USER_ID = "1";

        const request = mockRequest({
            params: {
                id: USER_ID
            }
        });

        return userController.findOne(request, response, nextFunction)
            .then(() => {
                expect(userService.findOne).toBeCalledWith(USER_ID);

                expect(response.json).toBeCalledWith(mockData.find(p => p.id === USER_ID));
            })
    })

    test("update() with valid ID", () => {

        const UPDATE_USER_ID = "3";
        const UPDATE_USERNAME = 'user3';
        const UPDATE_PASSWORD = 'update test';
        const UPDATE_ISADMIN = true;

        const request = mockRequest({
            params: {
                id: UPDATE_USER_ID
            },
            body: {
                'username': UPDATE_USERNAME,
                'password': UPDATE_PASSWORD,
                'isAdmin': UPDATE_ISADMIN
            }
        })

        return userController.update(request, response, nextFunction)
            .then(() => {
                // check if PersonService.update() is called correctly
                const updateObj = {
                    username: UPDATE_USERNAME,
                    password: UPDATE_PASSWORD,
                    isAdmin: UPDATE_ISADMIN
                };
                expect(userService.update).toBeCalledWith(UPDATE_USER_ID, updateObj);

                // check if response is correct
                const responseUSER = {
                    id: UPDATE_USER_ID,
                    username: UPDATE_USERNAME,
                    password: UPDATE_PASSWORD,
                    isAdmin: UPDATE_ISADMIN
                };
                expect(response.json).toBeCalledWith(responseUSER);
            });
    });

});
