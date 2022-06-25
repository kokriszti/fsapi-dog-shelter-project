const {mockRequest, mockResponse} = require("jest-mock-req-res")
const createError = require("http-errors");
const dogController = require("./dog.controller")
const dogService = require("./dog.service")

jest.mock("./dog.service")

describe("AppointmentController tests", () => {

    let mockData;

    let response;
    let nextFunction;


    beforeEach(() => {
        mockData = [{
            "id": "1",
            "status": "adoptable",
            "name": "dog1",
            "gender": "male"
        }, {
            "id": "2",
            "status": "adoptable",
            "name": "dog2",
            "gender": "male"
        }, {
            "id": "3",
            "status": "adoptable",
            "name": "dog3",
            "gender": "male"
        }, {
            "id": "4",
            "status": "adoptable",
            "name": "dog4",
            "gender": "male"
        }];



        dogService.__setMockData(mockData)

        response = mockResponse();
        nextFunction = jest.fn();
    })

    test("findOne() with valid ID", () => {
        const DOG_ID = "1";

        const request = mockRequest({
            params: {
                id: DOG_ID
            }
        });

        return dogController.findOne(request, response, nextFunction)
            .then(() => {
                expect(dogService.findOne).toBeCalledWith(DOG_ID);

                expect(response.json).toBeCalledWith(mockData.find(p => p.id === DOG_ID));
            })
    })

    test("update() with valid ID", () => {

        const UPDATE_DOG_ID = "3";
        const UPDATE_STATUS = 'adopted';
        const UPDATE_NAME = 'update test';
        const UPDATE_GENDER = 'male';

        const request = mockRequest({
            params: {
                id: UPDATE_DOG_ID
            },
            body: {
                'status': UPDATE_STATUS,
                'name': UPDATE_NAME,
                'gender': UPDATE_GENDER
            }
        })

        return dogController.update(request, response, nextFunction)
            .then(() => {
                // check if PersonService.update() is called correctly
                const updateObj = {
                    status: UPDATE_STATUS,
                    name: UPDATE_NAME,
                    gender: UPDATE_GENDER
                };
                expect(dogService.update).toBeCalledWith(UPDATE_DOG_ID, updateObj);

                // check if response is correct
                const responseDOG = {
                    id: UPDATE_DOG_ID,
                    status: UPDATE_STATUS,
                    name: UPDATE_NAME,
                    gender: UPDATE_GENDER
                };
                expect(response.json).toBeCalledWith(responseDOG);
            });
    });


});
