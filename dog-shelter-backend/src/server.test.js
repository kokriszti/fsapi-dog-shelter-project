const app = require("./server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Dog = require("./models/dog.model")
const config = require("config");
const logger = require("./config/logger");

describe("REST API integration tests", () => {
    //toDo: átírni saját adatstruktúrára:
    const insertData = [{
        firstName: "John",
        lastName: "Test",
        email: "john@test.com"
    }, {
        firstName: "Kate",
        lastName: "Test",
        email: "kate@test.com"
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

    test("GET /dog endpoint test", async () => {
        await Dog.insertMany(insertData);
        const resp = await supertest(app).get("/dog").expect(200)        //supertest miatt lehet így is az expect-et
        //vagy: expect(resp.status).toBe(200)
        expect(Array.isArray(resp.body)).toBeTruthy();
        expect(resp.body.length).toBe(insertData.length)
        resp.body.forEach((dog, index) => {
            expect(dog.firstName).toBe(insertData[index].firstName)         //toDo: adatstruktúrát átírni sajátra
            expect(dog.lastName).toBe(insertData[index].lastName)
            expect(dog.email).toBe(insertData[index].email)
        })
    });

    test("GET /dog/:id endpoint test", async () => {
        const testDogs = await Dog.insertMany(insertData);
        const firstDogId = testDogs[0]._id;
        const resp = await supertest(app).get(`/person/${firstDogId.toString()}`).expect(200)
        expect(resp.body._id).toBe(firstDogId.toString())
        expect(resp.body.firstName).toBe(insertData[0].firstName)           //toDo: adatstruktúrát átírni sajátra
        expect(resp.body.lastName).toBe(insertData[0].lastName)
        expect(resp.body.email).toBe(insertData[0].email)

    })


})
