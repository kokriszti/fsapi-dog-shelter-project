const app = require("./server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Dog = require("./models/dog.model")
const User = require("./models/user.model")
const Appointment = require("./models/appointment.model")
const config = require("config");
const logger = require("./config/logger");
const jwt = require("jsonwebtoken")

describe("REST API integration tests", () => {

    const insertDogData = [{
        "status": "adoptable",
        "name": "Integration test 1",
        "gender": "szuka",
        "size": "nagy",
        "dateOfBirth": "2021-10-23",
        "description": "Integer ac leo. Pellentesque ultrices mattis odio.",
        "imgSrc": "/assets/dog-pics/01.jpg",
        "isVaccinated": true,
        "isSterilized": true,
        "kennelNr": "11",
        "activity": "magas",
        "toChild": true,
        "toFlat": true,
        "appointments": []
    }, {
        "status": "adoptable",
        "name": "Integration test 2",
        "gender": "szuka",
        "size": "nagy",
        "dateOfBirth": "2021-10-23",
        "description": "Integer ac leo. Pellentesque ultrices mattis odio.",
        "imgSrc": "/assets/dog-pics/01.jpg",
        "isVaccinated": true,
        "isSterilized": true,
        "kennelNr": "11",
    }];

    const insertUserData = [{
        "username": "admin",
        "password": "admin",
        "isAdmin": true,
        "adoptionForm": {
            "lastName": "admin",
            "firstName": "admin",
            "phone": "0630123456",
            "email": "integrationTest",
            "age": 30,
            "nrOfPplInHousehold": 5,
            "childrenInHousehold": true,
            "ageOfYoungestChild": "6-12 év között",
            "typeOfHouse": "Családi ház",
            "otherDog": false,
            "otherPet": true,
            "otherPetDetails": "Rágcsáló",
            "nrOfHoursAlone": 6,
            "nrOfDailyWalks": 3,
            "wantedSizeSmall": true,
            "wantedSizeMedium": false,
            "wantedSizeBig": false,
            "wantedAgePuppy": true,
            "wantedAgeYoung": true,
            "wantedAgeAdult": false,
            "wantedAgeOld": false,
            "introduction": "integrationTest"
        }
    }, {
        "username": "user",
        "password": "user",
        "isAdmin": false,
        "adoptionForm": {
            "lastName": "user",
            "firstName": "user",
            "phone": "0630123456",
            "email": "integrationTest",
            "age": 30,
            "nrOfPplInHousehold": 5,
            "childrenInHousehold": true,
            "ageOfYoungestChild": "6-12 év között",
            "typeOfHouse": "Családi ház",
            "otherDog": false,
            "otherPet": true,
            "otherPetDetails": "Rágcsáló",
            "nrOfHoursAlone": 6,
            "nrOfDailyWalks": 3,
            "wantedSizeSmall": true,
            "wantedSizeMedium": false,
            "wantedSizeBig": false,
            "wantedAgePuppy": true,
            "wantedAgeYoung": true,
            "wantedAgeAdult": false,
            "wantedAgeOld": false,
            "introduction": "integrationTest"
        }
    }];

    let insertAppointmentData = [{
        "date": "2022-08-05",
        "time": "12:00",
        "comment": "Maecenas ut massa quis augue.",
        "dog": "",
        "user": ""
        }, {
        "date": "2022-06-12",
        "time": "10:00",
        "comment": "Maecenas ut massa quis augue.",
        "dog": "",
        "user": ""
    }];


    //minden teszteset előtt létrehoz adatbázis kapcsolatot
    beforeEach(async () => {
        const mongoConnection = await mongoose.connect(`mongodb://localhost:27017/JestDB`)
        console.log("MongoDB connection has been established successfully");
        return mongoConnection;
    })

    //minden teszteset előtt törli az adatbázist és lezárja a kapcsolatot
    afterEach(async () => {
        await mongoose.connection.db.dropDatabase();
        const mongoDisconnect = await mongoose.connection.close();
        console.log("MongoDB connection closed");
        return mongoDisconnect;
    })

    test("GET /api/dog endpoint test", async () => {
        await Dog.insertMany(insertDogData);
        const resp = await supertest(app).get("/api/dog").expect(200)
        expect(Array.isArray(resp.body)).toBeTruthy();
        expect(resp.body.length).toBe(insertDogData.length)
        resp.body.forEach((dog, index) => {
            expect(dog.status).toBe(insertDogData[index].status)
            expect(dog.name).toBe(insertDogData[index].name)
            expect(dog.gender).toBe(insertDogData[index].gender)
        })
    });

    test("GET api/dog/:id endpoint test", async () => {
        const testDogs = await Dog.insertMany(insertDogData);
        const firstDogId = testDogs[0]._id;
        const resp = await supertest(app).get(`/api/dog/${firstDogId.toString()}`).expect(200)
        expect(resp.body._id).toBe(firstDogId.toString())
        expect(resp.body.status).toBe(insertDogData[0].status)
        expect(resp.body.name).toBe(insertDogData[0].name)
        expect(resp.body.gender).toBe(insertDogData[0].gender)
    })

    test("DELETE api/dog/:id endpoint test without auth", async () => {
        const testDogs = await Dog.insertMany(insertDogData);
        const firstDogId = testDogs[0]._id;
        const resp = await supertest(app).delete(`/api/dog/${firstDogId.toString()}`).expect(401)
    })

    test("POST /api/dog endpoint test without auth", async () => {
        const newDog = {
            "status": "adoptable",
            "name": "Integration test 2",
            "gender": "szuka",
            "size": "nagy",
            "dateOfBirth": "2021-10-23",
            "description": "Integer ac leo. Pellentesque ultrices mattis odio.",
            "imgSrc": "/assets/dog-pics/01.jpg",
            "isVaccinated": true,
            "isSterilized": true,
            "kennelNr": "11",
        }
        const resp = await supertest(app).post("/api/dog").send(newDog).expect(401)
        // expect(resp.body.lastName).toBe(newUser.lastName)
        // expect(resp.body.firstName).toBe(newUser.firstName)
        // expect(resp.body.phone).toBe(newUser.phone)
    });

    test("POST /api/user endpoint test", async () => {
        const newUser = {
            "username": "integrationTest",
            "password": "integrationTest",
            "isAdmin": false,
            "adoptionForm": {
                "lastName": "integrationTest",
                "firstName": "integrationTest",
                "phone": "0630123456",
                "email": "integrationTest",
                "age": 30,
                "nrOfPplInHousehold": 5,
                "childrenInHousehold": true,
                "ageOfYoungestChild": "6-12 év között",
                "typeOfHouse": "Családi ház",
                "otherDog": false,
                "otherPet": true,
                "otherPetDetails": "Rágcsáló",
                "nrOfHoursAlone": 6,
                "nrOfDailyWalks": 3,
                "wantedSizeSmall": true,
                "wantedSizeMedium": false,
                "wantedSizeBig": false,
                "wantedAgePuppy": true,
                "wantedAgeYoung": true,
                "wantedAgeAdult": false,
                "wantedAgeOld": false,
                "introduction": "integrationTest"
            }
        }
        const resp = await supertest(app).post("/api/user").send(newUser).expect(201)
            expect(resp.body.lastName).toBe(newUser.lastName)
            expect(resp.body.firstName).toBe(newUser.firstName)
            expect(resp.body.phone).toBe(newUser.phone)
    });

    test("GET api/user/:id endpoint test without auth", async () => {
        const testUsers = await User.insertMany(insertUserData);
        const firstUserId = testUsers[0]._id;
        const resp = await supertest(app).get(`/api/user/${firstUserId.toString()}`).expect(401)
    })

    test("PATCH api/user/:id endpoint test without auth", async () => {
        const testUsers = await User.insertMany(insertUserData);
        const firstUserId = testUsers[0]._id;
        testUsers[0].adoptionForm.lastName = "UpdateTest"
        const resp = await supertest(app).patch(`/api/user/${firstUserId.toString()}`, testUsers[0]).expect(401)
    })

    test("GET /api/appointment endpoint test without auth", async () => {
        const testUsers = await User.insertMany(insertUserData);
        const firstUserId = testUsers[0]._id;
        const testDogs = await Dog.insertMany(insertDogData);
        const firstDogId = testDogs[0]._id;
        insertAppointmentData[0].user = firstUserId;
        insertAppointmentData[0].dog = firstDogId;
        insertAppointmentData[1].user = firstUserId;
        insertAppointmentData[1].dog = firstDogId;
        await Appointment.insertMany(insertAppointmentData);
        const resp = await supertest(app).get("/api/appointment").expect(401)
    });

    test("DELETE api/appointment/:id endpoint test without auth", async () => {
        const testUsers = await User.insertMany(insertUserData);
        const firstUserId = testUsers[0]._id;
        const testDogs = await Dog.insertMany(insertDogData);
        const firstDogId = testDogs[0]._id;
        insertAppointmentData[0].user = firstUserId;
        insertAppointmentData[0].dog = firstDogId;
        insertAppointmentData[1].user = firstUserId;
        insertAppointmentData[1].dog = firstDogId;
        const testAppointments = await Appointment.insertMany(insertAppointmentData);
        const firstAppointmentId = testAppointments[0]._id;
        const resp = await supertest(app).delete(`/api/appointment/${firstAppointmentId.toString()}`).expect(401)
    })

    test("GET api/appointment/:id endpoint test without auth", async () => {
        const testUsers = await User.insertMany(insertUserData);
        const firstUserId = testUsers[0]._id;
        const testDogs = await Dog.insertMany(insertDogData);
        const firstDogId = testDogs[0]._id;
        insertAppointmentData[0].user = firstUserId;
        insertAppointmentData[0].dog = firstDogId;
        insertAppointmentData[1].user = firstUserId;
        insertAppointmentData[1].dog = firstDogId;
        const testAppointments = await Appointment.insertMany(insertAppointmentData);
        const firstAppointmentId = testAppointments[0]._id;
        const resp = await supertest(app).get(`/api/appointment/${firstAppointmentId.toString()}`).expect(401)
    })


})
