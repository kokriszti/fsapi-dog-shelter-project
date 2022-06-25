const {mockRequest, mockResponse} = require("jest-mock-req-res")
const createError = require("http-errors");
const appointmentController = require("./appointment.controller")
const appointmentService = require("./appointment.service")

jest.mock("./appointment.service")

describe("AppointmentController tests", () => {

    let mockData;

    let response;
    let nextFunction;


    beforeEach(() => {
        mockData = [{
            "id": "1",
            "date": "2021-12-04",
            "time": "12:00",
            "comment": "User with adoptionform."
        }, {
            "id": "2",
            "date": "2021-12-04",
            "time": "12:00",
            "comment": "User with adoptionform."
        }, {
            "id": "3",
            "date": "2021-12-04",
            "time": "12:00",
            "comment": "User with adoptionform."
        }, {
            "id": "4",
            "date": "2021-12-04",
            "time": "12:00",
            "comment": "User with adoptionform."
        }];



        appointmentService.__setMockData(mockData)

        response = mockResponse();
        nextFunction = jest.fn();
    })

    test("findOne() with valid ID", () => {
        const APPOINTMENT_ID = "1";

        const request = mockRequest({
            params: {
                id: APPOINTMENT_ID
            }
        });

        return appointmentController.findOne(request, response, nextFunction)
            .then(() => {
                expect(appointmentService.findOne).toBeCalledWith(APPOINTMENT_ID);

                expect(response.json).toBeCalledWith(mockData.find(p => p.id === APPOINTMENT_ID));
            });
    });

    test("findAll()", () => {
        const FILTER = {};
        let SORTED = true;

        const request = mockRequest({
            query: {
                _sort: "toSort"
            }
        });

        return appointmentController.findAll(request, response, nextFunction)
            .then(() => {
                expect(appointmentService.findAll).toBeCalledWith(FILTER, SORTED);

                expect(response.json).toBeCalledWith(mockData);
            });
    });


});
