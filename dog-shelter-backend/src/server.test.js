const app = require("./server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Dog = require("./models/dog.model")
const config = require("config");
const logger = require("./config/logger");

describe("REST API integration tests", () => {
    //toDo: átírni saját adatstruktúrára:
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
            expect(dog.status).toBe(insertDogData[index].status)         //toDo: adatstruktúrát átírni sajátra
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


})
